const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// DB Connection
mongoose.connect("mongodb+srv://jinalrathod594_db_user:jinal_594@cluster0.qwbepcd.mongodb.net/")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "movieSecret",
    resave: false,
    saveUninitialized: true
}));

// View Engine
app.set("view engine", "ejs");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});