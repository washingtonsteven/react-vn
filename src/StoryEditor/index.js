import React, { Component, Fragment } from "react";
import { StoryConsumer } from "@@/StoryContext";

import NodeEditor from "./NodeEditor";
import NodeList from "./NodeList";
import MetaEditor from "./MetaEditor";

import "./StoryEditor.scss";

const EditorStates = {
  NODE_LIST: "NODE_LIST",
  NODE_EDITOR: "NODE_EDITOR",
  META_EDITOR: "META_EDITOR"
};

const ExportButton = props => (
  <StoryConsumer>
    {({ state: { storyData } }) => {
      return (
        <a
          id="menu-export"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(storyData, null, 1)
          )}`}
          download="story.json"
          className="button"
          role="button"
        >
          {props.children || "Export"}
        </a>
      );
    }}
  </StoryConsumer>
);

class StoryEditor extends Component {
  state = { editingState: EditorStates.NODE_LIST };
  returnToNodeList = () =>
    this.setState(state => ({
      ...state,
      currentNodeId: null,
      editingState: EditorStates.NODE_LIST
    }));
  onNodeSelected = node =>
    this.setState(state => ({
      ...state,
      currentNodeId: node.id,
      editingState: EditorStates.NODE_EDITOR
    }));
  gotoMetaEditor = () =>
    this.setState(state => ({
      ...state,
      editingState: EditorStates.META_EDITOR
    }));
  render() {
    return (
      <StoryConsumer>
        {({ state: { storyData: { nodes } }, actions: { addBlankNode } }) => (
          <div className="editor">
            <div className="menu">
              <ExportButton />
              {this.state.editingState === EditorStates.NODE_LIST && (
                <Fragment>
                  <button onClick={addBlankNode}>Add New Node</button>
                  <button onClick={this.gotoMetaEditor}>Edit Story Meta</button>
                </Fragment>
              )}
              {this.state.editingState !== EditorStates.NODE_LIST && (
                <button onClick={this.returnToNodeList}>Back to List</button>
              )}
            </div>
            {this.state.editingState === EditorStates.NODE_EDITOR &&
            (this.state.currentNodeId || this.state.currentNodeId === 0) ? (
              <NodeEditor
                nodeId={this.state.currentNodeId}
                onExit={this.returnToNodeList}
              />
            ) : this.state.editingState === EditorStates.META_EDITOR ? (
              <MetaEditor />
            ) : (
              <NodeList list={nodes} onNodeSelected={this.onNodeSelected} />
            )}
          </div>
        )}
      </StoryConsumer>
    );
  }
}

export default StoryEditor;
