import mongoose from "mongoose";

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

export default Avatar;
