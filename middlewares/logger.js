const COLORS = {
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
};

const RESET_COLOR = "\x1b[0m";

const methodColorMap = {
  get: COLORS.green,
  post: COLORS.cyan,
  put: COLORS.yellow,
  delete: COLORS.red,
};

const logger = (req, res, next) => {
  const coloredMethod = (method) => {
    return `${methodColorMap[method.toLowerCase()]}${method} ${RESET_COLOR}`;
  };

  console.log(`${coloredMethod(req.method)} ${req.url}`);
  next();
};

module.exports = logger;
