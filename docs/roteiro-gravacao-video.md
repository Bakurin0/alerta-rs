# Roteiro de Gravação do Vídeo de Demonstração — AlertaRS
**Projeto Integrador IV-A (Trimestre 2026/3) — UCS**  
**Professor:** Rocco (`gerocco@ucs.br`)

---

## 1. Identificação da Equipe
- **Product Owner:** João Pedro Castro de Brito
- **Scrum Master:** Neytan Belisário
- **Desenvolvedores:** Arthur Schmidt, Gabriel Antoniazzi, Sandro Roni Soares

---

## 2. Orientações Gerais de Gravação
- **Duração recomendada:** entre 5 e 8 minutos.
- **Plataforma:** YouTube (enviar como *Não Listado* ou *Público*, liberado para o domínio `@ucs.br`).
- **Ferramentas sugeridas para gravação:** OBS Studio, Google Meet com gravação de tela, ou gravador nativo do sistema.
- **Preparação:** Iniciar a aplicação localmente (`npm run dev --prefix app`) e abrir no navegador em tela cheia (`http://localhost:5173`).

---

## 3. Estrutura e Roteiro Passo a Passo

### Bloco 1: Abertura e Apresentação do Projeto (1 a 1,5 min)
- **Quem fala:** Scrum Master ou Product Owner.
- **O que mostrar:** Slide de título ou tela inicial do AlertaRS.
- **Falas sugeridas:**
  > "Olá, professor Rocco e colegas. Somos a equipe responsável pelo projeto **AlertaRS**, desenvolvido no Projeto Integrador IV-A da UCS.
  > Nosso time é composto por Neytan Belisário como Scrum Master, João Pedro de Brito como Product Owner, e Arthur Schmidt, Gabriel Antoniazzi e Sandro Roni Soares como Desenvolvedores.
  > O objetivo do AlertaRS é fornecer uma plataforma web ágil e informativa para monitoramento hidrometeorológico de rios e chuvas no estado do Rio Grande do Sul, transformando dados públicos oficiais em visualizações acessíveis para prevenção e acompanhamento de cheias."

---

### Bloco 2: Arquitetura e Tecnologias Utilizadas (1,5 a 2 min)
- **Quem fala:** Desenvolvedor (ex.: Arthur Schmidt).
- **O que mostrar:** Diagrama de Classes (`docs/diagramas/modelo-estrutural-classes.png`) ou código do repositório.
- **Falas sugeridas:**
  > "Para a construção do software, adotamos uma arquitetura modular em camadas, utilizando **React 19** e empacotador **Vite** no frontend.
  > A fonte de dados principal integrada é a **API pública GraphQL da Rede Hidrometeorológica da Defesa Civil do Estado do Rio Grande do Sul**, trazendo telemetria em tempo real de mais de 130 estações.
  > A camada de repositório (`hydrologyRepository`) encapsula a chamada de rede e implementa um mecanismo de resiliência com fallback transparente para dados simulados em caso de instabilidade externa ou restrição de CORS.
  > Para a modelagem cartográfica, projetamos matematicamente as coordenadas geográficas (latitude e longitude) diretamente sobre a malha vetorial SVG do estado baseada no IBGE, sem necessidade de banco de dados próprio ou bibliotecas pesadas de mapas proprietários."

---

### Bloco 3: Demonstração Funcional das Histórias da Sprint (3 a 4 min)

#### História 1 — Painel de medições atuais
- **Quem demonstra:** Desenvolvedor (ex.: Gabriel Antoniazzi).
- **Ação na tela:** Exibir a aba inicial "Medições atuais".
- **Falas sugeridas:**
  > "Aqui na primeira história do backlog da sprint, temos o **Painel de Medições Atuais**. O usuário visualiza os cards organizados por bacia hidrográfica e município.
  > Em cada card é exibido o nome da estação, o nível atual do rio em metros, a precipitação acumulada nas últimas 24 horas em milímetros e o horário exato da última medição recebida.
  > Destacamos também no topo o badge dinâmico indicando a conexão com a API Oficial da Defesa Civil RS."

#### História 2 — Mapa de estações
- **Quem demonstra:** Desenvolvedor (ex.: Sandro Roni Soares).
- **Ação na tela:** Clicar na aba "Mapa de estações", passar o mouse e clicar em diferentes marcadores no mapa.
- **Falas sugeridas:**
  > "Na segunda história, apresentamos o **Mapa de Estações do Rio Grande do Sul**. Os marcadores circulares são posicionados geograficamente pelas coordenadas reais de cada ponto de medição sobre a malha gaúcha.
  > Ao clicar em qualquer marcador, a estação selecionada é destacada visualmente e o painel lateral é imediatamente atualizado com a identificação, nível atual e chuva em 24h, oferecendo um botão direto para consultar os detalhes completos."

#### História 3 — Detalhes da estação
- **Quem demonstra:** Desenvolvedor (ex.: Arthur Schmidt ou Sandro Roni Soares).
- **Ação na tela:** Clicar em "Abrir detalhes" ou "Ver detalhes".
- **Falas sugeridas:**
  > "Na terceira história, temos a visão de **Detalhes da Estação**. O aplicativo consolida todos os parâmetros hidrometeorológicos da estação selecionada:
  > Código oficial, município, bacia hidrográfica, região do estado, nível do rio, situação da cota (Normal, Atenção, Alerta ou Inundação), bem como o histórico de chuva acumulada em diferentes janelas de tempo (1h, 3h, 6h, 12h e 24h) e o timestamp da telemetria.
  > A qualquer momento, o usuário pode transitar fluidamente entre os cards, o mapa e a ficha de detalhes através do menu superior."

---

### Bloco 4: Encerramento (30 seg a 1 min)
- **Quem fala:** Scrum Master (Neytan Belisário).
- **O que mostrar:** Retorno à tela do aplicativo com os créditos ou repositório GitHub.
- **Falas sugeridas:**
  > "Com essas três funcionalidades integradas e validadas, concluímos com êxito os compromissos da Sprint do Projeto Integrador IV-A, unindo o ciclo de desenvolvimento ágil Scrum à manipulação e consumo de dados públicos abertos. Agradecemos a atenção de todos!"
