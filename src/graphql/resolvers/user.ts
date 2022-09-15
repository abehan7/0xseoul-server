import { GraphQLArgs } from "graphql";
import { db } from "../../models";
import { caver } from "../../utils/web3-interact";

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await db.User.model.find();
    },
    user: async (_: any, args: { wallet_address: string }) => {
      return await db.User.query.findOneByWallet(args.wallet_address);
    },
  },

  Mutation: {
    async loginUser(
      _: any,
      args: {
        wallet_address: string;
        signature: string[];
        signMessage: string;
      },
      { token }: { token: string }
    ) {
      try {
        const { signature, wallet_address, signMessage } = args;
        // console.log(signature, wallet_address, signMessage);

        if (!signature || !signMessage || !wallet_address)
          throw new Error("invalid params");
        // const _signature = readJson(signature as string);

        const isAuthenticated = await caver.validator.validateSignedMessage(
          signMessage,
          signature,
          wallet_address
        );
        console.log(`isAuthenticated: ${isAuthenticated}`);

        if (!isAuthenticated) throw new Error("empty wallet_address");

        // return { wallet_address };

        if (!wallet_address) throw new Error("empty wallet");
        const user = await db.User.query.findOneByWallet(wallet_address);
        if (!user) {
          // const update = query;
          await db.User.mutation.createUser(wallet_address);
          const _user = await db.User.query.findOneByWallet(wallet_address);

          return _user;
        }
        return user;
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
