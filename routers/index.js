const fs = require("node:fs");
const path = require("node:path");

/**
 * index 페이지 미들웨어
 */
const listPosts = (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  const PublicPath = path.join(__dirname, "../public/index.html");
  fs.readFile(PublicPath, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.end(data);
    }
  });
};

module.exports = {
  listPosts,
};
