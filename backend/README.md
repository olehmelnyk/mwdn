# Interview-Backend

Please focus on production ready and clean code.

Please feel free to refactor the code as you see, while ensuring that it remains in JS/TS.

## Tasks

- Implement the existing "API endpoints" to fetch images and merge them into one response

## Build Setup

Note: before running `npm run start:dev` make sure:
- you have docker installed and it's running
- run `docker-compose up` to run docker image with PostgreSQL
- run `npx prisma migrate dev` to run migrations

```bash
$ npm install
$ npm run start:dev
```

## Configs

rename .env.example to .env

```bash
$ mv .env.example .env
```

## API Endpoints

```
https://my-json-server.typicode.com/icedrone/json-demo-server/photos
https://my-json-server.typicode.com/icedrone/json-demo-server/images
```

## Features
- Swagger API docs at http://localhost:3333/api
- CORS
- Helmet
- Rate limiting
- Logging
- DB connection via Prisma and PostgreSQL (in Docker)

## Todo
- add unit tests
