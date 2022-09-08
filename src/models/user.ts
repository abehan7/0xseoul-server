import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true },
  holding_nfts: { type: [Number], required: true, default: [] },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model<mongoose.Document>("users", userSchema);

export const mutation = {
  createUser: async (wallet_address: string) => {
    try {
      const doc = new User({ wallet_address });
      const newMetadata = await doc.save();
      return newMetadata.toObject() as IUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
export const query = {
  findOne: async (wallet_address: string) => {
    try {
      const doc = await User.findOne({ wallet_address });
      if (!doc) return null;
      return doc.toObject() as IUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
export default { model: User, query, mutation };
