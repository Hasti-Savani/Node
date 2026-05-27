import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export const productList = async (req, res) => {
  const products = await Product.find()
    .populate("category")
    .populate("user");

  res.render("productList", {
    products,
    user: req.user,
  });
};

export const myProducts = async (req, res) => {
  const products = await Product.find({
    user: req.user.id,
  }).populate("category");

  res.render("myProducts", {
    products,
  });
};

export const productForm = async (req, res) => {
  const categories = await Category.find();

  res.render("productForm", { categories });
};

export const createProduct = async (req, res) => {
  const product = await Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: {
      products: product._id,
    },
  });

  res.redirect("/products");
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.redirect("/products");
};