import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllClothes: async (_: any, args: { wallet_address: string }) => {
      const { wallet_address } = args;
      return await db.Clothes.find({ wallet_address });
    },

    getClothesBatch: async (_: any, args: { clothes_ids: String[] }) => {
      return await db.Clothes.find({ token_id: { $in: args.clothes_ids } });
    },
  },
};

export default resolvers;
