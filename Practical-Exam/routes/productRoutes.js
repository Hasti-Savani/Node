import express from "express";

import {
  productList,
  productForm,
  createProduct,
  deleteProduct,
  myProducts,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, productList);

router.get("/my-products", authMiddleware, myProducts);

router.get("/add", authMiddleware, productForm);

router.post("/add", authMiddleware, createProduct);

router.delete("/:id", authMiddleware, deleteProduct);

export default router;