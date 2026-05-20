const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Home Page
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("user/home", { movies });
});

// Movie Details
router.get("/movie/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("user/movie-details", { movie });
});

// Search
router.get("/search", async (req, res) => {
  const query = req.query.q;
  const movies = await Movie.find({
    title: { $regex: query, $options: "i" },
  });
  res.render("user/home", { movies });
});

module.exports = router;
