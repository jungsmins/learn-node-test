const { createServer } = require("node:http");

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, world!\n");
});

module.exports = server;
