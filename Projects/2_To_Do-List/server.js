const express = require("express");
const app = express();

const port = 3456;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get("/", (req, res) => {
  res.render("index", { todos });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task) {
    todos.push(task);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  todos.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
