# AlertaRS

Aplicação web estudantil para apresentação de dados hidrometeorológicos do Rio Grande do Sul.

## Escopo do trabalho

O projeto será desenvolvido somente com estas três funcionalidades:

1. Painel de medições atuais;
2. Mapa de estações;
3. Detalhes da estação.

O backlog com pontuação e o detalhamento da Sprint estão em [docs/backlog-produto-sprint.md](docs/backlog-produto-sprint.md). A documentação acadêmica está em [Etapa-1.md](Etapa-1.md).

## Dados

Durante o desenvolvimento são usados dados mockados. A fonte prevista para uma integração posterior é a [API de Dados Hidrometeorológicos da Defesa Civil RS](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica), sem banco de dados próprio. O mapa pode utilizar a [API de Malhas do IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/estados/43).

## Scrum

- `[Integrante 1]` — Product Owner
- `[Integrante 2]` — Scrum Master
- `[Integrante 3]`, `[Integrante 4]`, `[Integrante 5]` — Desenvolvimento

## Executar

```bash
cd app
npm install
npm run dev
```
