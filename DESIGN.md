# Design System: AlertaRS

**Projeto:** Painel de Monitoramento Hidrológico e Prevenção Climática do Rio Grande do Sul  
**Versão:** 1.0  
**Última Atualização:** 2026-08-21

---

## 1. Visual Theme & Atmosphere

O AlertaRS possui uma identidade visual **sombria, densa e altamente funcional** — uma estética que remete a centros de operações e salas de crise. O fundo geral é um **Azul-Noite profundo** (`#0d1117` a `#111827`), criando uma ambiência de monitoramento 24/7 que reduz a fadiga visual em uso prolongado e confere seriedade ao propósito do sistema.

A linguagem visual é **minimalista e orientada a dados**: nenhum elemento decorativo sem função. A hierarquia é construída exclusivamente com tipografia, cor e espaçamento. Sombras são usadas de forma sutil apenas para separar camadas de cartões do fundo.

A paleta de alertas segue uma **escalada cromática semafórica intuitiva**: verde → amarelo → laranja → vermelho. Essa linguagem universal de urgência é o coração comunicativo do sistema, permitindo leitura instantânea do estado do Rio Grande do Sul sem necessidade de texto.

Nos dados numéricos principais (nível dos rios, precipitação acumulada), a tipografia assume papel heroico — números grandes, brancos e corajosos dominam o centro dos cartões, funcionando como o "termômetro" visual imediato da situação.

---

## 2. Color Palette & Roles

### Fundações

| Nome Descritivo | Hex | Papel Funcional |
|---|---|---|
| **Abismo Noturno** | `#0d1117` | Fundo raiz da aplicação; cria profundidade máxima |
| **Azul-Marinho Escuro** | `#111827` | Fundo de seções, sidebar e painéis principais |
| **Ardósia Elevada** | `#1f2937` | Superfície de cartões e contêineres de dados |
| **Ardósia Clara** | `#374151` | Bordas sutis, separadores e linhas de grade nos gráficos |
| **Névoa de Dados** | `#6b7280` | Texto de metadados, rótulos secundários e legendas |
| **Cinza Pérola** | `#9ca3af` | Texto de suporte, placeholders e cabeçalhos de colunas |
| **Branco Translúcido** | `#f9fafb` | Texto primário, valores numéricos principais |

### Acento Principal

| Nome Descritivo | Hex | Papel Funcional |
|---|---|---|
| **Ciano Tecnológico** | `#22d3ee` | Cor de destaque de marca; valores em alta, gráficos de rios estáveis, links e CTAs |
| **Azul Hidrológico** | `#3b82f6` | Barras de gráfico de precipitação, elementos de rios em nível normal |
| **Verde Menta** | `#10b981` | Status **Normal/Estável**; toggles ativos, checkboxes confirmados |

### Escala de Severidade de Alertas

| Nome Descritivo | Hex | Nível de Alerta |
|---|---|---|
| **Verde Sentinela** | `#22c55e` | **Normal** — sem risco detectado |
| **Amarelo Vigília** | `#eab308` | **Atenção** — condição de cuidado, monitoramento intensificado |
| **Laranja Urgente** | `#f97316` | **Alerta** — risco moderado a alto, ação preventiva recomendada |
| **Vermelho Crítico** | `#ef4444` | **Emergência/Inundação** — risco iminente, evacuação pode ser necessária |

> A escalada de cores segue luminosidade crescente do amarelo ao vermelho, garantindo acessibilidade mesmo em condições de baixa visibilidade de tela.

---

## 3. Typography Rules

**Família Principal:** `Inter` (sistema) ou `system-ui` como fallback — fonte sem serifa, geométrica e de alta legibilidade em telas.

### Hierarquia Tipográfica

| Papel | Peso | Tamanho | Cor | Uso |
|---|---|---|---|---|
| **Valor Hero** | `700–800 (Extra Bold)` | `2.5rem–4rem` | Branco Translúcido (`#f9fafb`) | Nível do rio em metros, totais de precipitação, contagem de alertas |
| **Título de Seção** | `600 (Semi Bold)` | `1.125rem–1.25rem` | Branco Translúcido (`#f9fafb`) | "Monitoramento de Níveis de Rios", "Dashboard" |
| **Subtítulo / Rótulo** | `500 (Medium)` | `0.75rem–0.875rem` | Névoa de Dados (`#6b7280`) | "Estação Cais Mauá", nomes de rios, labels de eixos |
| **Body / Descrição** | `400 (Regular)` | `0.875rem` | Cinza Pérola (`#9ca3af`) | Textos descritivos em alertas, detalhes de estação |
| **Micro / Metadado** | `400 (Regular)` | `0.65rem–0.75rem` | Névoa de Dados (`#6b7280`) | Timestamps, coordenadas, "Atualizado: 09:45" |
| **Badge / Tag** | `600 (Semi Bold)` | `0.65rem` | Variável por severidade | Status em pills: "CRÍTICO", "ESTÁVEL", "EM ELEVAÇÃO" |

