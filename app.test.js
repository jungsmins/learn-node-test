const app = require("./app");

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
});
