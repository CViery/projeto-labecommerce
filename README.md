LabEcommerce Backend
Bem-vindo ao LabEcommerce, o backend responsável por fornecer uma API poderosa para o seu e-commerce. Este projeto utiliza uma variedade de tecnologias avançadas, como Knex, SQLite, TypeScript, métodos HTTP, CORS e Express.

Utilização
Para começar a usar o LabEcommerce, siga as instruções abaixo:

Certifique-se de ter o Node.js instalado em seu sistema.
Clone este repositório em sua máquina local.
Navegue até o diretório raiz do projeto.
Execute o comando npm install para instalar as dependências do projeto.
Após a instalação e configuração, execute o comando npm run dev para iniciar o servidor localmente.
O servidor estará disponível em http://localhost:3003.
Endpoints
O LabEcommerce oferece uma API rica com os seguintes endpoints:

Usuários
GET /users: Retorna todos os usuários cadastrados.
POST /users: Cria um novo usuário.
Produtos
GET /products: Retorna todos os produtos cadastrados.
GET /products/search?name=nomedoproduto: Retorna um produto específico com base no nome fornecido.
POST /products: Cria um novo produto.
PUT /products/:id: Atualiza um produto existente com base no ID fornecido.
Compras
POST /purchase: Cria uma nova compra.
GET /purchase/:id: Retorna uma compra específica com base no ID fornecido.
DELETE /purchase/:id: Exclui uma compra com base no ID fornecido.
Documentação do Postman
A documentação completa da API do LabEcommerce está disponível no formato do Postman, onde você pode encontrar detalhes sobre cada endpoint, exemplos de requisições e respostas, bem como testar a API de forma interativa.

Para acessar a documentação do Postman para o LabEcommerce, clique aqui https://documenter.getpostman.com/view/27041628/2s946h6rEw. Este link será útil para todos os interessados em explorar e utilizar a API do LabEcommerce de forma mais eficiente.

Agora você tem todo o poder para interagir com o banco de dados e manipular os dados do seu e-commerce. Não se esqueça de utilizar um software como o Postman ou desenvolver uma aplicação cliente para fazer as requisições adequadas.

Divirta-se explorando o LabEcommerce e boa sorte com o seu e-commerce!