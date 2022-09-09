import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllClothes: async (_: any, args: { wallet_address: string }) => {
      const { wallet_address } = args;
      return await db.Clothes.model.find({ wallet_address });
    },

    getClothesBatch: async (_: any, args: { clothes_ids: String[] }) => {
      return await db.Clothes.model.find({
        token_id: { $in: args.clothes_ids },
      });
    },

    searchClothes: async (
      _: any,
      args: { keyword: string; wallet_address: string }
    ) => {
      try {
        const user = await db.User.query.findOneByWalletNotPopulate(
          args.wallet_address
        );
        if (!user) throw new Error("User not found");
        const userClothesIds = user.holding_clothes.map((clothes) => clothes);

        const query = {
          _id: { $in: userClothesIds },
          $or: [
            { name: { $regex: args.keyword, $options: "ix" } },
            { type: { $regex: args.keyword, $options: "ix" } },
          ],
        };

        const clothes = await db.Clothes.model.find(query);

        return clothes;
      } catch (error: any) {
        console.log(error.message);
        return [];
      }
    },
  },
};

export default resolvers;
