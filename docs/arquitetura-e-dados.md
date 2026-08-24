# Fontes de dados e escopo

## Decisões

- O AlertaRS não terá banco de dados.
- A versão final deverá consultar dados por APIs.
- Nesta etapa, o frontend usa somente mocks locais.
- O mock segue o mesmo formato de dados que será usado pelo adaptador da API.

## Fonte principal planejada: Defesa Civil RS

A API da Rede Hidrometeorológica da Defesa Civil RS é a fonte principal planejada porque é específica do estado e possui documentação pública GraphQL.

- Documentação: [API de Dados Hidrometeorológicos](https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica)
- Endpoint: https://redehidrometeorologica.defesacivil.rs.gov.br/graphql

Ela fornece estações e coordenadas, município, região e bacia, nível do rio e tendência, chuva acumulada em várias janelas, data/hora da leitura, histórico por período e atualizações em tempo real por Subscription WebSocket.

## Fonte cartográfica

A API de Malhas do IBGE será usada somente para o contorno geográfico do Rio Grande do Sul:

    GET https://servicodados.ibge.gov.br/api/v3/malhas/estados/43
        ?formato=application/vnd.geo+json
        &qualidade=minima

## Fonte alternativa

A API HidroWebService da ANA permanece como alternativa para ampliar a cobertura ou consultar séries históricas específicas. Ela não será a integração principal neste momento.

## Arquitetura atual

    Telas React → hydrologyRepository → mock local
                                          ↓ futuro
                                  adaptador Defesa Civil RS

O aplicativo não chama nenhuma API atualmente. A troca futura deverá ocorrer somente no repositório, mantendo os componentes independentes da origem dos dados.

## Limites

- os valores exibidos agora são fictícios;
- não há alertas oficiais nem classificação por severidade;
- o projeto não emite avisos de emergência;
- não há banco, persistência ou sincronização própria;
- o adaptador real será implementado somente após a validação da API.

## Verificação antes da integração

Antes de trocar o mock pela API, a equipe deverá confirmar as condições de uso acadêmico da Defesa Civil RS, testar o CORS no ambiente de desenvolvimento e tratar estações sem nível ou chuva disponíveis.
