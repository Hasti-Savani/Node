// Express Js
const express = require('express')
const port = 6040

const app = express()

app.get('/' , (req , res) => {
  res.send("Welcome to Expess Frameworks...");
})

app.listen(port , () => {
  console.log(`server start on port ${port}`);
})