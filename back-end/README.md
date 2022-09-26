# projeto21-singmeasong

<p align="center">
  <img  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" height="300px">
</p>
<h1 align="center">
  Sing Me a Song
</h1>
<h2 align="center">
Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂
</h2>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/> 
  <img src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white' height="30px" />
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

# Features implementadas:

    Criar nova recomendação
    Like ou dislike (upvote ou downvote)
    Lista com as recomendações com os scores mais altos
    Recomendação aleatório

## Como rodar o projeto

1. CLonar o repositório

```
git clone git@github.com:phen19/projeto21-singmeasong
```

2. Entrar no repositório

```
 cd projeto21-singmeasong/back-end
```

3. Instalar as dependências

```
npm i
```

4. Criar arquivo `.env` com a mesma estrutura do arquivo `.env.example` e alterar o valor das variáreis

```
DATABASE_URL=
PORT=
NODE_ENV =
```

5. Criar o banco de dados com o comando

```
npx prisma migrate dev
```

6. Rodar o projeto com o comando

```
npm run dev
```

:star: O front-end deste projeto está neste mesmo repositório, na pasta back-end, disponível neste <a href='https://github.com/phen19/projeto21-singmeasong/tree/main/front-end' target='_blank'>link</a>. No link é possível ver a configuração e os comandos necessários para rodar o front-end.

## Para rodar os testes

1. Criar arquivo `.env.test` com a mesma estrutura do arquivo `.env.example` e alterar o valor das variáreis

```bash
DATABASE_URL=
PORT=
NODE_ENV =
```

2. Criar o banco de dados de teste

```
dotenv -e .env.test npx prisma generate && npx prisma migrate dev
```

3. Rodar o projeto em ambiente de testes com o comando

```
npm run dev:test
```

4. Rodar testes unitários

```
npm run test:unit
```

5. Rodar testes de integração

```
npm run teste:integration
```
