const Request = require("./Request");

describe("Request", () => {
  test("생성 인자가 없으면 에러를 던진다", () => {
    expect(() => Request()).toThrow();
  });

  describe("반환 객체", () => {
    let req, path, qs;

    beforeEach(() => {
      path = "/api/posts";
      qs = {
        limit: "2",
        page: "1",
      };
      const encodedQs = `limit=${qs.limit}&page=${qs.page}`;
      req = Request({ url: `${path}?${encodedQs}` });
    });

    test("path 프로퍼티를 노출한다.", () => {
      expect(req).toHaveProperty("path", path);
    });

    test("query 프로퍼티를 노출한다.", () => {
      expect(req).toHaveProperty("query");
      expect(req.query.limit).toEqual(qs.limit);
      expect(req.query.page).toEqual(qs.page);
    });
  });
});
