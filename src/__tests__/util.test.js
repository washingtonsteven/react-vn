import React from "react";
import renderer from "react-test-renderer";
import {
  replaceVariables,
  processShortcodes,
  excerpt,
  EXCERPT_LENGTH,
  generateId,
  uuid,
  toCSS
} from "@@/util";
import validateCSS from "css-validator";

describe("replaceVariables", () => {
  const variable = btoa("variable");
  const variableData = { variable };

  it("replaces existing variables", () => {
    let testString = "I'm replacing a #{variable}";
    let targetString = `I'm replacing a ${variable}`;
    let replaced = replaceVariables(testString, variableData);
    expect(replaced).toEqual(targetString);
  });

  it("replaceVariables: doesn't replace non-existing", () => {
    let testString = "I'm replacing a #{variable2}";
    let replaced = replaceVariables(testString, variableData);
    expect(replaced).toEqual(testString);
  });

  it("doesn't fail when nothing is passed in", () => {
    const replaced = replaceVariables();
    expect(replaced).toEqual("");
  });
});

describe("processShortcodes", () => {
  it("replaces shortcodes", () => {
    const testContent =
      "I just want to #[dance rainbow]DANCE![/] link nobody is #[shaky]watching[/]";
    const shortcodeNode = renderer.create(processShortcodes(testContent));
    const tree = shortcodeNode.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("replaces link shortcodes", () => {
    const testContent =
      "Let's go to a different #[link http://google.com]page[/]";
    const shortcodeNode = renderer.create(processShortcodes(testContent));
    const tree = shortcodeNode.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("returns empty on null passed in", () => {
    const tree = renderer.create(processShortcodes()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("excerpt", () => {
  it("trims to the provided excerpt length", () => {
    const longString =
      "u8dxJj9e9LshZQrI9yJUujjQ49jDRuSnovDLAeMAJeVRi5wGPmjhh53TznqGrJN9TYbwYV59DmYAvRDNchOsJM0W6i1k";
    const shortened = excerpt(longString);
    expect(shortened.length).toEqual(EXCERPT_LENGTH + 1);
    expect(shortened).toEqual(
      longString.substring(0, EXCERPT_LENGTH) + "\u2026"
    );
  });

  it("doesn't change stringer under the excerpt length", () => {
    const shortString = "FbuC9LbKtjXGMBTl7R3nZjmWsZe7qzlwjfFUeNN0SJbW";
    const shortened = excerpt(shortString);
    expect(shortened.length).toEqual(shortString.length);
    expect(shortened).toEqual(shortString);
  });

  it("doesn't modify non-strings", () => {
    const obj = {};
    expect(excerpt(obj)).toEqual(obj);
  });
});

describe("generateId", () => {
  const noNodes = [];
  const numericNodes = [{ id: "0" }, { id: "1" }, { id: "2" }];
  const numericNodesNonZero = [{ id: "5" }, { id: "6" }, { id: "7" }];
  const numericNodesNonSequential = [
    { id: "10" },
    { id: "1005" },
    { id: "44" }
  ];
  const numberNodes = [{ id: 0 }, { id: 3 }, { id: 5 }];
  const nonNumericNodes = [{ id: "steve" }, { id: "baymax" }, { id: "thor" }];
  // Note: numeric id is Black Panther earnings as of 2018-03-24;
  const someNumericNodes = [
    { id: "t'challa" },
    { id: "1211644236" },
    { id: "okoye" }
  ];

  it("returns String(0) for first id", () => {
    const id = generateId(noNodes);
    expect(id).toEqual("0");
  });

  it("returns next id for numeric, sequential ids", () => {
    const id = generateId(numericNodes);
    expect(id).toEqual("3");
  });

  it("returns next id for numeric, sequential ids that don't start at 0", () => {
    const id = generateId(numericNodesNonZero);
    expect(id).toEqual("8");
  });

  it("returns next id for numeric, nonseqential nodes", () => {
    const id = generateId(numericNodesNonSequential);
    expect(id).toEqual("1006");
  });

  it("returns next id for int ids", () => {
    const id = generateId(numberNodes);
    expect(id).toEqual("6");
  });

  it("returns String(0) for all non numeric nodes", () => {
    const id = generateId(nonNumericNodes);
    expect(id).toEqual("0");
  });

  it("returns next id for some non-numeric ids", () => {
    const id = generateId(someNumericNodes);
    expect(id).toEqual("1211644237");
  });
});

describe("uuid", () => {
  it("returns a string", () => {
    expect(typeof uuid()).toBe("string");
  });
});

describe("toCSS", () => {
  beforeAll(() => require("babel-polyfill"));

  it("generates valid css", done => {
    const styleObj = {
      color: "blue",
      backgroundColor: "black",
      background: "url(http://google.com)"
    };

    const cssString = `* { ${toCSS(styleObj)} }`;

    validateCSS({ text: cssString }, (err, data) => {
      expect(data.validity).toEqual(true);
      expect(data.errors).toEqual([]);
      expect(data.warnings).toEqual([]);
      done();
    });
  });
});
