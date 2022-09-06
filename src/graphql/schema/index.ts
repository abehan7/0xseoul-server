import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    wallet_address: String
    createdAt: String
    isAdmin: Boolean
  }

  type Query {
    hello: String!
    getAllUsers: [User!]!
    user(wallet_address: String): User!
    authenticate(wallet_address: String): String
  }

  type Mutation {
    createUser(wallet_address: String!): User
    deleteUser(wallet_address: String!): User
  }
`;

export default typeDefs;
