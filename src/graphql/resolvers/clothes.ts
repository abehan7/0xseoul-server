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

    filterClothes: async (
      _: any,
      args: { type: string; wallet_address: string }
    ) => {
      try {
        const { type, wallet_address } = args;
        // console.log(type, wallet_address);
        if (!type || !wallet_address) throw new Error("missing params");

        const toLowercase = wallet_address.toLowerCase();
        const user = await db.User.query.findOneByWalletNotPopulate(
          toLowercase
        );
        if (!user) throw new Error("User not found");
        const isAllItems = type === "all_items";

        const query = { _id: { $in: user.holding_clothes } } as any;
        if (!isAllItems) query.type = args.type;
        const clothes = await db.Clothes.model.find(query);
        return clothes;
      } catch (error: any) {
        console.log(error.message);
        return [];
      }
    },

    searchClothes: async (
      _: any,
      args: { keyword: string; wallet_address: string }
    ) => {
      try {
        const toLowercase = args.wallet_address.toLowerCase();
        const user = await db.User.query.findOneByWalletNotPopulate(
          toLowercase
        );
        if (!user) throw new Error("User not found");
        const isNumber = /^\d+$/.test(args.keyword);
        const query = {
          _id: { $in: user.holding_clothes },
          $or: [
            { name: { $regex: args.keyword, $options: "ix" } },
            { type: { $regex: args.keyword, $options: "ix" } },
          ],
        } as any;

        if (isNumber)
          query.$or.push({ token_id: { $eq: Number(args.keyword) } });

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
