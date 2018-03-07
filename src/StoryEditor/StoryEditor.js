import React, { Component, Fragment } from "react";
import { StoryConsumer } from "@@/data/StoryContext";

import NodeEditor from "./NodeEditor";
import NodeList from "./NodeList";

import "./StoryEditor.scss";

const ExportButton = props => (
  <StoryConsumer>
    {({ state: { storyData: { nodes } } }) => {
      return (
        <a
          id="menu-export"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(nodes, null, 1)
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
  state = {};
  exitNodeEditor = () =>
    this.setState(state => ({ ...state, currentNodeId: null, editing: false }));
  onNodeSelected = node =>
    this.setState(state => ({
      ...state,
      currentNodeId: node.id,
      editing: true
    }));
  render() {
    return (
      <StoryConsumer>
        {({
          state: { storyData: { nodes } },
          actions: { updateNode, addBlankNode },
          helpers: { getNode }
        }) => (
          <div className="editor">
            <div className="menu">
              <ExportButton />
            </div>
            {this.state.editing && this.state.currentNodeId ? (
              <NodeEditor
                nodeId={this.state.currentNodeId}
                onExit={this.exitNodeEditor}
              />
            ) : (
              <Fragment>
                <NodeList list={nodes} onNodeSelected={this.onNodeSelected} />
                <button onClick={addBlankNode}>Add New Node</button>
              </Fragment>
            )}
          </div>
        )}
      </StoryConsumer>
    );
  }
}

export default StoryEditor;
