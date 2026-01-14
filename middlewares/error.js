const error404 = (req, res, next) => {
  res.statusCode = 404;
  res.end("Not Found");
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.statusCode = 500;
  res.end("Internal Server Error");
};

module.exports = {
  error404,
  errorHandler,
};
