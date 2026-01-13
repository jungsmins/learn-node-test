const server = require("./server");

describe("server test suite", () => {
  test("return Hello, world!", () => {
    expect(server()).toBe("Hello, world!");
  });
});
