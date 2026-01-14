const { createServer } = require("node:http");
const debug = require("../utils/debug")("app");
const createMiddleware = require("./middleware");
const Response = require("./Response");
const Request = require("./Request");

const createApp = () => {
  const _middleware = createMiddleware();
  const _server = createServer((req, res) => {
    console.log(req.url);
    _middleware.run(Request(req), Response(res));
  });

  const use = (path, mw) => {
    if (typeof path === "string" && typeof mw === "function") {
      mw._path = path;
    } else if (typeof path === "function") {
      mw = path;
    } else {
      throw new Error("Usage: use(path, fn) or use(fn)");
    }

    _middleware.add(mw);
  };

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

module.exports = createApp;
