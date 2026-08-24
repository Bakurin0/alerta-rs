# Projeto Integrador IV - Etapa 1
**Universidade de Caxias do Sul (UCS)**  
**Curso de Bacharelado em Ciência da Computação / Análise e Desenvolvimento de Sistemas**

---

## 1. Identificação do Grupo e Responsabilidades no Scrum

- **Product Owner:** `[Integrante 1]`
- **Scrum Master:** `[Integrante 2]`
- **Desenvolvedor 1:** `[Integrante 3]`
- **Desenvolvedor 2:** `[Integrante 4]`
- **Desenvolvedor 3:** `[Integrante 5]`

---

## 2. Definição do Projeto e Fonte de Dados

- **Nome do Projeto:** AlertaRS – Painel de Monitoramento Hidrológico e Prevenção Climática
- **Objetivo do Projeto:** Desenvolver uma aplicação web para consultar e apresentar dados hidrológicos do Rio Grande do Sul obtidos por APIs. O sistema permitirá visualizar estações, níveis dos rios e históricos de precipitação por município ou bacia. O projeto terá caráter informativo e não emitirá alertas oficiais.
- **Fonte de dados principal planejada:**
  - **Organização / Entidade:** Defesa Civil do Estado do Rio Grande do Sul / Casa Militar.
  - **Serviço:** [API de Dados Hidrometeorológicos da Defesa Civil RS](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica), uma API GraphQL com nível de rios, chuva, estações, coordenadas e histórico.
  - **Endpoint:** `https://redehidrometeorologica.defesacivil.rs.gov.br/graphql`.
