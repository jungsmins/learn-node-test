const createMiddleware = require("./middleware");

describe("Middleware", () => {
  let middleware;

  beforeEach(() => {
    middleware = createMiddleware();
  });

  test("미들웨어의 초기값은 빈 배열이다.", () => {
    expect(middleware._middlewares.length).toBe(0);
  });

  describe("add", () => {
    test("미들 웨어에 함수를 추가 할 수 있다.", () => {
      const fns = [() => {}, () => {}, () => {}];
      fns.forEach((fn) => middleware.add(fn));
      expect(middleware._middlewares.length).toBe(3);
    });
  });

  describe("run", () => {
    test("미들웨어 함수를 순서대로 실행한다.", async () => {
      const mockFn = {
        mw1: jest.fn((req, res, next) => next()),
        mw2: jest.fn((req, res, next) => next()),
      };

      const fns = [mockFn.mw1, mockFn.mw2];

      fns.forEach((fn) => middleware.add(fn));

      middleware.run();

      fns.forEach((fn) => {
        expect(fn).toHaveBeenCalled();
      });
    });

    test("미들웨어 함수에서 next를 호출하지 않으면 미들웨어 체인을 중단한다.", async () => {
      const mockFn = {
        mw1: jest.fn((req, res, next) => next()),
        mwWillStop: jest.fn((req, res, next) => null),
        mw2: jest.fn((req, res, next) => next()),
      };

      const fns = [mockFn.mw1, mockFn.mwWillStop, mockFn.mw2];

      fns.forEach((fn) => middleware.add(fn));

      middleware.run();

      expect(mockFn.mw1).toHaveBeenCalled();
      expect(mockFn.mwWillStop).toHaveBeenCalled();
      expect(mockFn.mw2).not.toHaveBeenCalled();
    });

    test("에러 발생시 에러 미들웨어만 실행한다.", async () => {
      const mockFn = {
        mw1: jest.fn((req, res, next) => next()),
        middleWillThrow: jest.fn((req, res, next) => next(new Error())),
        mw2: jest.fn((req, res, next) => next()),
        mwWillCatchError: jest.fn((err, req, res, next) => null),
      };

      const fns = [
        mockFn.mw1,
        mockFn.middleWillThrow,
        mockFn.mw2,
        mockFn.mwWillCatchError,
      ];

      fns.forEach((fn) => middleware.add(fn));

      middleware.run();

      expect(mockFn.mw1).toHaveBeenCalled();
      expect(mockFn.middleWillThrow).toHaveBeenCalled();
      expect(mockFn.mw2).not.toHaveBeenCalled();
      expect(mockFn.mwWillCatchError).toHaveBeenCalled();
    });
  });
});
