# Análise revisada da Etapa 1

Data da revisão: 22/08/2026.

## Resultado

O planejamento cobre os três artefatos centrais da entrega — Product Backlog, Sprint Backlog e detalhamento das histórias selecionadas — mas ainda não está pronto para entrega final. A análise anterior afirmava que havia uma aplicação e uma API ClimaRS confirmada; ambas as afirmações estavam sem sustentação no estado atual do repositório.

## Decisão de escopo

- não haverá banco de dados;
- a versão final utilizará somente APIs;
- ANA fornecerá estações e medições hidrológicas;
- IBGE fornecerá a malha do Rio Grande do Sul;
- alertas oficiais e classificação por severidade foram removidos por falta de API pública documentada;
- a viabilidade deve ser confirmada obtendo credenciais e testando a cobertura da ANA.

## Situação por item

| Item | Situação | Ação |
|---|---|---|
| Grupo de 5 a 7 integrantes e papéis Scrum | Pendente | Substituir todos os `[Integrante N]` por nomes reais |
| Definição, objetivo e benefício social | Atende | Manter |
| Fonte de dados | Revisado | ANA para medições e IBGE para a malha geográfica |
| Product Backlog priorizado e estimado | Atende | Confirmar prioridades com o Product Owner |
| Sprint Backlog | Parcial | Registrar duração/datas da Sprint e capacidade baseada na equipe |
| Histórias, critérios, protótipos e tarefas | Parcial | Caminhos corrigidos; responsáveis continuam pendentes |
| Protótipos | Parcial | Estão marcados como temporários; selecionar e aprovar versões finais |
| Evidências do Scrum | Pendente | Incluir datas de planejamento, dailies, review e retrospectiva, quando realizadas |
| Desenvolvimento inicial | Iniciado | Aplicação React/Vite criada em `app/`, com mock, filtros e regras testáveis |

## Pendências que exigem informações da equipe

1. Nomes dos 5 a 7 integrantes e papel de cada pessoa.
2. Datas e duração da Sprint 1.
3. Confirmação do curso/turma e demais campos de identificação exigidos pelo modelo acadêmico.
4. Aprovação do Product Owner para escopo, critérios e protótipos.

## Correções executadas nesta revisão

- caminhos dos três protótipos corrigidos;
- estrutura real do repositório corrigida no README;
- alegação não comprovada de API ClimaRS removida;
- API HidroWebService/ANA mapeada com riscos e próximos passos;
- primeiro incremento funcional criado com dados simulados claramente identificados.

## Observação de segurança

O projeto é informativo e não deve se declarar um canal oficial de alerta. Dados simulados precisam permanecer visivelmente marcados, e dados reais devem sempre exibir fonte e horário de atualização.
