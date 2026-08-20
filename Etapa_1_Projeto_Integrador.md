# Projeto Integrador IV - Etapa 1
**Universidade de Caxias do Sul (UCS)**  
**Curso de Bacharelado em Ciência da Computação / Análise e Desenvolvimento de Sistemas**

---

## 1. Identificação do Grupo e Responsabilidades no Scrum

- **Product Owner:** `[Nome do Integrante 1 - PO]`
- **Scrum Master:** `[Nome do Integrante 2 - SM]`
- **Desenvolvedor 1:** `[Nome do Integrante 3 - Dev]`
- **Desenvolvedor 2:** `[Nome do Integrante 4 - Dev]`
- **Desenvolvedor 3:** `[Nome do Integrante 5 - Dev]`

---

## 2. Definição do Projeto e Fonte de Dados

- **Nome do Projeto:** ClimaRS Monitor
- **Objetivo do Projeto:** Desenvolver um aplicativo (software web) focado no monitoramento e processamento de dados hidrometeorológicos do Estado do Rio Grande do Sul. A solução processa dados contínuos de níveis fluviométricos (rios), cotas limiares de emergência (atenção, alerta e inundação) e acumulados pluviométricos (chuvas) por região, apresentando dashboards interativos e alertas consolidados da Defesa Civil para auxiliar na tomada de decisão e prevenção de desastres.
- **Fonte de Dados:** 
  - **Organização / Entidade:** Governo do Estado do Rio Grande do Sul (PROCERGS - Companhia de Processamento de Dados do Estado do RS, SEMA - Secretaria do Meio Ambiente e Infraestrutura, e Defesa Civil do RS).
  - **Local da Fonte (URL):** [https://climars.rs.gov.br](https://climars.rs.gov.br) (Portais de Dados Abertos e APIs de Monitoramento Hidrometeorológico).

---

## 3. Artefato 1: Backlog do Produto (Product Backlog)

Abaixo estão listadas as 5 necessidades dos usuários para o aplicativo **ClimaRS Monitor**, priorizadas e pontuadas com base em Story Points (estimativa por Planning Poker).

| ID | Necessidade do Usuário / Funcionalidade | Pontuação (Story Points) | Descrição do Valor de Negócio |
| :---: | :--- | :---: | :--- |
| **US-01** | **Painel Hidrológico Interativo (Nível dos Rios vs. Cotas)** | **13 pts** | Permitir que os usuários acompanhem o nível dos rios em tempo real com gráficos temporais e linha horizontal comparativa das cotas de atenção, alerta e inundação. |
| **US-02** | **Mapa Pluviométrico e Acumulado de Chuva** | **8 pts** | Apresentar gráficos e estatísticas comparativas do volume acumulado de precipitação (24h, 48h e 72h) agrupados por bacia hidrográfica e município. |
| **US-03** | **Central de Alertas e Avisos de Emergência** | **5 pts** | Apresentar uma lista filtrável de alertas vigentes emitidos pela Defesa Civil do RS por nível de severidade (atenção, alerta, emergência) e localização. |
| **US-04** | **Relatórios Históricos e Análise Comparativa** | **8 pts** | Permitir a geração de pesquisas históricas e gráficos comparativos de vazão e chuva entre anos anteriores para análise de tendências. |
| **US-05** | **Gestão de Locais Favoritos e Limiares Personalizados** | **3 pts** | Permitir ao usuário favoritar municípios de interesse e configurar limiares customizados para gatilhos de aviso no aplicativo. |

*Nota: Conforme as orientações do Projeto Integrador IV, a lista acima contempla apenas funcionalidades de valor direto ao usuário final, excluindo requisitos não-funcionais e funções de autenticação/login.*

---

## 4. Artefato 2: Backlog da Sprint (Sprint Backlog - 1ª Entrega)

Para a primeira versão funcional (Sprint 1), a equipe selecionou **3 itens do Backlog do Produto**, totalizando uma velocidade estimada de **21 Story Points**. 

- **Velocidade Estimada da Equipe:** 21 Story Points.

### Itens Selecionados para a Sprint 1:
1. **US-01: Painel Hidrológico Interativo (13 pts)** — Funcionalidade principal de processamento de dados (cálculo de níveis de rios vs. cotas limiares de inundação).
2. **US-03: Central de Alertas e Avisos de Emergência (5 pts)** — Exibição filtrada dos alertas e orientações de risco da Defesa Civil.
3. **US-05: Gestão de Locais Favoritos e Limiares Personalizados (3 pts)** — Configuração de preferências e municípios de interesse do usuário.

---

## 5. Artefato 3: Detalhamento das Histórias, Protótipos e Tarefas da Equipe

### História 1: US-01 — Painel Hidrológico Interativo (13 pts)
- **Descrição da História:** *Como morador ou gestor público no Rio Grande do Sul, eu quero visualizar os níveis atuais dos rios comparados às cotas de atenção, alerta e inundação em um painel interativo, para que eu possa acompanhar a evolução das águas e antecipar riscos de alagamento.*
- **Critérios de Aceitação:**
  - O gráfico deve exibir o nível em metros do rio selecionado ao longo do tempo (últimos 7 dias).
  - Devem ser desenhadas linhas de referência horizontais para a Cota de Atenção (amarelo), Cota de Alerta (laranja) e Cota de Inundação (vermelho).
  - Deve ser possível selecionar entre diferentes estações fluviométricas (ex: Rio Guaíba - Cais Mauá, Rio Taquari - Estrela, Rio Jacuí).
- **Protótipo de Interface (História 1):**
  ![Painel Hidrológico Interativo ClimaRS](prototipos/prototipo_1_painel_hidrologico.jpg)

- **Tarefas e Responsabilidades (Scrum):**
  - `T-01.1`: Coleta e ingestão de dados hidrológicos da API ClimaRS/PROCERGS (*Responsável: `[Nome do Integrante 3 - Dev]`*).
  - `T-01.2`: Desenvolvimento do componente gráfico interativo de nível vs. cotas (*Responsável: `[Nome do Integrante 4 - Dev]`*).
  - `T-01.3`: Construção do seletor de estações fluviométricas e cards de resumo (*Responsável: `[Nome do Integrante 5 - Dev]`*).
  - `T-01.4`: Validação dos critérios de aceitação e revisão da história (*Responsável: `[Nome do Integrante 1 - PO]`*).

---

### História 2: US-03 — Central de Alertas e Avisos de Emergência (5 pts)
- **Descrição da História:** *Como cidadão, eu quero acessar a central de alertas da Defesa Civil filtrada por região e grau de severidade, para que eu saiba rapidamente quais municípios estão em estado de emergência ou alerta.*
- **Critérios de Aceitação:**
  - Exibição de cartões coloridos conforme o nível de severidade (Vermelho = Risco Severo/Inundação, Laranja = Enxurrada/Deslizamento, Amarelo = Aviso Pluviométrico).
  - Filtros por região (Região Metropolitana, Serra, Vale do Taquari, Litoral) e nível de risco.
  - Botão com números de emergência da Defesa Civil (199 / 193).
- **Protótipo de Interface (História 2):**
  ![Central de Alertas e Emergências ClimaRS](prototipos/prototipo_2_central_alertas.jpg)

- **Tarefas e Responsabilidades (Scrum):**
  - `T-03.1`: Modelagem dos alertas da Defesa Civil e filtros por município/região (*Responsável: `[Nome do Integrante 3 - Dev]`*).
  - `T-03.2`: Criação do layout visual dos cartões de emergência e botões de contato (*Responsável: `[Nome do Integrante 5 - Dev]`*).
  - `T-03.3`: Facilitação do acompanhamento e remoção de impedimentos da equipe (*Responsável: `[Nome do Integrante 2 - SM]`*).

---

### História 3: US-05 — Gestão de Locais Favoritos e Limiares Personalizados (3 pts)
- **Descrição da História:** *Como usuário da plataforma, eu quero salvar meus municípios de interesse e personalizar os limiares de chuva/nível para notificações, para receber avisos sob medida para a minha localidade.*
- **Critérios de Aceitação:**
  - Interface para busca e adição de novos municípios aos favoritos.
  - Sliders para ajuste dos limiares de cota (metros) e precipitação (mm/h).
  - Botões de alternância (toggles) para escolha dos canais de notificação (SMS, Push, WhatsApp).
- **Protótipo de Interface (História 3):**
  ![Gestão de Locais e Notificações ClimaRS](prototipos/prototipo_3_favoritos_config.jpg)

- **Tarefas e Responsabilidades (Scrum):**
  - `T-05.1`: Implementação do armazenamento de locais favoritos do usuário (*Responsável: `[Nome do Integrante 4 - Dev]`*).
  - `T-05.2`: Construção dos componentes de slider de limiares e toggles de notificação (*Responsável: `[Nome do Integrante 5 - Dev]`*).
  - `T-05.3`: Validação do protótipo com a visão de produto (*Responsável: `[Nome do Integrante 1 - PO]`*).
