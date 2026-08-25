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
- **Desenvolvimento:** as três funcionalidades utilizarão dados oficiais consultados pela API; não haverá banco de dados próprio.

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

**Critérios:** exibir estações, nível, chuva acumulada e horário da medição, identificando a fonte oficial consultada.

### História 2 — Mapa de estações

**Como** usuário do AlertaRS, **quero** visualizar as estações em um mapa do Rio Grande do Sul, **para** localizar os pontos de monitoramento.

**Critérios:** exibir o mapa, posicionar os marcadores pelas coordenadas e permitir selecionar uma estação.

### História 3 — Detalhes da estação

**Como** usuário do AlertaRS, **quero** abrir os detalhes de uma estação, **para** consultar suas medições e identificação.

**Critérios:** exibir nome, município, código, nível do rio, chuva acumulada e horário da última atualização.

## 6. Detalhamento das histórias, protótipos e tarefas

### História 1 — Painel de medições atuais

**1. História:** Eu, como usuário do AlertaRS, gostaria de visualizar as medições atuais das estações, para acompanhar o nível dos rios e a chuva acumulada.

**2. Backlog da Sprint:** atende à necessidade **Painel de medições atuais** (13 pontos).

**3. Descrição:** o usuário acessa a tela inicial e encontra uma visão resumida das estações monitoradas, com os valores de nível do rio, chuva acumulada e horário da medição.

**4. Tarefas e responsáveis:**

- `[Integrante 3]` (Desenvolvedor): implementar a consulta à API e transformar o retorno nas informações de estação utilizadas pela tela.
- `[Integrante 4]` (Desenvolvedor): desenvolver os cards do painel, exibindo nível do rio, chuva acumulada e horário da medição.

**5. Protótipo:** [bp01_nivel_rios.jpg](../prototipos-ia-temporarios/bp01_nivel_rios.jpg), usado como referência para os cards e a apresentação das medições.

### História 2 — Mapa de estações

**1. História:** Eu, como usuário do AlertaRS, gostaria de visualizar as estações em um mapa do Rio Grande do Sul, para localizar os pontos de monitoramento.

**2. Backlog da Sprint:** atende à necessidade **Mapa de estações** (13 pontos).

**3. Descrição:** o usuário visualiza o mapa do estado com marcadores que representam as estações disponíveis e pode selecionar um marcador para consultar a estação.

**4. Tarefas e responsáveis:**

- `[Integrante 4]` (Desenvolvedor): desenvolver o mapa do Rio Grande do Sul e posicionar os marcadores usando latitude e longitude das estações.
- `[Integrante 5]` (Desenvolvedor): implementar o clique nos marcadores e encaminhar a estação selecionada para o painel de detalhes.

**5. Protótipo:** [bp03_mapa_alertas.jpg](../prototipos-ia-temporarios/bp03_mapa_alertas.jpg), usado como referência visual para o mapa e os marcadores.

### História 3 — Detalhes da estação

**1. História:** Eu, como usuário do AlertaRS, gostaria de abrir os detalhes de uma estação, para consultar suas medições e sua identificação.

**2. Backlog da Sprint:** atende à necessidade **Detalhes da estação** (8 pontos).

**3. Descrição:** após selecionar uma estação no painel ou no mapa, o usuário visualiza seu nome, município, código, nível do rio, chuva acumulada e horário da última atualização.

**4. Tarefas e responsáveis:**

- `[Integrante 3]` (Desenvolvedor): mapear os campos da estação selecionada e preparar os dados para exibição.
- `[Integrante 5]` (Desenvolvedor): desenvolver o painel de detalhes e conectá-lo à seleção feita no mapa ou no painel inicial.

**5. Protótipo:** o painel lateral de [bp03_mapa_alertas.jpg](../prototipos-ia-temporarios/bp03_mapa_alertas.jpg) serve como referência para os detalhes da estação. A tela será ajustada para mostrar dados hidrometeorológicos, sem exibir códigos “BP” no aplicativo.
