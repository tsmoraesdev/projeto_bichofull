# BichoFull

Sistema web de apostas inspirado no jogo do bicho, com frontend em Angular, backend em Spring Boot e banco MySQL.
PROJETO EM DESENVOLVIMENTO

## Tecnologias

- **Frontend:** Angular 21
- **Backend:** Java 21 + Spring Boot 3.4
- **Banco de dados:** MySQL 8
- **Autenticação:** JWT
- **Containerização:** Docker + Docker Compose

## Estrutura do projeto

```text
BichoFull/
├── backend/          # API Spring Boot
├── frontend/         # Aplicação Angular
├── database/         # Scripts SQL de criação e carga inicial
├── docs/             # Contrato da API e diagramas
└── docker-compose.yml
```

## Funcionalidades principais

- cadastro e login com JWT
- registro e remoção de apostas
- sorteio de apostas selecionadas
- histórico com ganhos, perdas e sorteios
- perfil do usuário autenticado

## Como rodar localmente sem Docker

### 1) Banco de dados
Crie um banco MySQL chamado `bichofull` e execute os scripts:

- `database/geral.sql`
- `database/animais.sql`

### 2) Backend
No arquivo `backend/src/main/resources/application.properties`, os valores locais já ficam como padrão:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bichofull?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
```

Depois execute:

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`.

### 3) Frontend

```bash
cd frontend
npm install
npm start
```

O frontend sobe em `http://localhost:4200`.

## Como rodar com Docker

### Pré-requisitos

- Docker Desktop instalado
- Docker Compose habilitado

### Subir tudo

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços:

- **Frontend:** `http://localhost:4200`
- **Backend:** `http://localhost:8080`
- **MySQL:** `localhost:3306`

### Derrubar os containers

```bash
docker compose down
```

Para remover também o volume do banco:

```bash
docker compose down -v
```

## Configuração Docker adotada

O `docker-compose.yml` foi preparado para:

- criar o banco `bichofull`
- executar automaticamente os scripts da pasta `database/`
- subir o backend já apontando para o container do MySQL
- subir o frontend Angular acessível pelo navegador

## Variáveis usadas no backend

O backend foi configurado para aceitar variáveis de ambiente, mas continua funcionando localmente com os valores padrão.

Exemplos:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SERVER_PORT`
- `JWT_SECRET`

## Endpoints principais

- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me`
- `GET /apostas`
- `POST /apostas`
- `DELETE /apostas/{id}`
- `POST /apostas/sortear`
- `GET /historico`

## Observações

- O frontend já está apontando para `http://localhost:8080`, então no navegador ele continua funcionando normalmente mesmo rodando em container.
- O backend usa `spring.jpa.hibernate.ddl-auto=update`, então a estrutura pode ser ajustada automaticamente pelo JPA quando necessário.
- Os scripts SQL garantem a base inicial, especialmente a tabela de animais.

## Próximos passos recomendados

- adicionar arquivo `environment.ts` no frontend para centralizar URL da API
- criar perfil Docker de produção mais enxuto
- adicionar healthcheck mais completo para a API
- documentar exemplos de requisições no Swagger/Postman
- corrigir bugs 
