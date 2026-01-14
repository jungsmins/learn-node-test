const { createServer } = require("node:http");
const debug = require("../utils/debug")("app");
const createMiddleware = require("./middleware");

const createApp = () => {
  const _middleware = createMiddleware();
  const _server = createServer((req, res) => {
    _middleware.run(req, res);
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

module.exports = createApp;
