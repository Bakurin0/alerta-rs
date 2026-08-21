# 📋 Análise — AlertaRS vs. Requisitos da Etapa 1

> **Projeto:** AlertaRS – Painel de Monitoramento Hidrológico e Prevenção Climática  
> **Instituição:** UCS – Projeto Integrador IV  
> **Data da análise:** 2026-08-21

---

## ✅ Resumo Geral

O projeto está **majoritariamente em conformidade** com os requisitos da Etapa 1. Os artefatos Scrum obrigatórios foram produzidos com qualidade e detalhamento acima do mínimo exigido. Existem, porém, **pendências críticas** que podem comprometer a entrega: os **nomes dos integrantes** ainda estão como placeholders (`[Integrante N]`) e os **protótipos** estão referenciados em caminhos incorretos no documento de entrega.

---

## 🔍 Checklist por Critério da Etapa 1

### 1. Identificação do Grupo e Papéis Scrum

| Critério | Status | Observação |
|---|:---:|---|
| Product Owner identificado | ⚠️ | Existe o slot, mas o nome é `[Integrante 1]` — **placeholder não preenchido** |
| Scrum Master identificado | ⚠️ | Idem — `[Integrante 2]` |
| Desenvolvedores (mín. 3) identificados | ⚠️ | Idem — `[Integrante 3/4/5]` |
| Grupo entre 5–7 integrantes | ⚠️ | O template lista 5 membros, mas nenhum nome real foi inserido |

