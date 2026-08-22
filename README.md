# AlertaRS

**Painel de Monitoramento Hidrológico e Prevenção Climática do Rio Grande do Sul**

> **Projeto Integrador IV** — Universidade de Caxias do Sul (UCS)  
> Curso de Análise e Desenvolvimento de Sistemas / Ciência da Computação

---

## 📌 Sobre o Projeto

O **AlertaRS** é uma aplicação web voltada ao monitoramento em tempo real e análise histórica das condições hidrológicas e meteorológicas dos municípios e bacias hidrográficas do Estado do Rio Grande do Sul. 

O sistema consulta dados de telemetria fluviométrica e pluviométrica em APIs e apresenta níveis dos rios, chuva acumulada, séries históricas e a localização das estações. O AlertaRS tem caráter informativo e não emite alertas oficiais.

---

## 📡 Fontes de Dados Planejadas

- **Fonte principal:** API HidroWebService da Agência Nacional de Águas e Saneamento Básico (ANA), que oferece inventário e séries de chuva, nível e vazão.
- **Fonte cartográfica:** API de Malhas do IBGE.
- **Estado atual:** a aplicação usa dados simulados explicitamente identificados. A integração depende de solicitação de credenciais e validação do contrato com a ANA.

Consulte [docs/arquitetura-e-dados.md](docs/arquitetura-e-dados.md) para o mapeamento técnico e os riscos conhecidos.

O acompanhamento do que já foi implementado e do que ainda depende da equipe ou de serviços externos está em [docs/pendencias.md](docs/pendencias.md).

---

## 👥 Equipe e Estrutura Scrum

| Integrante | Papel no Scrum | Responsabilidades |
| :--- | :--- | :--- |
| `[Integrante 1]` | **Product Owner** | Visão do produto, gestão do Backlog e validação das informações exibidas |
| `[Integrante 2]` | **Scrum Master** | Facilitação do processo Scrum, dailies e remoção de impedimentos |
| `[Integrante 3]` | **Desenvolvedor** | Integração da API HidroWebService/ANA |
| `[Integrante 4]` | **Desenvolvedor** | Engenharia dos componentes de cards, medidores e gráficos de séries temporais |
| `[Integrante 5]` | **Desenvolvedor** | Integração da malha do IBGE, filtros e painel de detalhes |

---

## 📊 Artefatos do Scrum (Etapa 1)

### Product Backlog (8 Necessidades Priorizadas)

| # | Funcionalidade | Pontos | Escopo |
| :---: | :--- | :---: | :---: |
| **BP-01** | **Visualizar medições recentes por município** | **13** | **Sprint 1** |
| **BP-02** | **Consultar histórico de chuva acumulada por estação meteorológica** | **8** | **Sprint 1** |
| **BP-03** | **Visualizar mapa de estações hidrológicas** | **13** | **Sprint 1** |
| **BP-04** | Consultar histórico de níveis dos rios | 8 | Backlog |
| **BP-05** | Comparar municípios por indicadores hidrológicos | 8 | Backlog |
| **BP-06** | Exibir resumo das estações consultadas | 5 | Backlog |
| **BP-07** | Filtrar estações por bacia hidrográfica | 5 | Backlog |
| **BP-08** | Exportar relatório de dados por município e período | 5 | Backlog |

*Total do Product Backlog: 68 Story Points.*

---

### Sprint Backlog (Sprint 1)

- **Velocidade Estimada da Equipe:** **34 Story Points / sprint**
- **Itens Priorizados:** `BP-01` (13 pts) + `BP-02` (8 pts) + `BP-03` (13 pts) = **34 pts**

---

## 🎨 Protótipos de Interface (Sprint 1)

### BP-01: Visualizar Medições Recentes por Município (13 pts)
*Pesquisa por município e cards com as medições retornadas pela ANA.*

![Protótipo BP-01](prototipos-ia-temporarios/bp01_nivel_rios.jpg)

---

### BP-02: Consultar Histórico de Chuva Acumulada (8 pts)
*Seletor de estação meteorológica, intervalo de datas e gráfico de precipitação acumulada.*

![Protótipo BP-02](prototipos-ia-temporarios/bp02_historico_chuva.jpg)

---

### BP-03: Visualizar Mapa de Estações Hidrológicas (13 pts)
*Mapa do RS obtido no IBGE com estações e painel de detalhamento das medições.*

![Protótipo BP-03](prototipos-ia-temporarios/bp03_mapa_alertas.jpg)

---

## 📁 Estrutura do Repositório

```text
.
├── app/                               # Aplicação React/Vite e dados simulados
├── docs/                              # Orientações, modelo e arquitetura de dados
├── prototipos-ia-temporarios/         # Referências visuais ainda não definitivas
├── Etapa-1.md                         # Relatório acadêmico da primeira entrega
└── README.md                          # Apresentação do projeto
```

## ▶️ Executar o início do desenvolvimento

```bash
cd app
npm install
npm run dev
```

Os valores exibidos são fictícios e servem apenas para validar a experiência e as regras do sistema.
