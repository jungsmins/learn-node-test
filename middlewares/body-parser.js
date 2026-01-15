const bodyParser = (req, res, next) => {
  let body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();

    body = body.split("&").reduce((obj, pair) => {
      if (!pair) return obj;
      const [key, value] = pair.split("=");
      obj[key] = value;
      return obj;
    }, {});

    req.body = body;

    next();
  });
};

module.exports = bodyParser;
