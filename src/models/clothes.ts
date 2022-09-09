import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hash_number: { type: Number, required: true },
  image_url: { type: String, required: true },
  type: { type: String, required: true },
  token_id: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Clothes = mongoose.model<mongoose.Document>("clothes", clothesSchema);

const query = {};
const mutation = {};

export default { model: Clothes, query, mutation };