- **Fonte cartográfica:** API de Malhas do IBGE, utilizada para obter o contorno geográfico do Rio Grande do Sul.
- **Fonte alternativa:** [API HidroWebService da ANA](https://www.ana.gov.br/hidrowebservice/swagger-ui/index.html), caso seja necessário ampliar a cobertura histórica.
- **Estratégia para a Sprint 1:** utilizar dados simulados apenas durante a construção da interface. A versão final consultará as fontes diretamente e não utilizará banco de dados.

---

## 3. Artefato 1: Backlog do Produto (Product Backlog)

Abaixo encontra-se a lista de todas as 8 necessidades do usuário priorizadas e pontuadas em Story Points (estimativa por Planning Poker):

| # | Necessidade do Usuário / Funcionalidade | Pontuação (Story Points) | Status |
| :---: | :--- | :---: | :---: |
| **BP-01** | **Visualizar medições recentes por município** — O usuário seleciona um município e consulta níveis e chuva disponíveis nas estações da Defesa Civil RS. | **13 pts** | **Sprint 1** |
| **BP-02** | **Consultar histórico de chuva acumulada por estação meteorológica** — O usuário filtra por estação e período e visualiza o volume de precipitação retornado pela API da Defesa Civil RS. | **8 pts** | **Sprint 1** |
| **BP-03** | **Visualizar mapa de estações hidrológicas** — Exibe a malha do RS fornecida pelo IBGE e posiciona as estações retornadas pela Defesa Civil RS. | **13 pts** | **Sprint 1** |
| **BP-04** | **Consultar histórico de níveis dos rios** — O usuário seleciona uma estação e um período e visualiza a série disponível na API da Defesa Civil RS. | **8 pts** | Backlog futuro |
| **BP-05** | **Comparar municípios por indicadores hidrológicos** — O usuário seleciona até 3 municípios e visualiza um painel comparativo com nível do rio, chuva acumulada e status de alerta lado a lado. | **8 pts** | Backlog futuro |
| **BP-06** | **Exibir resumo das estações consultadas** — Visão geral com quantidade de estações e médias calculadas sobre os dados retornados pela API. | **5 pts** | Backlog futuro |
| **BP-07** | **Filtrar estações por bacia hidrográfica** — O usuário seleciona uma bacia e visualiza apenas as estações pertencentes a ela, com os dados de nível e chuva correspondentes. | **5 pts** | Backlog futuro |
| **BP-08** | **Exportar relatório de dados por município e período** — O usuário gera e baixa um arquivo com os dados de nível e precipitação de um município em um intervalo de datas selecionado. | **5 pts** | Backlog futuro |

*Total do Product Backlog: 68 Story Points.*

---

## 4. Artefato 2: Backlog da Sprint (Sprint Backlog - 1ª Entrega)

Para o primeiro ciclo de desenvolvimento (Sprint 1), foram priorizados **3 itens do Backlog do Produto**, totalizando uma estimativa de velocidade da equipe de **34 Story Points**.

- **Velocidade Estimada da Equipe:** 34 Story Points / sprint.

### Itens Selecionados para a Sprint 1:
1. **BP-01: Visualizar nível atual de rios e bacias por município (13 pts)** — Funcionalidade de manipulação de telemetria e calculador de cotas.
2. **BP-02: Consultar histórico de chuva acumulada por estação meteorológica (8 pts)** — Análise temporal pluviométrica.
3. **BP-03: Visualizar mapa de estações hidrológicas (13 pts)** — Mapa obtido no IBGE com estações retornadas pela Defesa Civil RS.

**Total da Sprint 1:** 34 Story Points.

---

## 5. Artefato 3: Detalhamento das Histórias, Protótipos e Tarefas da Equipe

### História 1: BP-01 — Visualizar medições recentes por município (13 pts)
- **Descrição da História:** *Como morador de um município gaúcho, quero consultar as medições recentes das estações da minha região para acompanhar as condições hidrológicas disponíveis.*
- **Critérios de Aceitação:**
  - Exibição de campo de busca por município do RS.
  - Exibição de cards de estações fluviométricas com medidor de nível em metros.
  - Exibição da data e hora informadas pela API para cada medição.
- **Protótipo de Interface (História 1):**
  ![Protótipo BP-01: Visualizar Nível Atual de Rios por Município](prototipos-ia-temporarios/bp01_nivel_rios.jpg)
- **Tarefas e Responsabilidades (Scrum):**
  - `T-01.1`: Definir o contrato do repositório hidrológico e implementar dados simulados; validar o mapeamento para a API da Defesa Civil RS (*Responsável: `[Integrante 3 - Dev]`*).
  - `T-01.2`: Desenvolver componente de card de estação com medidor visual de cota (*Responsável: `[Integrante 4 - Dev]`*).
  - `T-01.3`: Implementar campo de busca e filtro por município com retorno dos dados (*Responsável: `[Integrante 5 - Dev]`*).
  - `T-01.4`: Validar se a fonte e o horário das medições estão visíveis (*Responsável: `[Integrante 1 - PO]`*).
  - `T-01.5`: Coordenar revisão de progresso nas dailies e remover impedimentos (*Responsável: `[Integrante 2 - SM]`*).

---

### História 2: BP-02 — Consultar histórico de chuva acumulada (8 pts)
- **Descrição da História:** *Como técnico ambiental ou pesquisador, quero visualizar o histórico de precipitação acumulada por estação meteorológica em um período específico para analisar tendências pluviométricas e correlacionar com eventos de cheia.*
- **Critérios de Aceitação:**
  - Seletor de estação meteorológica e filtro de período (data início / data fim).
  - Gráfico de precipitação diária acumulada (mm) em séries temporais.
  - Exibição do total acumulado e indicador de médias históricas.
- **Protótipo de Interface (História 2):**
  ![Protótipo BP-02: Consultar Histórico de Chuva Acumulada](prototipos-ia-temporarios/bp02_historico_chuva.jpg)
- **Tarefas e Responsabilidades (Scrum):**
  - `T-02.1`: Modelar séries históricas de precipitação e preparar o adaptador GraphQL da Defesa Civil RS (*Responsável: `[Integrante 3 - Dev]`*).
  - `T-02.2`: Desenvolver gráfico de séries temporais (precipitação × data) (*Responsável: `[Integrante 4 - Dev]`*).
  - `T-02.3`: Implementar seletor de estação e filtro de período (data início / data fim) (*Responsável: `[Integrante 5 - Dev]`*).
  - `T-02.4`: Validar se os dados exibidos correspondem ao período e estação selecionados (*Responsável: `[Integrante 1 - PO]`*).
  - `T-02.5`: Monitorar prazo de entrega e garantir integração entre frontend e dados (*Responsável: `[Integrante 2 - SM]`*).

---

### História 3: BP-03 — Visualizar mapa de estações hidrológicas (13 pts)
- **Descrição da História:** *Como cidadão, quero visualizar em um mapa do Rio Grande do Sul as estações hidrológicas disponíveis para localizar os pontos de monitoramento e consultar suas medições.*
- **Critérios de Aceitação:**
  - Mapa do RS obtido pela API de Malhas do IBGE.
  - Marcadores gerados a partir das coordenadas retornadas pela Defesa Civil RS.
  - Slide-over / modal de detalhamento da estação ao clicar no marcador.
- **Protótipo de Interface (História 3):**
  ![Protótipo BP-03: Visualizar Mapa Interativo de Alertas Ativos](prototipos-ia-temporarios/bp03_mapa_alertas.jpg)
- **Tarefas e Responsabilidades (Scrum):**
  - `T-03.1`: Integrar biblioteca de mapa (ex.: Leaflet.js) com dados de localização das estações (*Responsável: `[Integrante 3 - Dev]`*).
  - `T-03.2`: Implementar marcadores a partir das coordenadas das estações (*Responsável: `[Integrante 4 - Dev]`*).
  - `T-03.3`: Desenvolver painel lateral de detalhe ao selecionar uma estação no mapa (*Responsável: `[Integrante 5 - Dev]`*).
  - `T-03.4`: Validar a identificação e a procedência das medições exibidas (*Responsável: `[Integrante 1 - PO]`*).
  - `T-03.5`: Facilitar alinhamento entre desenvolvedores e revisar consistência dos dados no mapa (*Responsável: `[Integrante 2 - SM]`*).
