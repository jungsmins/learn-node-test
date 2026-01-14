const Application = require("./app");

describe("app", () => {
  describe("listen", () => {
    test("server 객체의 listen 함수를 호출한다.", () => {
      // arrange
      const app = Application();
      const spy = jest.spyOn(app._server, "listen");

      // act
      app.listen();

      // assert
      expect(spy).toHaveBeenCalled();

      // cleanup
      spy.mockRestore();
    });
  });

  describe("use", () => {
    test("미들웨어 모듈 인스턴스의 add 함수를 호출한다.", () => {
      const app = Application();
      const spy = jest.spyOn(app._middleware, "add");
      const mw1 = () => {};

      app.use(mw1);

      expect(spy).toHaveBeenCalled();
    });
  });
});
