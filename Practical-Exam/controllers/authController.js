import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerPage = (req, res) => {
  res.render("register");
};

export const loginPage = (req, res) => {
  res.render("login");
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashPassword,
  });

  res.redirect("/login");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token);

  res.redirect("/products");
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.redirect("/login");
};