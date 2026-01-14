const Request = (req) => {
  if (!req) throw new Error("Request 객체를 생성하려면 인자가 필요합니다.");

  const partials = req.url.split("?");
  const path = partials[0] || "/";

  req.path = req.path || path;

  if (!partials[1] || !partials[1].trim()) return req;

  const qs = partials[1].split("&").reduce((obj, p) => {
    const flog = p.split("=");
    obj[flog[0]] = flog[1];
    return obj;
  }, {});

  req.query = qs;

  return req;
};

module.exports = Request;
