Vou criar um arquivo README.md com as instruções completas para rodar o projeto:

```markdown:README.md
# API CRUD de Usuários

API REST desenvolvida com Node.js e MySQL para gerenciamento de usuários.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Docker
- Docker Compose

## Pré-requisitos

- Docker
- Docker Compose
- Node.js (para desenvolvimento local)



## Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd user-crud-api
```

2. Inicie os containers Docker:
```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`

## Endpoints da API

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/users | Lista todos os usuários |
| GET | /api/users/:id | Obtém um usuário específico |
| POST | /api/users | Cria um novo usuário |
| PUT | /api/users/:id | Atualiza um usuário |
| DELETE | /api/users/:id | Remove um usuário |

### Exemplos de Requisições

#### Criar um usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

#### Listar usuários
```bash
curl http://localhost:3000/api/users
```

#### Obter um usuário específico
```bash
curl http://localhost:3000/api/users/1
```

#### Atualizar um usuário
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao@email.com",
    "password": "novaSenha123"
  }'
```

#### Deletar um usuário
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Desenvolvimento Local

1. Instale as dependências:
```bash
npm install
```

2. Inicie apenas o container do MySQL:
```bash
docker-compose up db
```

3. Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente (com valores padrão):

- `PORT`: Porta do servidor (default: 3000)
- `DB_HOST`: Host do banco de dados (default: localhost)
- `DB_USER`: Usuário do banco de dados (default: root)
- `DB_PASSWORD`: Senha do banco de dados (default: root)
- `DB_NAME`: Nome do banco de dados (default: user_crud)

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

