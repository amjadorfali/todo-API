```bash
$ yarn start
```

<div align='center'>
<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<hr>

## Description

Todo-API written for the [todo-react-app](https://github.com/amjadorfali/todo-react-app) and can be easily modified to be used in different domains

<hr>

## Features :sparkles:

GraphQL routes :rocket:

Request/Exception Logging :part_alternation_mark:

Password Hashing :shushing_face:

User Authentication :link:

DB integration (MongoDB) :card_file_box:

<hr>

## Installation :firecracker:

```bash
$ yarn
```

<hr>

## Running the app :running_woman:

```bash
# development
$ yarn start
```

```bash
# watch mode
$ yarn start:dev
```

```bash
# production mode
$ yarn start:prod
```

<hr>

## <h2 align='center'>GraphQL :warning:</h1>

NestJs auto generates Schemas in **code-first** approach; which are query/mutation types, not a query which can be run.

Due to that, you need to run `yarn gen-gql-queries` in order to get a list of auto generated files that can be used as queries for GraphQL resolvers.

[@graphql-codegen/cli](https://www.graphql-code-generator.com/docs/getting-started/installation) can be used on the frontend to auto generate api methods for any preferred library (React-query, apollo ...), fully typed.

<hr>

## Test :hammer_and_wrench:

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

<hr>

## License :scroll:

This is an [MIT licensed](LICENSE) open source project

</div>
