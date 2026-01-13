const { createServer } = require("node:http");

const app = () => {
  const _server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world!\n");
  });

  const listen = (port = 3000, hostname = "127.0.0.1", callback) => {
    _server.listen(port, hostname, callback);
  };

  return {
    _server,
    listen,
  };
};

module.exports = app;
