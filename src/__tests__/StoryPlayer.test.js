import React from "react";
import { StoryPlayerWithoutProvider as StoryPlayer } from "@@/StoryPlayer";
import { shallow } from "enzyme";

describe("StoryPlayer", () => {
  let component = null;
  let editorComponent = null;

  beforeAll(() => {
    component = shallow(<StoryPlayer />);
    editorComponent = shallow(<StoryPlayer debug={true} editor={true} />);
  });

  it("should render without crashing", () => {
    expect(component.is(".story-player")).toBe(true);
  });

  it("should render basic UI", () => {
    expect(component.find(".edit-toggle")).not.toExist();
  });

  it("should render editor UI", () => {
    expect(editorComponent.find(".edit-toggle")).toExist();
  });

  it("should toggle editing state", () => {
    const initialState = editorComponent.state().editing;
    editorComponent.instance().toggleEditing();
    editorComponent.update();
    expect(editorComponent.state().editing).toBe(!initialState);
    expect(editorComponent.text().includes("StoryEditor")).toBe(!initialState);
  });

  it("should not toggle editing state in not editor player", () => {
    editorComponent.instance().toggleEditing();
    editorComponent.update();
    expect(editorComponent.state().editing).toBeFalsy();
    expect(editorComponent.text().includes("StoryEdtior")).toBe(false);
  });
});
