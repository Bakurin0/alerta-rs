# AlertaRS — Design System & Especificações de Tela

Documentação de design extraída das 4 telas do Figma do projeto AlertaRS.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Design Tokens](#2-design-tokens)
3. [Componentes Globais](#3-componentes-globais)
4. [Telas](#4-telas)
   - [4.1 Home — Visão Geral](#41-home--visão-geral)
   - [4.2 Monitoramento em Tempo Real](#42-monitoramento-em-tempo-real)
   - [4.3 Histórico de Chuva](#43-histórico-de-chuva)
   - [4.4 Mapa de Alertas](#44-mapa-de-alertas)
5. [Padrões de Layout](#5-padrões-de-layout)
6. [Acessibilidade & Responsividade](#6-acessibilidade--responsividade)

---

## 1. Visão Geral

**AlertaRS** é um aplicativo mobile de monitoramento hidrológico e climático do Rio Grande do Sul. O design segue uma identidade escura (dark-only), com tipografia focada em legibilidade de dados e uma paleta de alertas baseada em severidade.

| Atributo | Valor |
|---|---|
| Plataforma alvo | iOS (mobile-first) |
| Viewport base | 390–393 × 852px |
| Tema | Dark only |
| Tipografia primária | Inter |
| Tipografia secundária | SF Pro (elementos nativos iOS) |
| Background raiz | `#0E0E0E` |

---

## 2. Design Tokens

### 2.1 Cores

#### Background

| Token | Hex | Uso |
|---|---|---|
| `bg-root` | `#0E0E0E` | Fundo de página |
| `bg-card` | `#181A1A` / `#181B1C` | Cards e painéis |
| `bg-card-deep` | `#1A1B1B` | Variante mais escura de card (iOS style) |
| `bg-item` | `#121314` | Itens internos de card (bento cells) |
| `bg-map-overlay` | `rgba(2, 6, 23, 0.7)` | Overlay do mapa para contraste |

#### Texto

| Token | Hex | Uso |
|---|---|---|
| `text-primary` | `#E5E5E6` | Títulos e headings principais |
| `text-secondary` | `#C8C6C5` | Subtítulos, labels secundários |
| `text-muted` | `#AAABAB` | Labels de apoio, captions, metadados |
| `text-placeholder` | `#747676` | Placeholders de input |
| `text-white` | `#FFFFFF` | Status bar, badge count |

#### Alertas / Severidade

| Token | Hex | Nível | Uso |
|---|---|---|---|
| `alert-critical` | `#EE7D77` | Crítico | Nível do rio em emergência, badge ativo |
| `alert-critical-dark` | `#7E0003` | Crítico (bg) | Background de badge/botão crítico, nav ativa |
| `alert-critical-soft` | `#FFA99D` | Crítico (claro) | Ícone/texto sobre fundo crítico escuro |
| `alert-warning` | `#FFEB3B` | Atenção | Indicador de atenção (amarelo) |
| `alert-watch` | `#7D98FF` | Observação | Ponto de mapa azul claro |
| `alert-info` | `#0356FF` | Informativo | Ponto de mapa azul forte |
| `alert-normal` | `#FFDAD5` | Normal | Ponto de mapa (nível normal) |

#### Bordas e Divisores

| Token | Valor | Uso |
|---|---|---|
| `border-subtle` | `rgba(70, 72, 73, 0.1)` | Bordas de cards, divisores horizontais |
| `border-medium` | `rgba(70, 72, 73, 0.2)` | Bottom sheet, elementos de mapa |
| `border-strong` | `rgba(70, 72, 73, 0.5)` | Inputs de busca e filtro |
| `border-chart` | `rgba(255, 255, 255, 0.1)` | Borda de cards de gráfico |

#### Gradientes

```css
/* Fundo padrão de tela */
background: linear-gradient(0deg, #0E0E0E, #0E0E0E), #FFFFFF;

/* Accent card — Crítico */
background: linear-gradient(135deg, rgba(238, 125, 119, 0.05) 0%, rgba(238, 125, 119, 0) 100%);

/* Accent card — Informativo */
background: linear-gradient(135deg, rgba(125, 152, 255, 0.05) 0%, rgba(125, 152, 255, 0) 100%);
```

---

### 2.2 Tipografia

#### Escala — Inter (dados e UI)

| Role | Font | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Large Number | Inter | 700 | 48px | 53px | -0.96px |
| Heading 1 | Inter | 700 | 36px | 36px | -0.36px |
| Heading 2 | Inter | 600 | 24px | 29px | — |
| Heading 3 | Inter | 700 | 20px | 28px | — |
| Label (uppercase) | Inter | 500 | 14px | 17px | +0.7px |
| Body | Inter | 400 | 16px | 24px | — |
| Caption / Badge | Inter | 600 | 12px | 12px | +0.6px |
| Sub-label | Inter | 500 | 14px | 17px | +0.14px |
| Unit / suffix | Inter | 400 | 18px | 29px | — |

#### Escala — SF Pro (elementos nativos iOS)

| Role | Weight | Size | Line-height |
|---|---|---|---|
| Large Title | 400 | 34px | 41px |
| Title 2 | 400 | 22px | 28px |
| Title 1 | 400 | 28px | 34px |
| Body | 400 | 17px | 22px |
| Caption | 400 | 12px | 34px |

> **Nota:** SF Pro é usada apenas em elementos de estilo iOS nativo (título da home, corpo de alertas). Toda UI custom usa Inter.

---

### 2.3 Espaçamento & Raios

| Token | Valor | Uso |
|---|---|---|
| `radius-card-ios` | 42px | Cards estilo iOS (Home) |
| `radius-card` | 8px | Cards padrão (Monitoramento, Histórico, Mapa) |
| `radius-nav-active` | 12px | Botão ativo da nav bar |
| `radius-badge` | 12px | Badges de status |
| `radius-badge-small` | 2px | Tags de classificação compactas |
| `radius-input` | 4px | Inputs de busca |
| `radius-bottom-sheet` | 16px 16px 0 0 | Bottom sheet do mapa |
| `padding-card` | 24px | Padding interno padrão de cards |
| `gap-section` | 24px | Gap entre seções de conteúdo |
| `gap-card` | 16px | Gap entre itens dentro de card |
| `gap-inline` | 8px | Gap inline (ícone + texto) |

---

## 3. Componentes Globais

### 3.1 TopAppBar (Header)

Presente em todas as telas secundárias. Fixo no topo.

```
┌─────────────────────────────────────┐
│  ← [Icon]   AlertaRS        [Icon]  │
└─────────────────────────────────────┘
```

| Propriedade | Valor |
|---|---|
| Altura | 45–53px |
| Background | `#0E0E0E` |
| Border-bottom | `1px solid rgba(70,72,73,0.1)` |
| Padding | `8px 16px` |
| Título | Inter 700 / 20px / `#C8C6C5` |
| Ícones | `#C8C6C5` / `#AAABAB` |
| Layout | `row / space-between / center` |

---

### 3.2 BottomNavBar

Presente nas telas Histórico e Mapa. Fixo no rodapé.

```
┌──────────────────────────────────────────┐
│  🏠 Início   📊 Monitor  ●  🗺 Mapa  👤  │
└──────────────────────────────────────────┘
```

| Propriedade | Valor |
|---|---|
| Altura | 60–65px |
| Background | `#181A1A` |
| Border-top | `1px solid rgba(70,72,73,0.1)` |
| Padding | `4px 29px 8px` |
| Gap entre links | ~26px |
| Link inativo — ícone/texto | `#AAABAB` |
| Link ativo | Background `#7E0003` / radius `12px` / ícone `#FFA99D` / texto `#FFA99D` |
| Label | Inter 600 / 12px / letter-spacing +0.6px |

---

### 3.3 Badge de Status (Severity Pill)

Usado para indicar o nível de alerta ao lado do nome da estação.

```
● CRÍTICO     ● ATENÇÃO     ● OBSERVAÇÃO
```

| Variant | Background | Border | Texto |
|---|---|---|---|
| Crítico (pill) | `rgba(238,125,119,0.2)` | `rgba(238,125,119,0.3)` | `#EE7D77` |
| Crítico (tag) | `#7E0003` | `rgba(238,125,119,0.2)` | `#EE7D77` |
| Atenção (tag) | `rgba(255,235,59,0.3)` | `rgba(125,152,255,0.2)` | `#FFEB3B` |

Estrutura interna da pill:
- Dot: 8×8px, border-radius 12px, cor de severidade
- Texto: Inter 600 / 12px / letter-spacing +0.6px
- Padding: `4px 8px`, gap `4px`, border-radius `12px`

---

### 3.4 Card Padrão

Base reutilizável para todos os cards de dados.

```css
background: #181A1A;
border: 1px solid rgba(70, 72, 73, 0.1);
border-radius: 8px;
padding: 24px;
```

Cards com accent recebem um gradiente sutil via pseudo-elemento ou camada interna com `opacity: 0.5`.

---

### 3.5 Label de Seção (Heading 3 uppercase)

Usado acima dos dados principais dentro de cards.

```css
font-family: 'Inter';
font-weight: 500;
font-size: 14px;
letter-spacing: 0.7px;
text-transform: uppercase;
color: #AAABAB;
```

Geralmente acompanhado de um ícone à esquerda (16–20px, cor `#AAABAB`).

---

### 3.6 Divisor Horizontal (HorizontalBorder)

```css
border-top: 1px solid rgba(70, 72, 73, 0.1);
padding-top: 16px;
```

---

## 4. Telas

### 4.1 Home — Visão Geral

**Arquivo Figma:** Frame 1 (393×852px)

Tela inicial no estilo nativo iOS com cards de bordas arredondadas (radius 42px).

#### Estrutura

```
┌─────────────────────┐
│   iOS Status Bar    │  top: 19px
├─────────────────────┤
│   Visão Geral       │  Large Title / SF Pro 34px
│   Monitoramento...  │  Title2 / SF Pro 22px
│                     │
│  ┌───────────────┐  │
│  │  Card Guaíba  │  │  rect #1A1B1B / radius 42px / h:258px
│  │  [nível rio]  │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Alertas Ativos│  │  rect #1A1B1B / radius 42px / h:115px
│  │  "12"         │  │  número em Large Title Bold
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Previsão /    │  │  rect #1A1B1B / radius 42px / h:145px
│  │ Aviso Clima   │  │  texto + "Ver detalhes"
│  └───────────────┘  │
├─────────────────────┤
│ [●] [ ] [ ] [ ]    │  Bottom Nav — radius 42px no container
└─────────────────────┘
```

#### Nav Bar (Home — estilo iOS)

- Container: `#181A1A` / radius 42px / `369×98px` / left: 12px / top: 737px
- Botão ativo (Home): `#7E0003` / radius 21px / `70×70px`
- Ícone ativo: `#EE7D77`
- Ícones inativos: `#AAABAB`
- Badge de notificação: ellipse `#7E0003` / 18px / número branco SF Pro 12px

#### Card do Rio Guaíba (Home)

Reutiliza o mesmo conteúdo do card principal da tela de Monitoramento (ver 4.2), mas dentro de um container com radius 42px e sem bordas.

#### Card Alertas Ativos

- Label: "Alertas Ativos" — SF Pro 400 / 28px / `#AAABAB`
- Número: SF Pro **700** / 34px / `#AAABAB`
- Layout: row, gap 10px

#### Card de Aviso Climático

- Label section: Inter 500 / 14px / uppercase / `#AAABAB`
- Corpo: SF Pro 400 / 17px / 22px lh / `#AAABAB`
- Link "Ver detalhes": SF Pro 400 / 17px / `#C8C6C5`
- Paginação dot: `#C8C6C5` / 9.33px

---

### 4.2 Monitoramento em Tempo Real

**Arquivo Figma:** Monitoramento - AlertaRS (390×1090px, scrollável)

#### Estrutura

```
TopAppBar (← AlertaRS [filtro])
│
├─ Section Header
│   "Monitoramento em Tempo Real"   Inter 600 / 24px
│   Descrição                       Inter 400 / 16px / #AAABAB
│
├─ Main Gauge Card — Rio Guaíba
│   ┌──────────────────────────────┐
│   │ 🌊 RIO GUAÍBA - CAIS MAUÁ   ● CRÍTICO │
│   │                              │
│   │  2,47                        │
│   │        m                     │
│   │  ↑ +0.05m nas últimas 2h     │
│   │ ─────────────────────────── │
│   │  Cota de Inundação: 3,00m    │
│   └──────────────────────────────┘
│
├─ Resumo do Estado (Bento 2-cards)
│   ┌──────────────────────────────┐
│   │  497  [estações monitoradas] │  h:101px
│   └──────────────────────────────┘
│   ┌──────────────────────────────┐
│   │  ALERTAS ATIVOS    [⚠ icon] │
│   │  12                          │
│   │  ■ 3 EMERGÊNCIA  ■ 9 Atenção│  tags coloridas
│   └──────────────────────────────┘
│
└─ Secondary — Previsão
    ┌──────────────────────────────┐
    │ ☁ PREVISÃO METEOROLÓGICA    │
    │ Chuvas intensas previstas... │
    │ Ver detalhes →               │
    └──────────────────────────────┘
```

#### Main Gauge Card

| Elemento | Especificação |
|---|---|
| Container | `background: #181A1A` / border subtle / radius 8px / padding 24px / h: 253px |
| Gradient accent | `linear-gradient(135deg, rgba(238,125,119,0.05)…)` / opacity 0.5 |
| Label da estação | Inter 500 / 14px / uppercase / letter-spacing +0.7px / `#AAABAB` |
| Badge CRÍTICO | Pill vermelho — ver §3.3 |
| Valor numérico | Inter **700** / 48px / letter-spacing -0.96px / `#EE7D77` |
| Unidade "m" | Inter 400 / 18px / `#AAABAB` |
| Tendência | Inter 500 / 14px / `#EE7D77` (ícone seta + texto) |
| Separador | `border-top: 1px solid rgba(70,72,73,0.1)` / padding-top 16px |
| Cota | Inter 400 / 16px / 24px lh / `#AAABAB` |

#### Card Resumo — Estações

- Número "497": Inter 700 / 36px / `#C8C6C5`

#### Card Resumo — Alertas

- Gradient accent azul: `rgba(125,152,255,0.05)`
- Número "12": Inter 700 / 36px / `#C8C6C5`
- Tag EMERGÊNCIA: `background #7E0003` / border `rgba(238,125,119,0.2)` / texto `#EE7D77`
- Tag ATENÇÃO: `background rgba(255,235,59,0.3)` / border `rgba(125,152,255,0.2)` / texto `#FFEB3B`
- Ícone de alerta: `#7E0003` / 22×19px

#### Card Previsão (Secondary Information)

- Ícone: 20×20px / `#AAABAB`
- Label: Inter 500 / 14px / uppercase / letter-spacing +0.7px
- Corpo: Inter 400 / 16px / 24px lh / `#AAABAB`
- Link "Ver detalhes": Inter 500 / 14px / `#C8C6C5` + chevron `#C8C6C5` 9.33px

---

### 4.3 Histórico de Chuva

**Arquivo Figma:** Histórico de Chuva - AlertaRS (390×1061px, scrollável)

#### Estrutura

```
BottomNavBar (fixo, ordem: z-index 2)
TopAppBar (← AlertaRS [share])
│
├─ Header & Search
│   "Histórico de Chuva"     Inter 600 / 24px
│   Descrição                 Inter 400 / 16px / #AAABAB
│   [🔍 Buscar estação...]    Input / h:35px / bg #181A1A
│   [📍 Todas as regiões ▼]  Select / h:34.8px / bg #181A1A
│
└─ Bento Grid
    ┌──────────────────────────────────┐
    │ Section — Main Chart Area        │  h:419.59px / bg #181A1A
    │                                  │
    │  PRECIPITAÇÃO ACUMULADA          │  label uppercase
    │  127,4  mm nos últimos 7 dias    │  Inter 700 / 36px
    │                                  │
    │  ████████ ███ ████ ████          │  Bar chart minimalista
    │  ─────────────────────────────   │  border-bottom sutil
    │  Ago 14  Ago 17  Ago 20         │  labels Inter 400 / 12px
    └──────────────────────────────────┘
    ┌──────────────────────────────────┐
    │ Section — Alerts Summary         │  h:294px / bg #181B1C
    │                                  │
    │  🔔 Resumo de Alertas            │
    │  ┌────────────────────────────┐  │
    │  │ ● Emergência          3   │  │
    │  │ ● Atenção             9   │  │
    │  │ ● Observação          --  │  │
    │  └────────────────────────────┘  │
    │  ─────────────────────────────   │
    │        Ver todos os alertas      │
    └──────────────────────────────────┘
```

#### Input de Busca

```css
background: #181A1A;
border: 1px solid rgba(70, 72, 73, 0.5);
border-radius: 4px;
padding: 8px 16px 8px 40px;  /* espaço para ícone à esquerda */
height: 35px;
```
- Placeholder: Inter 500 / 14px / `#747676`
- Ícone: 17.19px / `#747676` / posição absolute left:12px

#### Select / Dropdown de Região

- Mesmo estilo do input, mas com ícone de filtro à esquerda e chevron à direita
- Texto selecionado: Inter 500 / 14px / `#E5E5E6`

#### Bar Chart (Minimalist)

| Elemento | Especificação |
|---|---|
| Container | `border-bottom: 1px solid rgba(70,72,73,0.2)` / h:256px |
| Grid lines (Y) | 4 linhas horizontais / `border-top: 1px solid #FFF` / opacity 0.1 |
| Barras inativas | `rgba(200,198,197,0.2)` / radius `2px 2px 0 0` |
| Barra alta | `rgba(200,198,197,0.6–0.8)` (variação de opacidade = intensidade) |
| Tooltip hover | bg `#1E2020` / radius 2px / texto `#DAE2FD` / Inter 400 / 12px |
| Labels eixo X | Inter 400 / 12px / `#AAABAB` |

#### Alerts Summary — Linhas de Itens

```css
background: #121314;
border: 1px solid rgba(70, 72, 73, 0.1);
border-radius: 4px;
padding: 8px;
height: 46px;
```

| Severity | Dot color | Texto |
|---|---|---|
| Emergência | `#EE7D77` | `#E5E5E6` |
| Atenção | `#FFEB3B` | `#E5E5E6` |
| Observação | `#0356FF` | `#E5E5E6` |

- Contagem: Inter 600 / 20px / `#E5E5E6`
- Link "Ver todos": Inter 600 / 12px / letter-spacing +0.6px / `#C8C6C5`

---

### 4.4 Mapa de Alertas

**Arquivo Figma:** Mapa de Alertas - AlertaRS (390×1330.8px)

#### Estrutura

```
TopAppBar (fixed, z-index 2)  ← AlertaRS [filtro]
│
├─ Main Map Canvas             h:884px
│   [Imagem do mapa RS]        top:57px / w:390px / h:770px
│   Dark overlay               rgba(2,6,23,0.7) / mix-blend: multiply
│   ● Marcadores de estação    pins coloridos por severidade
│
├─ Station Details Bottom Sheet (glassmorphism)
│   h:439.8px / bottom:65px
│   bg: #181B1C / border sutil / backdrop-filter: blur(12px)
│   border-radius: 16px 16px 0 0
│   │
│   ├─ Drag Handle             48×4px / rgba(70,72,73,0.5) / radius 12px
│   ├─ Header                  Nome da estação + status + botão fechar
│   ├─ Data Grid (bento 2-col) Level Card + Trend Card
│   ├─ Warning Message         border-left 4px + texto descritivo
│   └─ Action Button           bg #474746 / radius 8px
│
└─ BottomNavBar (fixed, z-index 3)
```

#### Marcadores de Estação no Mapa

| Variant | Background | Sombra (glow) | Border |
|---|---|---|---|
| Crítico | `#EE7D77` | `rgba(255,82,82,0.4)` 15px | 2px `#000` |
| Informativo | `#0356FF` | `rgba(255,171,64,0.4)` 15px | 2px `#000` |
| Atenção | `#7D98FF` | `rgba(255,235,59,0.3)` 15px | 2px `#000` |
| Normal | `#FFDAD5` | sombra 10px rgba(0,0,0,0.5) | 2px `#000` |

Todos os pins: border-radius 12px, com inner shadow layer `rgba(255,255,255,0.002)`.

#### Bottom Sheet — Header

- Nome da estação: Inter 600 / 20px / `#E5E5E6`
- Status label: Inter 500 / 14px / uppercase / letter-spacing +0.35px / `#AAABAB`
- Dot de status: 8px / `#C8C6C5` (muda conforme severidade)
- Botão fechar: ícone 14×14px / `#AAABAB`

#### Bottom Sheet — Data Grid

Dois cards lado a lado (`gap: 8px`):

**Level Card** (nível atual)
```css
background: #121314;
border: 1px solid rgba(70, 72, 73, 0.1);
border-radius: 8px;
padding: 16px;
width: 166px;
```
- Label: Inter 600 / 12px / `#AAABAB` + ícone 10.67px
- Valor: Inter 700 / 36px / `#E5E5E6` (ou cor de severidade quando ativo)

**Trend Card** (tendência)
- Mesma estrutura, mas valor em Inter 400 / 16px / `#E5E5E6`

#### Bottom Sheet — Warning Message

```css
background: #181A1A;
border-left: 4px solid #C8C6C5;  /* muda cor conforme severidade */
border-radius: 8px;
padding: 16px;
gap: 4px;
```
- Label: Inter 600 / 12px / uppercase / `#AAABAB`
- Corpo: Inter 400 / 16px / `#E5E5E6`

#### Bottom Sheet — Action Button

```css
background: #474746;
border-radius: 8px;
padding: 8px 16px;
```
- Texto: Inter 500 / 14px / `#D2D0CF`
- Ícone: `#D2D0CF`

---

## 5. Padrões de Layout

### 5.1 Hierarquia de Z-Index

| Camada | Z-Index | Elemento |
|---|---|---|
| Base | 0 | Mapa, conteúdo scrollável |
| Cards | 0–3 | Seções internas de cards |
| Header | 1–2 | TopAppBar |
| Bottom Sheet | 1 | Sheet de detalhes do mapa |
| Nav Bar | 2–3 | BottomNavBar |

### 5.2 Grid de Conteúdo

- **Largura máxima de conteúdo:** `max-width: 1280px` (preparado para web)
- **Padding horizontal de tela:** `16px`
- **Largura útil (390px):** `390 - 32 = 358px`
- **Gap padrão entre cards:** `24px`
- **Gap entre itens dentro de card:** `16px`

### 5.3 Padrão Bento

Cards de resumo usam layout bento com 2 colunas simétricas:
```css
display: flex;
flex-direction: row;
gap: 8px;
width: 340–358px;  /* ajustado ao padding do card pai */
```
Cada célula cresce igualmente (`flex-grow: 1`).

### 5.4 Scroll

- Telas com conteúdo longo: `overflow-y: scroll`
- Padding bottom para não sobrepor a BottomNavBar: `96–181px`

---

## 6. Acessibilidade & Responsividade

### Contraste de Texto

| Combinação | Uso | Observação |
|---|---|---|
| `#E5E5E6` on `#0E0E0E` | Títulos | Alto contraste |
| `#AAABAB` on `#181A1A` | Labels secundários | Verificar ratio WCAG AA |
| `#EE7D77` on `#181A1A` | Dados críticos | Manter acima de 4.5:1 |
| `#FFEB3B` on `#181A1A` | Dados de atenção | Verificar ratio |

### Touch Targets

- Itens de nav: mínimo 44×44px (Apple HIG)
- Botões de ação: mínimo 33–38px de altura
- Marcadores do mapa: 12px de radius (ponto pequeno) — considerar ampliar para toque

### Responsividade

O layout usa `max-width: 1280px` nos containers de conteúdo, indicando intenção de adaptação para tablet/web. Em viewports maiores:
- Centrar o container principal
- Cards do bento podem expandir para 3–4 colunas
- Bottom sheet pode virar sidebar lateral fixa
