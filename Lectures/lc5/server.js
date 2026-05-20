const http = require('http');
const bodyParser = require("body-parser");
const express = require("express");
const port = 5623;

const app = http;

app.get("/", (res, req) => {
 res.end("Hello World...........!")
});

app.listen(port, () => {
  console.log(`Server Start on port ${port}`);
});
