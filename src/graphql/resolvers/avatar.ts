import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllAvatars: async (_: any, args: any, { user }: any) => {
      // console.log(user);
      return await db.Avatar.model.find({});
    },

    get30Avatars: async (_: any, args: { avatar_id: String }) => {
      return await db.Avatar.model
        .find({ avatar_id: { $gt: args.avatar_id } })
        .limit(30);
    },

    getAvatar: async (_: any, args: { token_id: number }) => {
      return await db.Avatar.query.findOneByTokenId(args.token_id);
    },
  },
};

export default resolvers;
