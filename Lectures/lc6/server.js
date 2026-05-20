import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import http from "http";
import connectDb from "./src/db/db.js";

const PORT = process.env.PORT || 5000;

connectDb();

http
  .createServer((req, res) => {
    res.end("Server running");
  })
  .listen(PORT, () => {
    console.log("Server Start on port", PORT);
  });
