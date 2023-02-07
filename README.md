## Node Express Typescript Prisma Boilerplate

## 🍔 Stack Specs

- Node.js
- Express
- TypeScript
- Prisma
- Postgres

- Install dependencies

```
yarn install
```

- Create a Postgres database and rename the db datasource in the /prisma/schema.prisma file.

Currently is datasource db url - postgresql://anson:anson@localhost:5432/anson

- Push the Prisma Schema into Database

```
npx prisma migrate dev
```

- Run the development server

```
yarn dev
```

## 🚀 Production Build

- Run the production build

```
yarn build
```

- Start the production server

```
yarn start
```

- Run test suites

```
yarn test

```

> Your production build is available on `dist` folder

- Creating a New Order

```
POST http://localhost:8100/orders
Content-Type: application/json

This webhook will take in the order information from Shopify, and send a request to pull the necessary product images then store all the data.
```

- Getting All Orders

```
GET http://localhost:8100/orders
```

- Getting Order By ID

```
GET http://localhost:8100/orders/1
```

## ☑️ LICENSE

- MIT
