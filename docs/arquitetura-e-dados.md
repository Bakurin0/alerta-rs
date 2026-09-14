# Fontes de Dados, Arquitetura e Integração Técnica — AlertaRS

Este documento descreve a arquitetura de dados do **AlertaRS**, detalhando a integração com a **Rede Hidrometeorológica da Defesa Civil do Estado do Rio Grande do Sul** e com a malha cartográfica do **IBGE**.

---

## 1. Decisões Arquiteturais Fundamentais

- **Sem Banco de Dados Próprio:** A aplicação opera no modelo *zero-persistence / edge-client*, consumindo telemetria pública oficial diretamente no navegador sem intermediários nem retenção de dados sensíveis.
- **Integração Real Conectada:** A aplicação consome a API GraphQL oficial em produção e desenvolvimento, com *fallback* automático e gracioso para dados locais de demonstração em caso de indisponibilidade de rede ou falha de conectividade.
- **Atualização em Tempo Real Nativa:** Suporte a WebSockets através do subprotocolo padrão `graphql-transport-ws`, recebendo leituras pontuais das estações conforme são transmitidas pelos sensores de campo da Defesa Civil RS.

---

## 2. Fonte Oficial de Dados: Defesa Civil do RS / MKS

- **Documentação Oficial:** [API de Dados Hidrometeorológicos](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica)
- **Endpoint HTTP GraphQL:** `https://redehidrometeorologica.defesacivil.rs.gov.br/graphql`
- **Endpoint WebSocket GraphQL:** `wss://redehidrometeorologica.defesacivil.rs.gov.br/graphql`
- **Mapa Oficial de Referência:** `https://redehidrometeorologica.defesacivil.rs.gov.br/Mapa`

### 2.1. Métricas e Unidades de Medida Mapeadas

| Grandeza Física | Campo GraphQL | Unidade | Descrição / Sensores |
| :--- | :--- | :---: | :--- |
| **Nível do Rio** | `data.rio.rio_nivel` | m | Cota fluviométrica com tendência (`rio_nivel_tendencia`), área de drenagem ($km^2$) e vazão ($m^3/s$) |
| **Chuva Acumulada** | `data.chuva.acumulado` | mm | Janelas: `s015` (10s), `min005`, `min010`, `min015`, `h001`, `h003`, `h006`, `h012`, `h024`, `h048`, `h072`, `h096`, `h120`, `h144`, `h168` (7 dias), `mesatual` e `mesanterior` |
| **Temperatura** | `data.temperatura` | °C | Temperatura instantânea (`atual`), média/máxima/mínima do dia atual e média do dia anterior |
| **Sensação Térmica** | `data.senstermica.atual` | °C | Índice bioclimático calculado em superfície |
| **Vento** | `data.vento` | km/h | Velocidade média (`velocidade_media`), rajada máxima (`velocidade_maxima`) e direção em graus (`direcao`, 0°–360°) convertida para rosa dos ventos |
| **Pressão Atmosférica** | `data.pressaoatmos` | hPa | Pressão barométrica instantânea e vetor de tendência barométrica |
| **Umidade Relativa** | `data.umidade.atual` | % | Higrômetro relativo do ar |
| **Radiação Solar** | `data.radiacaosolar.atual` | $kWh/m^2$ | Piranômetro solar |

### 2.2. Flags de Sensores e Recursos

A API expõe em `filter.relacao` a lista de sensores instalados em cada estação:
- `tem_chuva_acumulada`: Pluviômetro ativo.
- `tem_nivel_do_rio`: Sensor telemétrico de nível de rio.
- `tem_pressao_atmosferica`: Barômetro.
- `tem_umidade`: Higrômetro.
- `tem_vento`: Anemômetro.
- `tem_sensacao_termica`: Sensor ou cálculo térmico ativo.
- `tem_vazao_do_rio`: Medição ou cálculo de vazão.

---

## 3. Investigação Técnica e Diagnóstico de Endpoints

