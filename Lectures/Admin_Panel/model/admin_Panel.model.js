import mongoose from "mongoose";

const adminPanelSchema = new mongoose.Schema(
  {
    fristname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    profileIamge: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Admin = mongoose.model("admin", adminPanelSchema);
