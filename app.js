const { createServer } = require("node:http");
const debug = require("./utils/debug")("app");
const fs = require("node:fs");
const path = require("node:path");

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

const app = () => {
  const _server = createServer((req, res) => {
    const ext = path.extname(req.url);
    const publicPath = path.join(__dirname, "public");

    if (Object.keys(mimeTypes).includes(ext)) {
      fs.readFile(`${publicPath}${req.url}`, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("Not Found");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", mimeTypes[ext]);
          res.end(data);
        }
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      fs.readFile(`${publicPath}/index.html`, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end(data);
        }
      });
    }
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
