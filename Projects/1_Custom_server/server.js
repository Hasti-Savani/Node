const http = require("http");
const port = 9654;

const server = http.createServer((req, res) => {
  res.write("This is a custom server using HTTP......!");
  res.end();
});

server.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
