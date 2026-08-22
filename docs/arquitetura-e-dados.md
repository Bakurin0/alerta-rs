# Fontes de dados e escopo

## Decisões

- O AlertaRS não terá banco de dados.
- Todas as informações da versão final serão obtidas de APIs.
- A aplicação apenas consultará, filtrará e apresentará os dados recebidos.

## APIs selecionadas

### ANA — HidroWebService

Fonte principal para inventário de estações, localização, município, rio, bacia, nível, chuva, vazão e séries históricas.

- [Swagger HidroWebService](https://www.ana.gov.br/hidrowebservice/swagger-ui/index.html)
- [Manual oficial](https://www.gov.br/ana/pt-br/assuntos/monitoramento-e-eventos-criticos/monitoramento-hidrologico/orientacoes-manuais/manuais/manual-hidrowebservice_publica.pdf/view)

| Necessidade | Operação da ANA |
|---|---|
| Listar estações do RS | \`HidroInventarioEstacoes\` |
| Obter leituras recentes | \`HidroinfoanaSerieTelemetricaAdotada\` |
| Consultar chuva histórica | \`HidroSerieChuva\` |
| Consultar níveis históricos | \`HidroSerieCotas\` |
| Listar municípios e bacias | \`HidroMunicipio\`, \`HidroBacia\` e \`HidroSubBacia\` |

O acesso depende de credenciais solicitadas à ANA. Algumas consultas limitam o período por requisição.

### IBGE — API de Malhas

Fonte do contorno do Rio Grande do Sul:

\`\`\`text
GET https://servicodados.ibge.gov.br/api/v3/malhas/estados/43
    ?formato=application/vnd.geo+json
    &qualidade=minima
\`\`\`

## Funcionamento

\`\`\`text
API ANA ───→ aplicação React ───→ listas, indicadores e gráficos
API IBGE ──→ aplicação React ───→ mapa do RS
\`\`\`

Não haverá banco, importação permanente ou sincronização em segundo plano. Durante o desenvolvimento, mocks poderão ser usados somente para construir a interface.

## Funcionalidades removidas

Não foi encontrada uma API pública documentada com alertas da Defesa Civil do RS e cotas oficiais por estação. Foram retirados:

- mapa de alertas ativos;
- classificação oficial Normal/Atenção/Alerta/Inundação;
- histórico de alertas da Defesa Civil;
- mensagens de evacuação;
- cálculo de risco com limites não fornecidos pelas APIs.

O produto apresentará medições hidrológicas e não afirmará emitir alertas oficiais.

## Limites

- a aplicação depende da disponibilidade das APIs;
- não haverá histórico próprio além do retornado pela ANA;
- contas, favoritos e notificações ficam fora do escopo;
- a equipe precisa validar as credenciais e a cobertura da ANA antes de avançar.
