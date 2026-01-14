const { createServer } = require("node:http");
const debug = require("../utils/debug")("app");
const fs = require("node:fs");
const path = require("node:path");
const serverStatic = require("./server-static");
const Middleware = require("./middleware");

const app = () => {
  const _middleware = Middleware();
  const _server = createServer((req, res) => {
    _middleware.run(req, res);

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

  const use = (mw) => _middleware.add(mw);

  const listen = (port = 3000, hostname = "127.0.0.1", callback) => {
    _server.listen(port, hostname, callback);
    debug("server is listening...");
  };

  return {
    _middleware,
    _server,
    listen,
    use,
  };
};

module.exports = app;
