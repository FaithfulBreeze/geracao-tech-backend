# Geração Tech - Projeto Back-end
Projeto back-end do curso Desenvolvedor Web Fullstack
<h2>Propósito do projeto</h2>
<p>Este projeto tem como finalidade a prática e avaliação dos conhecimentos adquiridos sobre tecnologias trabalhadas no decorrer do curso de Desenvolvedor Web Fullstack do projeto Geração Tech da Digital College.</p>
<h2>Tecnologias utilizadas no projeto</h2>
<ul>
  <li>NodeJS</li>
  <li>Javascript</li>
  <li>Express</li>
  <li>MySql</li>
  <li>Sequelize</li>
  <li>JsonWebToken</li>
  <li>dotenv</li>
  <li>Docker + Docker Compose</li>
  <li>bcrypt</li>
  <li>cookie-parser</li>
  <li>Github</li>
  <li>Git</li>
</ul>
<h2>Membros do projeto</h2>
<ul>
  <li><a href="https://github.com/FaithfulBreeze">Luis Victor Silva Santos</a></li>
  <li><a href="https://github.com/rafaelAlvesQaTester">Marcos Rafael Alves</a></li>
</ul>
<h2>Como rodar o projeto</h2>
<p>Observação: Para rodar este projeto é necessário ter o Docker instalado</p>
<p>Após subir os containers, o container da API aguardará o container do banco de dados, quando o mesmo estiver pronto a conexão será estabelecida, e assim a aplicação estará pronta para receber requisições na porta 80.</p>
<ul>
  <li>git clone https://github.com/FaithfulBreeze/geracao-tech-backend.git .</li>
  <li>docker compose up</li>
</ul>
<h2>Rotas da aplicação</h2>
<h3>Endpoints de User</h3>
<details>
  <summary><strong>Criar usuário</strong></summary><br>
  
- POST /v1/user

**Headers**
- Content-type: application/json

**Payload**

```json
{
  "firstname": "user firstname",
  "surname": "user surname",
  "email": "user@mail.com",
  "password": "123@123",
  "confirmPassword": "123@123",
}  
```

**Response Status Code**
- 201 Created - Retornado quando o cadastro for bem sucedido
- 400 Bad Request - Retornado quando os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Buscar usuário por ID</strong></summary><br>
  
- GET /v1/user/:id

**Response body**
```json
{
  "id": 1,
  "firstname": "user firstname",
  "surname": "user surname",
  "email": "user@mail.com"
}  
```

**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Atualizar usuário</strong></summary><br>

  - PUT /v1/user/:id

**Headers**
- Content-type: application/json

**Payload**
```json
{
  "firstname": "user firstname",
  "surname": "user surname",
  "email": "user@mail.com",
}  
```

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Deletar usuário</strong></summary><br>

- DELETE /v1/user/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe

</details>

<h3>Endpoints de Category</h3>

<details>
  <summary><strong>Listar categorias</strong></summary><br>

- GET /v1/category/search

**Query params**
  - `limit=-1`
    - Query string para definir o limit de itens por página
    - Use `-1` como valor para buscar todos os itens
    - Padrão: 12
  - `page=1`
    - Query string para definir a paginação dos dados retornados
    - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca e pode ser omitida da query string
    - Padrão: 1
  - `fields=name,slug`
    - Query string para limitar quais campos serão retornados
  - `use_in_menu=true`
    - Query string para filtrar apenas as categorias que podem aparecer no menu

