<br>
<hr>

<h4 align="center"> 
  ApiBlogs 
</h4>


<br>
<h2>Sobre</h2>
<p align="justify"> API Blogs é uma aplicação desenvolvida para gerenciar um site de blogs </p 

### Features

-  Sistema de login através de token criptografados
-  Cadastro de usuários,  posts, categorias.

<br>
## 🛠 Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources)
- [ExpressJs](https://expressjs.com/pt-br/)
- [Node.js](https://nodejs.org/en/)
- [Sequelize](https://sequelize.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Joi](https://joi.dev/)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [JWT](https://jwt.io/)


<br>
<h2>Instalar o projeto em sua máquina</h2>
<br>
<h3>Pré-requisitos</h3>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/). É necessário ter  instalado e configurado o [Mysql](https://dev.mysql.com/doc/). Para uma melhor visualização do banco de dados indico a  utilização [MysqlWorkBench](https://www.mysql.com/products/workbench/) e possuir um editor de código, sugiro  o [VSCode](https://code.visualstudio.com/). Para fazer as requisições nos endpoints recomendo o [Postman](https://www.postman.com/).


Renomeio o arquivo .env.example para .env e troque as informações para as que foram criadas quando o MySQL foi configurado. Para o JWT_SECRET= coloque alguma frase secreta, sera usado para gerar tokens seguros.

###  Rodando a aplicação .

```bash
# Clone este repositório
# Foi utilizado SSH
$ git clone git@github.com:MarcoMecenasFilho/storemanager

# Acesse a pasta do projeto no seu terminal/cmd
$ cd blogapi

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run allcomand

```





## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações usuários, categorias e posts. |
| `POST` | Cria um novo usuário, categoria e post. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Criado com sucesso com sucesso.|
| `204` | Sem conteúdo.|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `409` | Conflito com banco de dados|
| `404` | Registro pesquisado não encontrado (Not found).|
| `422` | Dados informados estão fora do escopo definido para o campo.|


<br>

## EndPoints

# Token

Todas as rotas (menos /user [POST] e /login [POST]) precisam de token.

## Validações
Quando o token não é passado

+ Request (application/json)

    + Headers ()

            {           
                
            }

+ Response 401 (application/json)

        {
            message: "Token not found"
        }

Quando o token  é invalido ou expirou

+ Request (application/json)

    + Headers ()

            {           
                "Authorization": MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx
            }

+ Response 401 (application/json)

        {
            message: "Expired or invalid token"
        }



# Usuários [/user]

### Criar /user [POST]
+ Request (application/json)

    + body

            {
                "displayName": "zeca pagodinho",
                "email": "zeca@email.com",
                "password": "123456",
                "image": "http://4.bp.blogspot.com/"
            }
+ Response 201 (application/json, Token fictício)

            {           
                "Authorization": MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx
            }

#### Quando as validações falham

Caso "displayName" seja passado, deve possuir pelo menos de 8 caracteres.

+ Request (application/json)

    + body
    
            {
                "displayName": "zeca",
                "email": "zeca@email.com",
                "password": "123456",
                "image": "http://4.bp.blogspot.com/"
            }

+ Response 400 (application/json)

          {
              ""message": "\"displayName\" length must be at least 8 characters long"
          }

Quando "email" não é passado.

+ Request (application/json)

    + body

            {
                "displayName": "zeca pagodnho",
                "password": "123456",
                "image": "http://4.bp.blogspot.com/"
            }
+ Response 400 (application/json)

          {
              "message": "\"email\" is required" 
          }

Quando "email" não tem um formato valido (algo@algo.com).

+ Request (application/json)

    + body

            {
                "displayName": "zeca pagodinho",
                "email": "zeca@email",
                "password": "123456",
                "image": "http://4.bp.blogspot.com/"
            }

+ Response 422 (application/json)

          {
               "message": "\"email\" must be a valid email"
          }

Quando "password" não é passado.

+ Request (application/json)

    + body

          {
            "displayName": "zeca pagodinho",
            "email": "zeca@email.com",
            "image": "http://4.bp.blogspot.com/"
          }

+ Response 400 (application/json)

          {
              ""message": "\"password\" is required"
          }

Quando "password" possui menos de 6 caracteres.

+ Request (application/json)

    + body

            {
              "displayName": "zeca pagodinho",
              "email": "zeca@email.com",
              "password": "1234",
              "image": "http://4.bp.blogspot.com/"
            }

+ Response 422 (application/json)

          {
              ""message": "\"password\" length must be 6 characters long"
          }

### Listar /user [GET]

Listar todos os usuários salvos no banco de dados  /user
+ Request (application/json)

    + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "displayName": "Lewis Hamilton",
                "email": "lewishamilton@gmail.com",
                "image": "https://upload.wikimedia.org/wikipedia/"
            }
        ]


### Listar por id /user/id [GET]

Listar usuários por um id específico /user/1

+ Request (application/json)

  + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

+ Response 200 (application/json)

          {
              "id": 1,
              "displayName": "Lewis Hamilton",
              "email": "lewishamilton@gmail.com",
              "image": "https://upload.wikimedia.org/wikipedia"
          }
          
  ### Quando o usuário não existe /user/5
          
  + Response 404 (application/json)

          {
              "message": "User does not exist"
          }

# Login [/login]

### Login /login  [POST]


+ Request (application/json)

     + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

    + body

            {
                "email": "zeca@email.com",
                "password": "123456"
            }

+ Response 200 (application/json)

          {           
              "token": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
          }

### Listar /categories [GET]

Listar todos as categorias salvos no banco de dados  /categories

+ Request (application/json)

     + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

+ Response 200 (application/json)

          [
              {
                  "id": 1,
                  "name": "Inovação"
              },
              {
                  "id": 2,
                  "name": "Escola"
              }
          ]

### Criar /categories [POST]

Criar categoria no banco de dados  /categories

+ Request (application/json)

    + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }
    + body

        {
            "name" : "cervejinha gelada"
        }

