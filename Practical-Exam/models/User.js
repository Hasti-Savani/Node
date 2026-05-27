import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.model("User", userSchema);