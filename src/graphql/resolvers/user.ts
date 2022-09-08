import { GraphQLArgs } from "graphql";
import { db } from "../../models";
const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await db.User.model.find();
    },
    user: async (_: any, args: { wallet_address: string }) => {
      return await db.User.query.findOne(args.wallet_address);
    },
  },

  Mutation: {
    async loginUser(
      _: any,
      args: { wallet_address: string },
      { wallet_address }: { wallet_address: string }
    ) {
      try {
        if (!wallet_address) throw new Error("empty wallet");
        const query = { wallet_address };
        const user = await db.User.model.findOne(query);
        if (!user) {
          // const update = query;
          const newUser = await db.User.mutation.createUser(wallet_address);
          return {
            data: newUser,
            message: "success to create user",
            status: true,
          };
        }
        return { data: user, message: "success to login", status: true };
      } catch (error: any) {
        console.log(error.message);
        return { data: null, message: error.message, status: false };
      }
    },
    async createUser(_: any, args: { wallet_address: string }, { user }: any) {
      try {
        const { wallet_address } = args;
        // const user = new db.User({ wallet_address });
        const user = db.User.mutation.createUser(wallet_address);
        // const result = await user.save();
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

export default resolvers;