**Característica de Espacejamento:** Letter-spacing levemente expandido (`0.05em` a `0.1em`) em badges, status tags e rótulos em caixa alta — transmite precisão técnica e legibilidade em tamanhos pequenos.

---

## 4. Component Stylings

### Botões

- **Primário (Ação):** Fundo em **Verde Menta** (`#10b981`) ou **Ciano Tecnológico** (`#22d3ee`), texto escuro. Cantos generosamente arredondados (`border-radius: 0.5rem` — "quinas suavizadas"). Exemplo: botão "Adicionar", "Exportar".
- **Destrutivo (Remover):** Fundo **Vermelho Crítico** (`#ef4444`), texto branco. Mesma geometria do botão primário.
- **Secundário (Editar):** Fundo translúcido com borda fina em **Ardósia Clara** (`#374151`), texto em Cinza Pérola. Estilo "fantasma" que não compete com o dado.
- **Emergência CTA:** Borda colorida pelo nível de severidade, fundo transparente escuro. Texto em CAIXA ALTA com letra espaçada. Ex: `"EMERGÊNCIA: 199 / 193"`.

### Cards / Contêineres de Dados

- **Superfície:** Fundo **Ardósia Elevada** (`#1f2937`), sem borda ou com borda extremamente fina em **Ardósia Clara** (`#374151`).
- **Sombra:** Ultra-suave e difusa — `box-shadow: 0 4px 24px rgba(0,0,0,0.4)` — apenas para elevar o cartão do fundo, sem dramatismo.
- **Cantos:** Generosamente arredondados (`border-radius: 0.75rem–1rem` — "curvatura confortável"), tornando a interface acolhedora apesar da seriedade do conteúdo.
- **Card de Alerta Colorido:** Cards de alerta possuem borda lateral esquerda em `4px` com a cor do nível de severidade correspondente, ou fundo com opacidade reduzida da cor do alerta (`background: rgba(cor, 0.15)`).

### Inputs / Formulários / Filtros

- **Campo de Busca:** Fundo **Ardósia Elevada** (`#1f2937`), borda `1px` em **Ardósia Clara** (`#374151`), placeholder em **Névoa de Dados** (`#6b7280`). Ícone de lupa em Cinza Pérola à esquerda. Cantos arredondados (`border-radius: 0.5rem`).
- **Dropdown / Select:** Mesma superfície dos inputs. Chevron (▼) como indicador visual de expansão.
- **Date Picker:** Fundo escuro com ícone de calendário em Cinza Pérola. Bordas finas arredondadas.
- **Toggle Switch:** Track escuro, "thumb" circular branco. Ativo: track em **Verde Menta** (`#10b981`). Semi-ativo (laranja/avisos): track em **Laranja Urgente** (`#f97316`).
- **Checkboxes (Filtros):** Caixa com borda em **Ardósia Clara**, check em **Verde Menta** quando ativo. Associados à cor de severidade quando em filtros de nível de alerta.

### Badges / Status Pills

- Forma **pill** (totalmente arredondada, `border-radius: 9999px`), tamanho compacto.
- Fundo com `10–15%` de opacidade da cor do status + borda fina na cor sólida do status.
- Exemplo: `"● CRÍTICO"` — fundo `rgba(239,68,68,0.15)`, borda `rgba(239,68,68,0.6)`, texto **Vermelho Crítico**.

### Navegação (Sidebar / Bottom Nav)

- **Sidebar Desktop:** Fundo **Azul-Marinho Escuro** (`#111827`), item ativo com fundo **Ardósia Elevada** (`#1f2937`) e marcador lateral esquerdo em **Ciano Tecnológico** (`#22d3ee`). Ícones monocromáticos.
- **Bottom Nav Mobile:** Fundo escuro opaco, ícone ativo em **Vermelho Crítico** (`#ef4444`) com fundo pill arredondado — destaque urgente para o item principal.
- **Logo/Marca:** Tipografia bold em branco com elemento colorido (relâmpago ou ícone de gota) em **Ciano Tecnológico** ou **Vermelho Crítico**, reforçando a identidade de alerta.