**Response body**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Shoes",
      "slug": "shoes",
      "use_in_menu": true
    },
    {
      "id": 2,
      "name": "Offers",
      "slug": "offers",
      "use_in_menu": true
    },
    {
      "id": 3,
      "name": "Black Friday",
      "slug": "black-friday",
      "use_in_menu": false
    }
  ],
  "total": 10,
  "limit": -1,
  "page": 1
}  
```

**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Buscar categoria por ID</strong></summary><br>

- GET /v1/category/:id

**Response body**
```json
{
  "id": 1,
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}  
```

**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Criar categoria</strong></summary><br>

- POST /v1/category

**Headers**
- Content-type: application/json

**Payload**

```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}  
```

**Response Status Code**
- 201 Created - Retornado quando o cadastro for bem sucedido
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
</details>

<details>
  <summary><strong>Atualizar categoria</strong></summary><br>

- PUT /v1/category/:id

**Headers**
- Content-type: application/json

**Payload**
```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
} 
```

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Deletar categoria</strong></summary><br>

- DELETE /v1/category/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<h3>Endpoints de Product</h3>

<details>
  <summary><strong>Listar produtos</strong></summary><br>

- GET /v1/product/search

**Query params**
  - `limit=30`
    - Query string para definir o limit de itens por página
    - Use `-1` como valor para buscar todos os itens
    - Padrão: 12
  - `page=2`
    - Query string para definir a paginação dos dados retornados
    - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca e pode ser omitida da query string
    - Padrão: 1
  - `fields=name,images,price`
    - Query string para limitar quais campos serão retornados
  - `match=Tênis`
    - Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
  - `category_ids=15,24`
    - Query string usada para filtrar o resultado de produtos pelo ID das categorias
  - `price-range=100-200`
    - Query string para filtrar o resultado de produtos por uma determinada "janela" de preços 
  - `option[45]=GG,PP`
    - Query string para filtrar o resultado de produtos pelo valor das opções disponíveis

**Response body**
```json
{
  "data": [
    {
      "id": 1,
      "enabled": true,
      "name": "Produto 01",
      "slug": "produto-01",
      "stock": 10,
      "description": "Descrição do produto 01",
      "price": 119.90,
      "price_with_discount": 99.90,
      "category_ids": [{"id": 1}, {"id": 15}, {"id": 24}, {"id": 68}],
      "images": [
        {
          "id": 1,
          "path": "https://store.com/media/product-01/image-01.png"
        },
        {
          "id": 2,
          "path": "https://store.com/media/product-01/image-02.png"
        },
        {
          "id": 3,
          "path": "https://store.com/media/product-01/image-02.jpg"
        }
      ],
      "options": [
        { 
          "id": 1
          ... 
        },
        { 
          "id": 2
          ... 
        }
      ]
    }
  ],
  "total": 120,
  "limit": 12,
  "page": 1,
}  
```
**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
</details>

<details>
  <summary><strong>Buscar produto por ID</strong></summary><br>

- GET /v1/product/:id

**Response body**
```json
{
  "id": 1,
  "enabled": true,
  "name": "Produto 01",
  "slug": "product-01",
  "stock": 10,
  "description": "Descrição do produto 01",
  "price": 119.90,
  "price_with_discount": 99.90,
  "category_ids": [{"id": 1}, {"id": 15}, {"id": 24}, {"id": 68}],
  "images": [
    {
      "id": 1,
      "path": "https://store.com/media/product-01/image-01.png"
    },
    {
      "id": 2,
      "path": "https://store.com/media/product-01/image-02.png"
    },
    {
      "id": 3,
      "path": "https://store.com/media/product-01/image-02.jpg"
    }
  ],
  "options": [
    { 
      "id": 1
      ... 
    },
    { 
      "id": 2
      ... 
    }
  ]
}  
```

**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<details>
  <summary><strong>Requisito 03 - Criar endpoint de criação de produto</strong></summary><br>

- POST /v1/product

**Headers**
- Content-type: application/json

**Payload**

```json
  {
    "enabled": true,
    "name": "Produto 01",
    "slug": "produto-01",
    "stock": 10,
    "description": "Descrição do produto 01",
    "price": 119.90,
    "price_with_discount": 99.90,
    "category_ids": [1, 15, 24, 68],
    "images": [
      {
        "path": "https://fakeurl.com"
      },
      {
        "path": "https://fakeurl.com"
      }  
    ],
    "options": [
      {
        "title": "Cor",
        "shape": "square",
        "radius": 4,
        "type": "text",
        "values": ["PP", "GG", "M"]
      },
      {
        "title": "Tamanho",
        "shape": "circle",
        "type": "color",
        "values": ["#000", "#333"]
      }
    ]
  }
  ```

**Response Status Code**
- 201 Created - Retornado quando o cadastro for bem sucedido
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
</details>


<details>
  <summary><strong>Atualizar produto</strong></summary><br>

- PUT /v1/product/:id

**Headers**
- Content-type: application/json

**Payload**

```json
  {
    "enabled": true,
    "name": "Produto 01 atualizado",
    "slug": "produto-01-atualizado",
    "stock": 20,
    "description": "Descrição do produto 01 atualizado",
    "price": 49.9,
    "price_with_discount": 0,
    "category_ids": [1, 15, 24, 68],
    "images": [
      {
        "path": "https://fakeurl.com"
      },
      {
        "path": "https://fakeurl.com"
      }  
    ],
    "options": [
      {
        "title": "Cor",
        "shape": "square",
        "radius": 4,
        "type": "text",
        "values": ["PP", "GG", "M"]
      },
      {
        "title": "Tamanho",
        "shape": "circle",
        "type": "color",
        "values": ["#000", "#333"]
      }
    ]
  }
  ```

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>


<details>
  <summary><strong>Deletar produto</strong></summary><br>

- DELETE /v1/product/:id

**Headers**
- Content-type: application/json

**Response Status Code**
- 204 No Content - Retornado quando a requisição foi bem sucedida mas nenhum corpo deve ser retornado.
- 401 Unauthorized - Retornado quando o token de autorização não for enviado ou estiver incorreto
- 404 Not Found - Retornado quando o recurso solicitado não existe
</details>

<h3>Endpoint de Token</h3>
<details>
  <summary><strong>Gerar token</strong></summary><br>

- POST /v1/user/token

**Headers**
- Content-type: application/json

**Payload**

```json
{
  "email": "user@mail.com",
  "password": "123@123",
}  
```

**Response body**
```json
{
  "token": "<JWT>",
}  
```

**Response Status Code**
- 200 OK - Retornado quando a requisição foi bem sucedida
- 400 Bad Request - Retornado quando a os dados da requisição estiverem incorretos
</details>


