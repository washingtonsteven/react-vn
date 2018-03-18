import React, { Component } from "react";
import { StoryConsumer } from "@@/data/StoryContext";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import NodeLinkEditor from "./NodeLinkEditor";

import "./NodeEditor.scss";

class NodeEditor extends Component {
  state = { aboutToBeDeleted: false };
  deleteSelf = () => {
    this.setState(state => ({ ...state, aboutToBeDeleted: true }));
  };
  undelete = e => {
    e.stopPropagation();
    this.setState(state => ({ ...state, aboutToBeDeleted: false }));
  };
  confirmDelete = removeNodeFn => {
    this.props.onExit && this.props.onExit();
    removeNodeFn(this.props.nodeId);
  };
  render() {
    const { nodeId } = this.props;
    return (
      <StoryConsumer>
        {({
          actions: {
            updateNodeContent,
            addBlankNodeLink,
            setRootNode,
            setRestartNode,
            removeNode
          },
          helpers: { getNode }
        }) => {
          const node = getNode(nodeId);
          return (
            <div className="node-editor">
              <div className="delete-node" onClick={this.deleteSelf}>
                <FontAwesomeIcon icon="trash" />
                {!this.state.aboutToBeDeleted && (
                  <span className="confirm">Delete this Node?</span>
                )}
                {this.state.aboutToBeDeleted && (
                  <span className="confirm">
                    Are you sure you want to delete this node?{" "}
                    <span
                      className="confirmLink"
                      onClick={() => this.confirmDelete(removeNode)}
                    >
                      Yes
                    </span>{" "}
                    <span className="confirmLink" onClick={this.undelete}>
                      No
                    </span>
                  </span>
                )}
              </div>
              <label htmlFor="node-id">
                <span>ID</span>
                <input
                  type="text"
                  id="node-id"
                  className="node-id"
                  value={nodeId}
                  readOnly
                />
              </label>
              <label htmlFor="node-root">
                <span>Root/Start Node</span>
                <input
                  type="checkbox"
                  id="node-root"
                  onChange={e => setRootNode(nodeId)}
                  defaultValue={node.root}
                />
              </label>
              <label htmlFor="node-restart">
                <span>Game End / Restart</span>
                <input
                  type="checkbox"
                  id="node-restart"
                  onChange={e => setRestartNode(nodeId)}
                  defaultValue={node.restart}
                />
              </label>
              <label htmlFor="node-content">
                <span>Content</span>
                <textarea
                  id="node-content"
                  onChange={e => updateNodeContent(nodeId, e.target.value)}
                  defaultValue={node.content}
                />
              </label>
              {node &&
                node.next &&
                node.next.map((link, i) => (
                  <NodeLinkEditor
                    nodeId={nodeId}
                    link={link}
                    linkIndex={i}
                    key={i}
                  />
                ))}
              <button onClick={() => addBlankNodeLink(nodeId)}>
                Add New Link
              </button>
            </div>
          );
        }}
      </StoryConsumer>
    );
  }
}

export default NodeEditor;
