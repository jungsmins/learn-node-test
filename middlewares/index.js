const fs = require("node:fs");
const path = require("node:path");

/**
 * index 페이지 미들웨어
 */
const index = (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  const filePath = path.join(__dirname, "../public/index.html");
  fs.readFile(filePath, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.end(data);
    }
  });
};

module.exports = index;
