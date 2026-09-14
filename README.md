# AlertaRS

Aplicação web estudantil para apresentação de dados hidrometeorológicos do Rio Grande do Sul.

## Escopo do trabalho

O projeto será desenvolvido somente com estas três funcionalidades:

1. Painel de medições atuais;
2. Mapa de estações;
3. Detalhes da estação.

O backlog com pontuação e o detalhamento da Sprint estão em [docs/backlog-produto-sprint.md](docs/backlog-produto-sprint.md). A documentação acadêmica está em [Etapa-1.md](Etapa-1.md).

## Dados

As telas consultarão dados oficiais pela [API de Dados Hidrometeorológicos da Defesa Civil RS](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica), sem banco de dados próprio. O mapa pode utilizar a [API de Malhas do IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/estados/43).

## Scrum

- `[Integrante 1]` — Product Owner
- `[Integrante 2]` — Scrum Master
- `[Integrante 3]`, `[Integrante 4]`, `[Integrante 5]` — Desenvolvimento

## Executar
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

```Imagens meramentes conceituas, não representão a interface final``` 

### BP-01: Visualizar Medições Recentes por Município (13 pts)
*Pesquisa por município e cards com as medições retornadas pela ANA.*

![Protótipo BP-01](telas/infos.jpeg)

---

### BP-02: Consultar Histórico de Chuva Acumulada (8 pts)
*Seletor de estação meteorológica, intervalo de datas e gráfico de precipitação acumulada.*

![Protótipo BP-02](telas/home.jpeg)

---

### BP-03: Visualizar Mapa de Estações Hidrológicas (13 pts)
*Mapa do RS obtido no IBGE com estações e painel de detalhamento das medições.*

![Protótipo BP-03](telas/maps.jpeg)

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
