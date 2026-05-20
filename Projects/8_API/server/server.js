require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const Product = require("./models/Product");

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/seed", async (req, res) => {
  await Product.create([
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: 20000 },
    { name: "Headphones", price: 2000 },
  ]);

  res.send("Data Added");
});

app.listen(5000, () => console.log("Server running on port 5000"));
