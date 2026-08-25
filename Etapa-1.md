# Projeto Integrador IV — Etapa 1

## 1. Identificação do grupo

- **Product Owner:** `[Integrante 1]`
- **Scrum Master:** `[Integrante 2]`
- **Desenvolvedores:** `[Integrante 3]`, `[Integrante 4]`, `[Integrante 5]`

## 2. Definição do projeto e fonte de dados

- **Projeto:** AlertaRS — painel de monitoramento hidrológico.
- **Objetivo:** apresentar, em uma aplicação web, medições atuais de estações hidrometeorológicas do Rio Grande do Sul, sua localização no mapa e os detalhes de uma estação selecionada.
- **Fonte prevista:** [API de Dados Hidrometeorológicos da Defesa Civil RS](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica).
- **Mapa:** [API de Malhas do IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/estados/43).
- **Desenvolvimento:** serão usados dados mockados nesta etapa; não haverá banco de dados próprio.

## 3. Backlog do Produto

O backlog completo do produto possui cinco necessidades, conforme [docs/backlog-produto-sprint.md](docs/backlog-produto-sprint.md). As duas últimas são necessidades identificadas, mas não fazem parte do desenvolvimento deste trabalho.

1. **Painel de medições atuais** — 13 pontos.
2. **Mapa de estações** — 13 pontos.
3. **Detalhes da estação** — 8 pontos.
4. **Histórico de chuvas** — 8 pontos.
5. **Filtro de estações** — 5 pontos.

**Total: 47 pontos.**

## 4. Backlog da Sprint

Esta Sprint contém as três funcionalidades que serão desenvolvidas e apresentadas no trabalho:

1. **Painel de medições atuais** — 13 pontos.
2. **Mapa de estações** — 13 pontos.
3. **Detalhes da estação** — 8 pontos.

**Total da Sprint: 34 pontos.**

## 5. Histórias da Sprint

### História 1 — Painel de medições atuais

**Como** usuário do AlertaRS, **quero** visualizar as medições recentes das estações, **para** acompanhar o nível dos rios e a chuva acumulada.

**Critérios:** exibir estações, nível, chuva acumulada e horário da medição; usar os dados mockados definidos no frontend.

### História 2 — Mapa de estações

**Como** usuário do AlertaRS, **quero** visualizar as estações em um mapa do Rio Grande do Sul, **para** localizar os pontos de monitoramento.

**Critérios:** exibir o mapa, posicionar os marcadores pelas coordenadas e permitir selecionar uma estação.

### História 3 — Detalhes da estação

**Como** usuário do AlertaRS, **quero** abrir os detalhes de uma estação, **para** consultar suas medições e identificação.

**Critérios:** exibir nome, município, código, nível do rio, chuva acumulada e horário da última atualização.
