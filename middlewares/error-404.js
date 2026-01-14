/**
 * 404 에러 미들웨어
 */
const error404 = (req, res, next) => {
  res.statusCode = 404;
  res.end("Not Found");
};

module.exports = error404;
