/**
 * 500 에러 핸들러 미들웨어
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.statusCode = 500;
  res.end("Internal Server Error");
};

module.exports = errorHandler;
