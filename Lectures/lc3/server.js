const express = require("express");
const app = express();

// set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
  res.render("index", { name: "Jinal" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
