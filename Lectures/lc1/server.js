// What is Node.JS?
// Node.js lets developers use JavaScript to write command line tools and server-side scripting.

const http = require("http");
const port = 5080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World !!");
});

server.listen(port, (err) => {
  !err ? console.log(`Server port on ${port}`) : null;
});

// REPL (Read-Eval-Print Loop)