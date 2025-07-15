# Trabalho Prático #1

**Autor:** Pedro Sousa
**Número:** 31366

## Publicação

- **Frontend:** [https://pedrosousa701-qigo.vercel.app/]
- **Backend:** [https://twt1restapi-pedrosousa701-3.onrender.com]


## Como instalar

### Pré-requisitos
- Node.js
- npm
- Conta MongoDB Atlas (para o backend real)

### Backend

- Entrar na pasta do backend 

```sh
cd backend 
```
- Instalar dependências:
```sh
npm install
```
- Configure a string de conexão do MongoDB Atlas em `server.js`

- Iniciar o servidor:
```sh
node server.js
```
- O backend ficará disponível em `http://localhost:3000`

### Frontend

- Abrir o ficheiro `frontend/index.html` no browser.

## Descrição da Base de Dados

- **Coleção Alunos:**
  - `_id` (string, obrigatório)
  - `nome` (string)
  - `apelido` (string)
  - `id_curso` (string, id do curso)
  - `anoCurricular` (number)

- **Coleção Cursos:**
  - `_id` (string, obrigatório)
  - `nomeDoCurso` (string)

  ## Descrição da API (Rotas)

- **Alunos**
  - `GET /alunos` — Lista todos os alunos
  - `GET /alunos/:id` — Devolve um aluno pelo ID
  - `POST /alunos` — Adiciona um novo aluno  
    Exemplo body:
    ```json
    {
      "id": "1",
      "nome": "Pedro",
      "apelido": "Sousa",
      "id_curso": "9",
      "anoCurricular": 2
    }
    ```
  - `PUT /alunos/:id` — Edita um aluno existente
  - `DELETE /alunos/:id` — Remove um aluno

- **Cursos**
  - `GET /cursos` — Lista todos os cursos
  - `GET /cursos/:id` — Devolve um curso pelo ID
  - `POST /cursos` — Adiciona um novo curso  
    Exemplo body:
    ```json
    {
      "idCurso": "9",
      "nomeDoCurso": "Engenharia Informática"
    }
    ```
  - `PUT /cursos/:id` — Edita um curso existente
  - `DELETE /cursos/:id` — Remove um curso

## Descrição do Frontend

- Interface web simples para gestão de alunos e cursos.
- Permite:
  - Listar, adicionar, editar e apagar alunos.
  - Listar, adicionar, editar e apagar cursos.
- Comunicação com a API via Fetch API.
- Totalmente funcional com a API real (MongoDB Atlas + Express).

## Outros conteúdos relevantes

- **Tecnologias usadas:** Node.js, Express, MongoDB Atlas, Mongoose, HTML, CSS, JavaScript (Fetch API)
- **Deploy:**  
  - Backend: Render  
  - Frontend: Vercel