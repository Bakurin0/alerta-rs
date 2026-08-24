# Pendências

## Documentação da Etapa 1

- preencher nomes e papéis dos integrantes;
- informar curso, turma e período;
- definir datas e duração da Sprint;
- atribuir tarefas aos integrantes reais;
- atualizar os protótipos para não prometer alertas oficiais;
- passar o conteúdo para o modelo oficial;
- revisar e exportar o documento final.

## Desenvolvimento atual

- manter o frontend usando apenas mocks;
- alinhar os mocks aos campos da API da Defesa Civil RS;
- substituir textos de alerta por situação da estação quando a tela for revisada;
- adicionar estados de carregamento, erro e ausência de medição;
- manter a fonte e o horário visíveis nos componentes.

## Próxima etapa: integração da API

1. Confirmar as condições de uso acadêmico com a Defesa Civil RS.
2. Testar a consulta GraphQL no navegador.
3. Implementar o adaptador no repositório, sem alterar as telas.
4. Consultar estações do estado e mapear os campos recebidos.
5. Buscar a malha do RS pela API do IBGE.
6. Tratar falhas, limites e estações sem determinado sensor.
7. Comparar os dados reais com os mocks antes de remover os mocks.

## Fora do escopo

- banco de dados;
- cadastro de usuários;
- favoritos e notificações;
- alertas oficiais ou mensagens de evacuação;
- classificação de severidade sem cotas oficiais;
- previsão meteorológica;
- atualização automática em segundo plano;
- infraestrutura de produção.
