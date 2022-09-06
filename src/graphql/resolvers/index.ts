import helloResolvers from "./hello";
import userResolvers from "./user";
const resolvers = {
  ...helloResolvers,
  ...userResolvers,
  Query: {
    ...helloResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export default resolvers;
