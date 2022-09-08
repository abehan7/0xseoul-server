import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    wallet_address: String
    holding_nfts: [Int]
    createdAt: String
    isAdmin: Boolean
  }

  type Avatar {
    _id: ID
    owner: String
    token_id: Int
    hair: String
    clothing: String
    eyes: String
    mouth: String
    off_hand: String
    skin: String
    background: String
    createdAt: String
  }

  type Clothes {
    _id: ID
    name: String
    hash_number: Int
    image_url: String
    type: String
    token_id: Int
    createdAt: String
  }

  type Query {
    hello: String!
    getAllUsers: [User!]!
    user(wallet_address: String): User!
    authenticate(wallet_address: String): String
    getAllAvatars: [Avatar!]!
    get30Avatars(avatar_id: String): [Avatar!]!
    avatar(wallet_address: String): Avatar!
    getAllClothes: [Clothes!]!
    getClothesBatch(clothes_ids: [String]): [Clothes!]!
  }

  type Mutation {
    createUser(wallet_address: String!): User
    loginUser(wallet_address: String!): User
  }
`;

export default typeDefs;