### 3.1. CORS (Cross-Origin Resource Sharing)
O servidor da Defesa Civil RS responde a requisições `OPTIONS` com:
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: <Origin-do-Cliente>
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
Vary: Origin
```
Isso viabiliza requisições diretas a partir de qualquer origem web (como `http://localhost:5173` ou `https://bakurin0.github.io`) sem necessidade de proxy intermediário ou túnel de desenvolvimento.

### 3.2. Query `tags_data` (Operacional)
A query `tags_data(clients: ["casa-militar-defesa-civil-rs"], filters: { localizacao: [{ codigos: ["43"], tipo: UNIDADE_FEDERATIVA }] })` é pública, rápida e retorna o estado atualizado de todas as estações do Rio Grande do Sul em uma única requisição (~40KB gzip).

### 3.3. Restrição da Query `historic` (Status: FORBIDDEN)
A consulta `historic(...)` documentada na página pública retorna:
```json
{
  "errors": [{ "message": "Forbidden resource", "extensions": { "code": "FORBIDDEN" } }],
  "data": null
}
```
**Decisão de Engenharia:** Documentar essa restrição técnica de permissão no backend da Defesa Civil. Na aplicação, as janelas de chuva de curto e longo prazo (10s a 7 dias e acumulados mensais) são fornecidas com precisão via `tags_data` e subscription `nowcasting_unique`, eliminando o bloqueio para o usuário final.

### 3.4. Subscription WebSocket `nowcasting_unique` (Tempo Real)
A conexão com o endpoint `wss://redehidrometeorologica.defesacivil.rs.gov.br/graphql` utiliza o protocolo padrão `graphql-transport-ws`.
- O handshake é iniciado com `{ "type": "connection_init" }`.
- O servidor confirma com `{ "type": "connection_ack" }`.
- A aplicação registra a subscription `nowcasting_unique` e recebe pushes com payload `{ "type": "next" }` toda vez que uma estação transmite novas leituras.
- A aplicação responde a quadros `{ "type": "ping" }` com `{ "type": "pong" }`, mantendo o túnel TCP vivo de forma contínua.

---

## 4. Base Cartográfica: IBGE

A geometria vetorial oficial do estado do Rio Grande do Sul é obtida por meio da malha do IBGE:
```http
GET https://servicodados.ibge.gov.br/api/v3/malhas/estados/43?formato=application/vnd.geo+json&qualidade=minima
```
As coordenadas geográficas (latitude $[-33.75, -27.09]$ e longitude $[-57.59, -49.69]$) são projetadas matematicamente para o sistema de coordenadas percentuais relativas do mapa SVG vetorial através da função pura `projectCoordinates(lat, lon)` em `station.js`.

---

## 5. Fluxo de Dados da Aplicação

```text
[Servidor Defesa Civil RS / MKS]
   ├── HTTP POST /graphql (Query tags_data)
   └── WSS /graphql (Subscription nowcasting_unique, protocolo graphql-transport-ws)
            │
            ▼
[app/src/services/defesaCivilRepository.js]
   ├── listStations(): busca telemetria completa de todas as estações do RS
   ├── subscribeNowcasting(): gerencia socket WS, reconexão automática e mensagens
   └── normalizeStation(): higienização e tratamento seguro de valores nulos
            │
            ▼
[app/src/services/hydrologyRepository.js]
   ├── Orquestração com dados da Defesa Civil RS
   └── Fallback gracioso para mockStations se houver falha de rede
            │
            ▼
[app/src/domain/station.js]
   ├── Regras de cota: classifyLevel (normal, atenção, alerta, inundação)
   ├── Projeção cartográfica: projectCoordinates (lat, lon -> x%, y%)
   ├── Rosa dos ventos: degreesToCompass (0°–360° -> N, NE, L, etc.)
   ├── Formatadores: formatTemperature, formatWind, formatPressure, formatHumidity
   └── Filtros multicritério: filterStations (busca por texto, sensores e cotas)
            │
            ▼
[app/src/App.jsx]
   ├── FilterToolbar: busca instantânea + filtros por tipo de sensor
   ├── PanelView: grid de cards com cotas e telemetria meteorológica
   ├── MapView: mapa vetorial do RS com seleção interativa de marcadores
   └── DetailsView: ficha completa com grid de métricas e tabela de chuvas
```
