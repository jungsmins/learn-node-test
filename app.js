const createApp = require("./src/Application");
const index = require("./routers/index");
const { error404, errorHandler } = require("./middlewares/error");
const serveStatic = require("./middlewares/server-static");
const debug = require("./utils/debug")("bin");
const logger = require("./middlewares/logger");

const hostname = "127.0.0.1";
const port = 3000;

const app = createApp();

// 미들웨어 등록
app.use(logger);
app.use(serveStatic);
app.use("/", index.listPosts);
app.use(error404);
app.use(errorHandler);

app.listen(port, hostname, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
