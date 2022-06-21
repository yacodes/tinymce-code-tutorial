import { describe, it } from "@ephox/bedrock-client";
import { assert } from "chai";
import { Optional } from "@ephox/katamari";
import * as Ex from "../../../main/ts/Part2Ex3Optional";

describe("Exercise3OptionTest", () => {
  it("getProtocol", () => {
    assert.equal(Ex.getProtocol("https://frog.com").getOrDie(), "https");
    assert.equal(Ex.getProtocol("http://frog.com").getOrDie(), "http");
    assert.equal(Ex.getProtocol("ftp://frog.com").getOrDie(), "ftp");
    assert.equal(Ex.getProtocol("HttP://frog.com").getOrDie(), "http");
    assert.isTrue(
      Ex.getProtocol("frog.com").isNone(),
      "no protocol should be found"
    );
    assert.isTrue(
      Ex.getProtocol("://frog.com").isNone(),
      "no protocol should be found"
    );
    assert.isTrue(
      Ex.getProtocol("3ttp://frog.com").isNone(),
      "malformed protocol should not be registered"
    );
  });

  it("toPositiveInteger", () => {
    assert.equal(Ex.toPositiveInteger(10).getOrDie(), 10);
    assert.equal(Ex.toPositiveInteger(1000000000).getOrDie(), 1000000000);
    assert.isTrue(Ex.toPositiveInteger(0).isNone());
    assert.isTrue(Ex.toPositiveInteger(-1).isNone());
    assert.isTrue(Ex.toPositiveInteger(-999999).isNone());
  });

  it("toEmptyString", () => {
    assert.equal(Ex.toEmptyString("Hello world!").getOrDie(), "Hello world!");
    assert.isTrue(Ex.toEmptyString("").isNone());
    assert.isTrue(Ex.toEmptyString("        ").isNone());
    assert.isTrue(Ex.toEmptyString("\n\t  \n\t").isNone());
  });

  it("getNextSibling", () => {
    const root = document.createElement("div");
    const firstChild = document.createElement("span");
    const secondChild = document.createElement("em");
    root.appendChild(firstChild);
    root.appendChild(secondChild);

    assert.equal(Ex.getNextSibling(firstChild).getOrDie(), secondChild);
    assert.isTrue(Ex.getNextSibling(secondChild).isNone());
  });

  it("getAttributeNode", () => {
    const root = document.createElement("div");
    root.classList.add("hello");

    assert.isTrue(
      Ex.getAttributeNode(root, "class").getOrDie() instanceof Attr
    );
    assert.isTrue(Ex.getAttributeNode(root, "data-tiny-attr-node").isNone());
  });

  it("message", () => {
    assert.equal(Ex.message(Optional.none()), "no value");
    assert.equal(
      Ex.message(Optional.from("Hello world!")),
      "The value was Hello world!"
    );
  });

  it("double", () => {
    assert.equal(Ex.double(Optional.from(10)), 20);
    assert.equal(Ex.double(Optional.from(0)), 0);
    assert.equal(Ex.double(Optional.from(-10)), -20);
    assert.equal(Ex.double(Optional.none()), 0);
  });

  it("getAge", () => {
    assert.deepEqual(Ex.getAge(Optional.from({ age: 10 })), { age: 10 });
    assert.deepEqual(Ex.getAge(Optional.from({ age: 0 })), { age: 0 });
    assert.deepEqual(Ex.getAge(Optional.none()), { age: 0 });
  });

  it("getAge", () => {
    assert.deepEqual(Ex.getAgeWithFold(Optional.from({ age: 10 })), {
      age: 10,
    });
    assert.deepEqual(Ex.getAgeWithFold(Optional.from({ age: 0 })), { age: 0 });
    assert.deepEqual(Ex.getAgeWithFold(Optional.none()), { age: 0 });
  });

  it("optionalToArray", () => {
    assert.deepEqual(Ex.optionalToArray(Optional.from(10)), [10]);
    assert.deepEqual(Ex.optionalToArray(Optional.from("hello")), ["hello"]);
    assert.deepEqual(Ex.optionalToArray(Optional.none()), []);
  });

  it("arrayToOptional", () => {
    assert.deepEqual(Ex.arrayToOptional([10]).getOrDie(), 10);
    assert.deepEqual(Ex.arrayToOptional(["hello"]).getOrDie(), "hello");
    assert.isTrue(Ex.arrayToOptional([]).isNone());
  });

  it("add3", () => {
    assert.equal(Ex.add3(Optional.from(10)).getOrDie(), 13);
    assert.equal(Ex.add3(Optional.from(-3)).getOrDie(), 0);
    assert.isTrue(Ex.add3(Optional.none()).isNone());
  });

  it("prefixWithHello", () => {
    assert.equal(
      Ex.prefixWithHello(Optional.from("John")).getOrDie(),
      "Hello John"
    );
    assert.equal(
      Ex.prefixWithHello(Optional.from("world")).getOrDie(),
      "Hello world"
    );
    assert.isTrue(Ex.prefixWithHello(Optional.none()).isNone());
  });
});

// DONE: Now that you have finished all the test files in this directory,
// try running all tests in the "part2" folder all using the `-d` argument in bedrock and specifying the parent directory.
