const debug = require("./debug");

describe("debug", () => {
  describe("생성", () => {
    test("태그명을 인자로 받는다. (없으면 예외 처리)", () => {
      expect(() => debug()).toThrow();
    });

    test("함수를 반환한다.", () => {
      const debug = require("./debug")("test");

      expect(typeof debug).toBe("function");
    });
  });

  describe("반환된 함수", () => {
    let debug, tag, msg, expected;

    beforeEach(() => {
      tag = "test";
      debug = require("./debug")(tag);
      msg = "디버그 메세지";
      expected = `${tag} ${msg}`;
    });

    test("tag와 msg를 조합하여 로그 문자열을 반환한다.", () => {
      const actual = debug(msg);

      expect(actual).toBe(expected);
    });

    test("로그 문자열을 인자로 받아 콘솔에 출력한다.", () => {
      const spy = jest.spyOn(console, "log");

      debug(msg);

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });
});
