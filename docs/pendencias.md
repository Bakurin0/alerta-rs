# Pendências

## Para concluir a Etapa 1

- preencher nomes e papéis dos 5 a 7 integrantes;
- informar curso, turma e período;
- definir datas e duração da Sprint;
- atribuir tarefas aos integrantes reais;
- atualizar os protótipos para remover alertas sem fonte;
- passar o conteúdo para o modelo oficial;
- revisar e exportar o documento final.

## Para continuar o desenvolvimento

1. Solicitar acesso à API HidroWebService.
2. Testar o inventário de estações do RS.
3. Confirmar quais estações possuem nível e chuva recentes.
4. Substituir os mocks pela API da ANA.
5. Buscar a malha do RS pela API do IBGE.
6. Tratar carregamento, indisponibilidade e ausência de dados.
7. Ajustar as telas ao escopo sem alertas oficiais.

## Critério de viabilidade

A ANA é a dependência principal. Se as credenciais não forem liberadas ou os dados não atenderem às telas, será necessário escolher outra API documentada ou mudar o tema. Banco local e dados manuais não serão usados como alternativa.

## Fora do escopo

- banco de dados;
- usuários, favoritos e notificações;
- alertas oficiais da Defesa Civil;
- previsão meteorológica;
- atualização em segundo plano;
- infraestrutura de produção.
