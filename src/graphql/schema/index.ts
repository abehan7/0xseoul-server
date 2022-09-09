import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Avatar {
    _id: ID
    owner: String
    token_id: Int
    hair: Clothes
    clothing: Clothes
    eyes: Clothes
    mouth: Clothes
    off_hand: Clothes
    skin: Clothes
    background: Clothes
    createdAt: String
    base_image_url: String
    overlapped_image_url: String
  }

  type User {
    _id: ID
    wallet_address: String
    holding_avatars: [Avatar]
    holding_clothes: [Clothes]
    createdAt: String
    isAdmin: Boolean
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

  union IntOrString = IntBox | StringBox

  type IntBox {
    value: Int
  }

  type StringBox {
    value: String
  }

  type Query {
    hello: String!
    getAllUsers: [User!]!
    user(wallet_address: String): User!
    authenticate(wallet_address: String): String
    getAllAvatars: [Avatar!]!
    get30Avatars(avatar_id: String): [Avatar!]!
    getAvatar(token_id: Int!): Avatar!
    getAllClothes(wallet_address: String!): [Clothes!]!
    getClothesBatch(clothes_ids: [String]): [Clothes!]!
    searchClothes(keyword: String, wallet_address: String): [Clothes!]!
  }

  type Mutation {
    createUser(wallet_address: String!): User
    loginUser(
      wallet_address: String!
      signature: [String!]
      signMessage: String!
    ): User
  }
`;

export default typeDefs;
