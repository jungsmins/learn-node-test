const Response = require("./Response");

describe("Response", () => {
  let res;

  beforeEach(() => {
    res = Response({});
  });

  test("status 메소드를 노출한다.", () => {
    expect(res).toHaveProperty("status");
    expect(typeof res.status).toBe("function");
  });

  test("set 메소드를 노출한다.", () => {
    expect(res).toHaveProperty("set");
    expect(typeof res.set).toBe("function");
    expect(res.set.length).toBe(2);
  });

  test("send 메소드를 노출한다.", () => {
    expect(res).toHaveProperty("send");
    expect(typeof res.send).toBe("function");
  });

  test("json 메소드를 노출한다.", () => {
    expect(res).toHaveProperty("json");
    expect(typeof res.json).toBe("function");
  });
});
