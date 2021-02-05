import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./resolvers/user/Register";
import { createConnection } from "typeorm";

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver]
    })
  });

  const PORT = process.env.PORT || 3000;

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
