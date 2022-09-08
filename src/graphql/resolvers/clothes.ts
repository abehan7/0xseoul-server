import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllClothes: async () => {
      //   return 123;
      return await db.Clothes.find({});
    },

    getClothesBatch: async (_: any, args: { clothes_ids: String[] }) => {
      return await db.Clothes.find({ token_id: { $in: args.clothes_ids } });
    },
  },
};

export default resolvers;
