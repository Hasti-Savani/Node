import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Product", productSchema);