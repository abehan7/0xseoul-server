import mongoose from "mongoose";
import { IAvatar } from "../interfaces/avatar";

const avatarSchema = new mongoose.Schema({
  owner: { type: String, ref: "users", required: true },
  token_id: { type: Number, required: true },
  hair: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  clothing: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  eyes: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  mouth: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  off_hand: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  skin: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  background: { type: mongoose.Types.ObjectId, default: null, ref: "clothes" },
  createdAt: { type: Date, default: Date.now },
  base_image_url: { type: String, required: true },
  overlapped_image_url: { type: String, required: true, default: null },
});

const Avatar = mongoose.model<mongoose.Document>("avatars", avatarSchema);

const query = {
  findOneByTokenId: async (token_id: number) => {
    try {
      const doc = await Avatar.findOne({ token_id })
        .populate("hair")
        .populate("clothing")
        .populate("eyes")
        .populate("mouth")
        .populate("off_hand")
        .populate("skin")
        .populate("background");

      // console.log(doc);

      if (!doc) return null;
      return doc.toObject() as IAvatar;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};

const mutation = {};

export default { model: Avatar, query, mutation };