> [!CAUTION]
> Os nomes reais dos integrantes **precisam ser preenchidos** em [`Etapa-1.md`](file:///home/night/alerta-rs/Etapa-1.md) antes da entrega. Entregar com placeholders pode resultar em **penalização ou recusa** da entrega.

---

### 2. Definição do Projeto e Fonte de Dados

| Critério | Status | Observação |
|---|:---:|---|
| Nome do projeto definido | ✅ | AlertaRS – Painel de Monitoramento Hidrológico e Prevenção Climática |
| Objetivo do projeto descrito | ✅ | Descrição detalhada e bem fundamentada na seção 2 do Etapa-1.md |
| Fonte de dados identificada | ✅ | Plataforma ClimaRS (SEMA/Defesa Civil RS/PROCERGS) com URL |
| Entidade responsável pelos dados | ✅ | Especificada com clareza |
| Aplicabilidade social/ambiental | ✅ | Área de bem-estar social e meio ambiente — plenamente adequada ao PI IV |

---

### 3. Artefato 1 — Product Backlog

| Critério | Status | Observação |
|---|:---:|---|
| Mínimo de itens no backlog | ✅ | 8 itens (BP-01 a BP-08) — acima do mínimo esperado |
| Necessidades do usuário descritas | ✅ | Cada item tem descrição clara em linguagem de usuário |
| Estimativa em Story Points | ✅ | Todos pontuados (5, 8 ou 13 pts — escala Fibonacci) |
| Priorização visível | ✅ | Coluna "Status" diferencia Sprint 1 vs. Backlog futuro |
| Total computado | ✅ | 68 Story Points declarados |

---

### 4. Artefato 2 — Sprint Backlog

| Critério | Status | Observação |
|---|:---:|---|
| Itens selecionados para a Sprint 1 | ✅ | BP-01, BP-02 e BP-03 |
| Velocidade estimada da equipe declarada | ✅ | 34 Story Points / sprint |
| Total da sprint confere | ✅ | 13 + 8 + 13 = 34 pts ✓ |
| Justificativa de priorização implícita | ✅ | Itens de maior valor de negócio (visualização, histórico, mapa) |

---

### 5. Artefato 3 — Histórias de Usuário, Protótipos e Tarefas

| Critério | Status | Observação |
|---|:---:|---|
| Histórias escritas em formato "Como... quero... para..." | ✅ | Todas as 3 histórias seguem o padrão correto |
| Critérios de aceitação definidos | ✅ | 3 critérios por história, objetivos e mensuráveis |
| Tarefas técnicas detalhadas | ✅ | 5 tarefas por história (T-xx.1 a T-xx.5), com responsável |
| Responsabilidades por papel Scrum | ✅ | PO valida, SM facilita, Devs implementam |
| Protótipos de interface referenciados | ⚠️ | Ver seção abaixo |

#### Protótipos — Problema de Caminho

O `Etapa-1.md` referencia os protótipos em:
```
prototipos/bp01_nivel_rios.jpg
prototipos/bp02_historico_chuva.jpg
prototipos/bp03_mapa_alertas.jpg
```

Mas a pasta **`prototipos/` não existe** na raiz do repositório. As imagens estão em:
```
prototipos-ia-temporarios/bp01_nivel_rios.jpg  ✅ (existe)
prototipos-ia-temporarios/bp02_historico_chuva.jpg  ✅ (existe)
prototipos-ia-temporarios/bp03_mapa_alertas.jpg  ✅ (existe)
```

> [!WARNING]
> Os links de protótipos no `Etapa-1.md` estão **quebrados**. A pasta `prototipos/` mencionada no documento não existe. Corrija os caminhos para `prototipos-ia-temporarios/` ou crie a pasta `prototipos/` com os arquivos corretos.

---

### 6. Artefatos Adicionais (Bônus / Qualidade)

| Item | Status | Observação |
|---|:---:|---|
| README completo e organizado | ✅ | Inclui contexto, backlog resumido e protótipos embutidos |
| DESIGN.md (Design System) | ✅ | Documento profissional com paleta, tipografia, componentes e grid — **diferencial** |
| CONTRIBUTING.md | ✅ | Processo de contribuição documentado |
| SECURITY.md | ✅ | Política de segurança presente |
| App em desenvolvimento (React+Vite) | ✅ | Estrutura básica criada em `/app` |
| Template HTML dos artefatos | ✅ | `docs/alerta_rs_backlog_e_historias.html` |
| Modelo de entrega ODT | ✅ | `docs/Modelo para Entrega do Projeto IV-A.odt` |
| Orientações PDF | ✅ | `docs/Orientações.pdf` |

---

## 🚨 Pendências Críticas (bloqueiam entrega)

| # | Problema | Arquivo | Solução |
|---|---|---|---|
| 1 | **Nomes dos integrantes são placeholders** | [`Etapa-1.md`](file:///home/night/alerta-rs/Etapa-1.md) seção 1 e tarefas | Substituir `[Integrante N]` pelos nomes reais |
| 2 | **Caminhos dos protótipos quebrados** | [`Etapa-1.md`](file:///home/night/alerta-rs/Etapa-1.md) seções 5.1, 5.2, 5.3 | Corrigir para `prototipos-ia-temporarios/` ou criar pasta `prototipos/` |

---

## ⚠️ Pendências Menores (recomendam atenção)

| # | Problema | Arquivo | Sugestão |
|---|---|---|---|
| 3 | README menciona `Etapa_1_Projeto_Integrador.md` | [`README.md`](file:///home/night/alerta-rs/README.md) L92 | Arquivo não existe; corrigir para `Etapa-1.md` |
| 4 | README menciona `alerta_rs_backlog_e_historias.html` na raiz | [`README.md`](file:///home/night/alerta-rs/README.md) L93 | Arquivo está em `docs/` — atualizar caminho |
| 5 | `Etapa-2.md` está vazio | [`Etapa-2.md`](file:///home/night/alerta-rs/Etapa-2.md) | OK para esta etapa, mas lembre de preencher na Etapa 2 |

---

## 📊 Pontuação por Critério

```
Identificação do grupo      ██████░░░░  60% (placeholders sem nome)
Definição e fonte de dados  ██████████ 100%
Product Backlog             ██████████ 100%
Sprint Backlog              ██████████ 100%
Histórias de usuário        ████████░░  80% (protótipos com caminho errado)
Qualidade geral             ██████████ 100% (docs extras, design system)

CONFORMIDADE GERAL:  ~90% ✅ (com 2 correções críticas pendentes)
```

---

## 🏁 Veredicto

O projeto demonstra **excelente nível de planejamento e documentação** para um PI IV. A estrutura Scrum está corretamente aplicada, o backlog é coeso e priorizado, as histórias seguem o padrão correto e os critérios de aceitação são mensuráveis.

**Faça as 2 correções críticas antes da entrega** e o documento estará plenamente apto para avaliação da Etapa 1.
