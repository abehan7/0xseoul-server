import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllAvatars: async (_: any, args: any, { user }: any) => {
      // console.log(user);
      return await db.Avatar.find({});
    },

    get30Avatars: async (_: any, args: { avatar_id: String }) => {
      return await db.Avatar.find({ avatar_id: { $gt: args.avatar_id } }).limit(
        30
      );
    },

    avatar: async (_: any, args: { wallet_address: String }) => {
      return await db.Avatar.findOne({ wallet_address: args.wallet_address });
    },
  },
};

export default resolvers;
