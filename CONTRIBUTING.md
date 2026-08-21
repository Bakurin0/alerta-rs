# Guia de Contribuição — AlertaRS 🌊

Obrigado pelo interesse em contribuir com o **AlertaRS** (Painel de Monitoramento Hidrológico e Prevenção Climática do RS)! 

Este projeto é desenvolvido no âmbito do **Projeto Integrador IV** da Universidade de Caxias do Sul (UCS), utilizando a metodologia **Scrum** e boas práticas de desenvolvimento colaborativo de software.

Para garantir a qualidade do código, a consistência dos artefatos e um ambiente de colaboração saudável, pedimos que siga as orientações descritas neste guia.

---

## 📋 Sumário

- [Código de Conduta](#-código-de-conduta)
- [Estrutura do Time e Papéis (Scrum)](#-estrutura-do-time-e-papéis-scrum)
- [Fluxo de Trabalho e Branches](#-fluxo-de-trabalho-e-branches)
- [Padrão de Commits](#-padrão-de-commits)
- [Como Contribuir (Passo a Passo)](#-como-contribuir-passo-a-passo)
- [Submissão de Pull Requests](#-submissão-de-pull-requests)
- [Relato de Bugs e Novas Funcionalidades](#-relato-de-bugs-e-novas-funcionalidades)

---

## 🤝 Código de Conduta

Esperamos que todos os participantes mantenham um ambiente inclusivo, respeitoso e livre de assédio. 

- Seja respeitoso e empático nas discussões e revisões de código.
- Forneça feedback construtivo focado nas soluções.
- Respeite as decisões e priorizações definidas no Product Backlog.

---

## 👥 Estrutura do Time e Papéis (Scrum)

O desenvolvimento segue a divisão de papéis do **Scrum**:

- **Product Owner (PO):** Define e prioriza os itens do **Product Backlog** (Cards `BP-01`, `BP-02`, etc.), garantindo que os requisitos atendam às necessidades do projeto.
- **Scrum Master (SM):** Facilita o processo, remove impedimentos e garante a aplicação das reuniões e rituais (Sprints, Dailies, Reviews e Retrospectivas).
- **Desenvolvedores:** Planejam as Sprints, realizam estimativas em *Story Points*, implementam o código, executam testes e constroem os protótipos e funcionalidades.

> [!NOTE]
> Qualquer alteração no escopo de um card do backlog ou mudança na prioridade da Sprint atual deve ser alinhada com o **Product Owner**.

---

## 🌿 Fluxo de Trabalho e Branches

Adotamos uma estratégia baseada em **Feature Branches** vinculadas aos itens do Product Backlog:

- `main` ou `master`: Branch estável e em produção. Contém o código aprovado nas Sprints.
- `develop` ou `sprint-X`: Branch de integração da Sprint vigente.
- `feature/<ID-CARD>-descricao-curta`: Branches de funcionalidade criadas para implementar histórias de usuário.
- `fix/<ID-CARD>-descricao-curta`: Branches de correção de bugs.
- `docs/descricao-curta`: Branches dedicadas à documentação.

### Exemplos de Nomes de Branch:

- `feature/BP-01-nivel-rios`
- `feature/BP-02-historico-chuva`
- `fix/BP-03-marcadores-mapa`
- `docs/atualizar-contributing`

---

## 📝 Padrão de Commits

Utilizamos a convenção do **Conventional Commits** para manter o histórico claro e rastreável.

### Formato:

```text
<tipo>(<escopo>): <descrição curta e imperativa>
```

### Tipos Permitidos:

- `feat`: Nova funcionalidade para o usuário (ex: `feat(bp-01): adicionar seletor de municipios`)
- `fix`: Correção de bug (ex: `fix(bp-03): corrigir cor dos marcadores no mapa`)
- `docs`: Alterações na documentação (ex: `docs: adicionar guia CONTRIBUTING.md`)
- `style`: Ajustes de formatação ou CSS sem alterar lógica (ex: `style(ui): ajustar espaçamento dos cards`)
- `refactor`: Refatoração de código sem alterar funcionalidade (ex: `refactor(api): otimizar consulta hidrológica`)
- `test`: Adição ou correção de testes (ex: `test(bp-02): adicionar teste para calculo de precipitação`)
- `chore`: Tarefas de build, dependências ou configurações (ex: `chore: atualizar arquivo dependabot.yml`)

> [!TIP]
> Sempre referencie o card do backlog na mensagem do commit quando aplicável! Exemplo:  
> `feat(bp-01): implementar card de estação hidrológica (refs #BP-01)`

---

## 🚀 Como Contribuir (Passo a Passo)

1. **Fork/Clone o Repositório:**
   ```bash
   git clone https://github.com/Bakurin0/app-projeto.git
   cd app-projeto
   ```

2. **Crie uma Branch para sua Funcionalidade:**
   ```bash
   git checkout -b feature/BP-01-nivel-rios
   ```

3. **Desenvolva e Teste:**
   - Mantenha o código limpo, legível e documentado.
   - Siga as especificações visuais e funcionais definidas na estória de usuário.

4. **Realize os Commits:**
   ```bash
   git add .
   git commit -m "feat(bp-01): implementar medidor de nível fluviométrico"
   ```

5. **Envie a Branch para o Repositório Remoto:**
   ```bash
   git push origin feature/BP-01-nivel-rios
   ```

---

## 🔀 Submissão de Pull Requests (PR)

Antes de abrir um **Pull Request**, verifique se:

- [ ] A branch está atualizada em relação à branch principal (`main`/`develop`).
- [ ] Os commits seguem a convenção do Conventional Commits.
- [ ] Todos os arquivos e artefatos necessários foram incluídos.
- [ ] O PR está vinculado a uma História de Usuário (`BP-XX`).

### Modelo de Descrição de PR:

```markdown
## 📌 Tipo de Alteração
- [x] Nova Funcionalidade (feat)
- [ ] Correção de Bug (fix)
- [ ] Atualização de Documentação (docs)

## 🎯 Card Relacionado
Relacionado ao card **BP-01: Visualizar nível atual de rios e bacias por município**.

## 📄 Resumo das Alterações
- Adicionado componente visual de medição fluviométrica.
- Integrado filtro de buscas por município.

## 🧪 Como Testar
1. Acesse o painel principal.
2. Selecione o município "Porto Alegre".
3. Verifique se os cards das estações são exibidos com as cotas de atenção/alerta.
```

> [!IMPORTANT]
> Todo Pull Request precisa ser revisado e aprovado por pelo menos 1 integrante da equipe antes do merge.

---

## 🐛 Relato de Bugs e Novas Funcionalidades

Se você encontrou um bug ou tem uma sugestão de melhoria:

1. Verifique se a questão já não foi relatada no **Product Backlog** ou nas **Issues**.
2. Abra uma **Issue** no GitHub fornecendo:
   - Título claro e objetivo.
   - Passos para reproduzir o comportamento (em caso de bug).
   - Comportamento esperado vs. comportamento observado.
   - Protótipos, capturas de tela ou logs de erro, se disponível.

---

Agradecemos sua colaboração para tornar o **AlertaRS** uma ferramenta eficiente no auxílio à prevenção e monitoramento de eventos climáticos no RS! 💚🔴🟡🟢
