import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true },
  holding_nfts: { type: [Number], required: true, default: [] },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model<mongoose.Document>("users", userSchema);

export default User;
