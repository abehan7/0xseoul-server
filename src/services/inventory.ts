import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "../graphql/schema";
import resolvers from "../graphql/resolvers";
import { authContext } from "../middlewares/auth";
import { MONGO_URL } from "../utils/common";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authContext,
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose
    .connect(MONGO_URL as string)
    .then(() =>
      app.listen(PORT, () =>
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
      )
    )
    .catch((error: any) => console.log(`${error.message} did not connect`));
};

main();