### Gráficos e Visualizações

- **Linha de Gráfico:** Cor primária **Ciano Tecnológico** (`#22d3ee`) ou **Azul Hidrológico** (`#3b82f6`). Área sob a linha com gradiente de opacidade decrescente (30% → 0%).
- **Barras (Precipitação):** Azul Hidrológico como padrão, vermelho-róseo em picos críticos.
- **Linhas de Cota:** Tracejadas — **Amarelo Vigília** para atenção, **Laranja Urgente** para alerta, **Vermelho Crítico** para inundação.
- **Fundo do Gráfico:** Transparente ou **Abismo Noturno** (`#0d1117`), linhas de grade em **Ardósia Clara** (`#374151`) com opacidade `30%`.
- **Medidor de Nível (Bar Vertical):** Barra preenchida em gradiente da base (azul tranquilo) ao topo (cor da cota atual). Linhas horizontais marcam as cotas de atenção, alerta e inundação.

---

## 5. Layout Principles

### Estratégia de Espaçamento

**Generoso e respeitoso.** Espaçamento interno dos cartões de `1.5rem–2rem` (padding), com gaps de `1rem–1.5rem` entre cartões em grid. Nunca sobrepõe elementos — cada dado tem seu "território" visual, facilitando a leitura rápida em situações de crise.

### Grid e Estrutura

- **Desktop (Web):** Layout de 2 colunas — sidebar fixa à esquerda (`240–280px`) + área de conteúdo principal expansível. A área de conteúdo usa grid de 3–4 colunas para cards de estatísticas e 2 colunas para cards de monitoramento expandidos.
- **Mobile:** Navegação bottom bar + scroll vertical. Cards em coluna única, valor hero centralizado com destaque máximo.
- **Painel de Detalhes:** Drawer/painel lateral direito (`~300px`) que aparece ao selecionar uma estação no mapa ou clicar em um item, preservando o contexto principal.

### Alinhamento

- **Texto de dados:** Alinhamento à esquerda para rótulos, **negrito e destaque** para valores numéricos.
- **Status badges:** Alinhados à direita nos cabeçalhos de cartão.
- **Números hero:** Flush à esquerda no cartão, com unidade (`m`, `mm`) em tamanho reduzido à direita como superscript visual.

### Densidade da Informação

O sistema é **data-dense mas não claustrofóbico**. Cada cartão agrupa informações relacionadas (estação + nível + tendência + cota) sem dispersão. O uso de separadores em **Ardósia Clara** (`#374151`) organiza grupos de informação dentro de um mesmo contêiner sem criar novos elementos visuais.

### Responsividade de Urgência

O design escala sua **intensidade emocional** conforme o dado: em estado Normal, predominam tons frios e neutros. À medida que o nível de alerta sobe, cores quentes (amarelo → laranja → vermelho) aumentam em área e saturação — o próprio layout "alerta" o usuário através da cor, antes mesmo da leitura textual.

---

## 6. Iconography

- **Estilo:** Monocromático, traçado fino (`stroke-width: 1.5–2px`), sem preenchimento sólido — coerente com a estética técnica e minimalista.
- **Conjunto Base:** Heroicons ou Lucide — ambos disponíveis open-source e com cobertura de ícones meteorológicos e de mapa.
- **Ícones de Alerta:** Triângulo de aviso em amarelo/laranja, sino em vermelho crítico.
- **Ícones de Navegação:** Home, mapa, histórico (Clock), sino (Bell) com badge numérico em vermelho.
- **Tamanho:** `16–20px` em navegação, `20–24px` em cartões, `32px+` como ícone hero em alertas críticos.

---

## 7. Motion & Interaction

- **Transições:** Rápidas e discretas — `150–200ms ease-in-out` para hovers e estado de foco.
- **Dados em tempo real:** Atualização sem flash — fade suave no valor numérico quando atualizado.
- **Hover em cards:** Elevação sutil — `box-shadow` aumenta ligeiramente, borda ganha `1px` de opacidade.
- **Mapa interativo:** Marcadores pulsam levemente (`pulse animation`) em estado de Emergência, atraindo atenção para pontos críticos sem ser perturbador.

---

*Este documento é a fonte de verdade do design system do AlertaRS. Qualquer novo componente ou tela deve aderir a estas definições para garantir consistência visual e clareza operacional.*
