import Category from "../models/Category.js";

export const categoryList = async (req, res) => {
  const categories = await Category.find();

  res.render("categoryList", { categories });
};

export const createCategory = async (req, res) => {
  await Category.create({
    name: req.body.name,
  });

  res.redirect("/categories");
};

export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.redirect("/categories");
};