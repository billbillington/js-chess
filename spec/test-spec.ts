import HelloWorld from '../src/js-chess';

describe("Hello World Test", function() {
  it("Should have the correct message", function() {
    let name = "Billy";
    let expectedMessage = "Hello! " + name;
    let helloWorld = new HelloWorld(name);

    expect(helloWorld.message()).toBe(expectedMessage);
  });
});
