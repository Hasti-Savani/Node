const express = require("express");

const app = express();
const port = 4000;

app.get((res, req) => {
  res.end("HEllo World.......!");
});

app.listen(port, () => {
  console.log("Server Start on", port);
});
