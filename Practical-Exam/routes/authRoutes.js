import express from "express";

import {
  registerPage,
  loginPage,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/register", registerPage);
router.post("/register", registerUser);

router.get("/login", loginPage);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;