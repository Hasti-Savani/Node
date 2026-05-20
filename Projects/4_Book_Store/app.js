require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// ===== MongoDB Connection (INSIDE app.js) =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ===== Schema =====
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  category: String,
  image: String,
  description: String,
});

const Book = mongoose.model("Book", bookSchema);

// ================= USER ROUTES =================

// Home - View All Books
app.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

// Search Book
app.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  const books = await Book.find({
    title: { $regex: keyword, $options: "i" },
  });
  res.render("index", { books });
});

// Book Details
app.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("details", { book });
});

// ================= ADMIN =================

// Login Page
app.get("/admin", (req, res) => {
  res.render("admin-login");
});

// Login POST
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid Credentials");
  }
});

// Dashboard
app.get("/admin/dashboard", async (req, res) => {
  if (!req.session.admin) return res.redirect("/admin");
  const books = await Book.find();
  res.render("admin-dashboard", { books });
});

// Add Book Page
app.get("/admin/add", (req, res) => {
  if (!req.session.admin) return res.redirect("/admin");
  res.render("add-book");
});

// Add Book POST
app.post("/admin/add", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.redirect("/admin/dashboard");
});

// Edit Book Page
app.get("/admin/edit/:id", async (req, res) => {
  if (!req.session.admin) return res.redirect("/admin");
  const book = await Book.findById(req.params.id);
  res.render("edit-book", { book });
});

// Update Book
app.post("/admin/update/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/dashboard");
});

// Delete Book
app.get("/admin/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/admin/dashboard");
});

// Logout
app.get("/admin/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// ===== Server =====
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
