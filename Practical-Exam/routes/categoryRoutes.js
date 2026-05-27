import express from "express";

import {
  categoryList,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  categoryList
);

router.post(
  "/add",
  authMiddleware,
  roleMiddleware("admin"),
  createCategory
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCategory
);

export default router;