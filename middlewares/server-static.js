const fs = require("node:fs");
const path = require("node:path");

const MIME_TYPES = {
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

/**
 * 정적 파일 서빙 미들웨어
 */
const serveStatic = (req, res, next) => {
  const ext = path.extname(req.url);
  const publicPath = path.join(__dirname, "../public");

  if (ext in MIME_TYPES) {
    const filePath = path.join(publicPath, req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", MIME_TYPES[ext]);
        res.end(data);
      }
    });
  } else {
    next();
  }
};

module.exports = serveStatic;
