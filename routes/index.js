const fs = require("node:fs");
const path = require("node:path");

/**
 * index 페이지 미들웨어
 */
const listPosts = (req, res, next) => {
  const PublicPath = path.join(__dirname, "../public/index.html");

  fs.readFile(PublicPath, (err, data) => {
    if (err) throw err;

    res.status(200).set("Content-Type", "text/html").send(data);
  });
};

module.exports = {
  listPosts,
};
