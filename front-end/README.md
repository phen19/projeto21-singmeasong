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

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="30px"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="30px"/>
  <img src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational' height="30px">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" height="30px"/>
  <img src='https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white' height="30px" />

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
 cd projeto21-singmeasong/front-end
```

3. Instalar as dependências

```
npm i
```

4. Iniciar projeto com o comando

```
npm start
```

5. Opcionalmente, poderá realizar a build do projeto com o comando

```
npm run build
```

6. Por fim, acessar o endereço `http://localhost:3000` no seu navegador (número da porta pode variar)

:star: As requisições são feitar para uma URL que precisa ser inserida em uma variável de ambiente no arquivo `.env` (vide arquivo `.env.example`)

:star: O back-end deste projeto está neste mesmo repositório, na pasta back-end, disponível neste <a href='https://github.com/phen19/projeto21-singmeasong/tree/main/back-end' target='_blank'>link</a>. No link é possível ver a configuração e os comandos necessários para rodar o back-end.

## Para rodar os testes

1. Execute o cypress

```bash
npx cypress open
```

Esse comando irá abrir a janela do cypress, onde será possível executar todos os testes E2E
