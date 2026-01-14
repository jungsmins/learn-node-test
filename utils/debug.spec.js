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
    let debugFn, tag, msg;
    const ansiColorPattern = /\x1b\[\d+m/;
    const RESET_COLOR = "\x1b[0m";

    beforeEach(() => {
      tag = "test";
      debugFn = require("./debug")(tag);
      msg = "디버그 메세지";
    });

    test("tag와 msg를 조합하여 로그 문자열을 반환한다. (컬러 코드 포함)", () => {
      const actual = debugFn(msg);

      expect(actual).toMatch(ansiColorPattern);
      expect(actual).toContain(tag);
      expect(actual).toContain(msg);
      expect(actual).toContain(RESET_COLOR);
    });

    test("로그 문자열을 인자로 받아 콘솔에 출력한다.", () => {
      const spy = jest.spyOn(console, "log");

      const result = debugFn(msg);

      expect(spy).toHaveBeenCalledWith(result);

      // cleanup
      spy.mockRestore();
    });
  });
});
