const { createServer } = require("node:http");
const debug = require("../utils/debug")("app");
const fs = require("node:fs");
const path = require("node:path");
const serverStatic = require("./server-static");

const app = () => {
  const _server = createServer((req, res) => {
    serverStatic(req, res);

    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");

    const filePath = path.join(__dirname, "../public/index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
  });

  const listen = (port = 3000, hostname = "127.0.0.1", callback) => {
    _server.listen(port, hostname, callback);
    debug("server is listening...");
  };

  return {
    _server,
    listen,
  };
};

module.exports = app;
