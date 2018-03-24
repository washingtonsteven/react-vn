import React from "react";
import FontAwesomeLibrary from "@@/ui/FontAwesomeLibrary";
import StoryLoader from "@@/StoryLoader";
import renderer from "react-test-renderer";

const e = {
  target: { value: "" },
  stopPropagation: jest.fn(),
  preventDefault: jest.fn()
};

let component = null;
let instance = null;
let tree = null;
const onFileLoaded = jest.fn();
const onFilePathSet = jest.fn();
const onNew = jest.fn();
const fnProps = { onFileLoaded, onFilePathSet, onNew };

beforeAll(() => {
  component = renderer.create(<StoryLoader {...fnProps} />);
  instance = component.getInstance();
  tree = component.toJSON();
});

it("renders without crashing", () => {
  expect(tree).toMatchSnapshot();
});

it("updates file url path", () => {
  const testURL = "test/test.json";
  instance.setFilePath({ target: { value: "test/test.json" } });
  expect(instance.state.jsonURL).toEqual(testURL);
  expect(tree).toMatchSnapshot();

  const evt = { ...e };
  instance.loadFile(evt);
  expect(onFilePathSet).toBeCalledWith(testURL);
});

it("handles an load error from JSONFileInput", () => {
  const errorObj = { message: "Error form JSON File Input" };
  instance.onLoadError(errorObj);
  expect(instance.state.error).toEqual(errorObj.message);
  expect(tree).toMatchSnapshot();
});

it("checks resulting json", () => {
  const noNodes = {};
  const noMeta = { nodes: [] };
  const valid = { nodes: [], meta: {} };
  instance.fileSelected(noNodes);
  expect(instance.state.error).toBeTruthy();
  expect(instance.state.error).toMatch(/`nodes`/);
  instance.clearError();
  expect(instance.state.error).toBeFalsy();
  instance.fileSelected(noMeta);
  expect(instance.state.error).toBeTruthy();
  expect(instance.state.error).toMatch(/`meta`/);
  instance.fileSelected(valid);
  expect(onFileLoaded).toBeCalledWith(valid);
});
