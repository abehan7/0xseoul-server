import helloResolvers from "./hello";
import userResolvers from "./user";
import avatarResolvers from "./avatar";
import clothesResolvers from "./clothes";
const resolvers = {
  ...helloResolvers,
  ...userResolvers,
  ...avatarResolvers,
  Query: {
    ...helloResolvers.Query,
    ...userResolvers.Query,
    ...avatarResolvers.Query,
    ...clothesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export default resolvers;
