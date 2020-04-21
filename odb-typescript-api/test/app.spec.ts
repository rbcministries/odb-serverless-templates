import { expect } from "chai";
import "mocha";

describe("This", () => {
  describe("should", () => {
    it("never pass", () => {
      expect(true).to.equal(false);
    });
  });
});