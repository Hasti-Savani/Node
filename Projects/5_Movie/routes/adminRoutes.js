const express = require("express");
const router = express.Router();
const multer = require("multer");
const Movie = require("../models/Movie");

// Multer Config
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Admin Login Page
router.get("/login", (req, res) => {
  res.render("admin/login");
});

// Admin Login Logic
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid Credentials");
  }
});

// Dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.admin) return res.redirect("/admin/login");
  const movies = await Movie.find();
  res.render("admin/dashboard", { movies });
});

// Add Movie Page
router.get("/add-movie", (req, res) => {
  res.render("admin/add-movie");
});

// Add Movie Logic
router.post("/add-movie", upload.single("poster"), async (req, res) => {
  const newMovie = new Movie({
    ...req.body,
    posterImage: req.file.filename,
  });
  await newMovie.save();
  res.redirect("/admin/dashboard");
});

// Delete Movie
router.get("/delete/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/admin/dashboard");
});

// Edit Movie Page
router.get("/edit/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("admin/edit-movie", { movie });
});

// Update Movie
router.post("/edit/:id", upload.single("poster"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.posterImage = req.file.filename;
  }
  await Movie.findByIdAndUpdate(req.params.id, updateData);
  res.redirect("/admin/dashboard");
});

module.exports = router;
