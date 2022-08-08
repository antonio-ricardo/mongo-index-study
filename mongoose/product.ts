import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["CLOTHES", "FOOD"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Products", productSchema);
