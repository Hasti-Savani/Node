const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory storage
let tasks = [];

// GET Method
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST Method
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json({ message: "Task added successfully" });
});

// DELETE Method
app.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:$ {PORT}`);
});

app.listen();