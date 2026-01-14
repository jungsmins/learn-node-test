const createApp = require("./src/app");
const index = require("./middlewares/index");
const error404 = require("./middlewares/error-404");
const errorHandler = require("./middlewares/error-handler");
const serveStatic = require("./middlewares/server-static");
const debug = require("./utils/debug")("bin");

const hostname = "127.0.0.1";
const port = 3000;

const app = createApp();

// 미들웨어 등록
app.use(serveStatic);
app.use(index);
app.use(error404);
app.use(errorHandler);

app.listen(port, hostname, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
