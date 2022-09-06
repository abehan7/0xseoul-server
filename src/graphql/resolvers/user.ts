import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await db.User.find();
    },

    user: async (_: any, args: { wallet_address: String }) => {
      return await db.User.findOne({ wallet_address: args.wallet_address });
    },
  },

  Mutation: {
    async createUser(_: any, args: { wallet_address: String }, { user }: any) {
      try {
        const { wallet_address } = args;
        const user = await new db.User({ wallet_address });
        const result = await user.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async deleteUser(_: any, args: { wallet_address: String }) {
      try {
        const { wallet_address } = args;
        const result = await db.User.deleteOne({ wallet_address });
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

export default resolvers;