+ Response 200 (application/json)

          {
              "id": 3,
              "name": "cervejinha gelada"
          }

# PostsBlogs [/post]

### Listar /post [GET]

Listar todos os posts salvos no banco de dados  /post

+ Request (application/json)

    + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }
+ Response 200 (application/json)

         [
              {
                  "id": 1,
                  "title": "Post do Ano",
                  "content": "Melhor post do ano",
                  "userId": 1,
                  "published": "2011-08-01T19:58:00.000Z",
                  "updated": "2011-08-01T19:58:51.000Z",
                  "user": {
                      "id": 1,
                      "displayName": "Lewis Hamilton",
                      "email": "lewishamilton@gmail.com",
                      "image": "https://upload.wikimedia.org"
                  },
                  "categories": [
                      {
                          "id": 1,
                          "name": "Inovação"
                      }
                  ]
              },
              {
                  "id": 2,
                  "title": "Vamos que vamos",
                  "content": "Foguete não tem ré",
                  "userId": 1,
                  "published": "2011-08-01T19:58:00.000Z",
                  "updated": "2011-08-01T19:58:51.000Z",
                  "user": {
                      "id": 1,
                      "displayName": "Lewis Hamilton",
                      "email": "lewishamilton@gmail.com",
                      "image": "https://upload.wikimedia.org"
                  },
                  "categories": [
                      {
                          "id": 2,
                          "name": "Escola"
                      }
                  ]
              }
          ]

### Listar por id /post/id [GET]

Listar um post por um id específico /post/1
+ Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

+ Response 200 (application/json)

          {
                "id": 1,
                "title": "Post do Ano",
                "content": "Melhor post do ano",
                "userId": 1,
                "published": "2011-08-01T19:58:00.000Z",
                "updated": "2011-08-01T19:58:51.000Z",
                "user": {
                    "id": 1,
                    "displayName": "Lewis Hamilton",
                    "email": "lewishamilton@gmail.com",
                    "image": "https://upload.wikimedia.org"
                },
                "categories": [
                    {
                        "id": 1,
                        "name": "Inovação"
                    }
                ]
            }


          
### Quando o post não existe /post/5
      + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

+ Response 404 (application/json)

      [
        {
          "message": "Post does not exist"
        }
      ]  


### Criar  /post [POST]

+ Request (application/json)

    + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

    + body 
        {
          "title": "pagode e felicidade",
          "content": "tudo muto bom",
          "categoryIds": [1, 2]
        }

+ Response 201 (application/json)

          {
              "id": 3,
              "userId": 4,
              "title": "pagode e felicidade",
              "content": "tudo muto bom"
          }       

Quando a categoria  não existe no banco de dados.

+ Request (application/json)

  + Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }

    + body

          
          {
              "title": "pagode e felicidade",
              "content": "tudo muto bom",
              "categoryIds": [1, 9]
          }


+ Response 400 (application/json)

          {
              " "message": "\"categoryIds\" not found"
          }


#### Quando as validações falham


Quando "title" é passado em branco ou  não é passado.

+ Request (application/json)

+ Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }
    
    + body

          {
              "content": "tudo muto bom",
              "categoryIds": [1, 9]
          }

+ Response 400 (application/json)

          {
              "message": "\"title\" is required"
          }

Quando "content" é passado em branco ou  não é passado.

+ Request (application/json)

+ Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }
    
    + body

          {
              "title": "pagode e felicidade",
              "categoryIds": [1, 9]
          }

+ Response 400 (application/json)

          {
              "message": "\"content\" is required"
          }


Quando "categoryIds" não é passado.

+ Request (application/json)

+ Headers (Token fictício)

            {           
                "Authorization": "MywiZXhwIjoxNjQ3NDQwNjIzfQ.osA0qOI5CgJFkMqubqT7Vu7AAl5lx"
            }
    
    + body

          {   
              "content": "tudo muto bom",
              "title": "pagode e felicidade",
          }

+ Response 400 (application/json)

          {
              "message": "\"categoryIds\" is required"
          }



 - Este projeto foi feito com muita dedicação por Matheus Hammarstrom  [Entre em contato!](https://www.linkedin.com/in/matheushammarstrom/).