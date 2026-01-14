const Response = (res) => {
  if (!res)
    throw new Error("Response 객체를 생성하려면 res 객체가 필요합니다.");

  res.status =
    res.status ||
    ((code) => {
      res.statusCode = code;
      return res;
    });

  res.set =
    res.set ||
    ((key, value) => {
      res.setHeader(key, value);
      return res;
    });

  res.send =
    res.send ||
    ((text) => {
      if (!res.getHeader("Content-Type")) {
        res.setHeader("Content-Type", "text/plain");
        return res.end(text);
      }
    });

  res.json =
    res.json ||
    ((data) => {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(data));
    });

  return res;
};

module.exports = Response;
