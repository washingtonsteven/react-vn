import React, { Component } from "react";
import { StoryConsumer } from "@@/StoryContext";
import NodeLinkEditor from "./NodeLinkEditor";
import DeleteButton from "@@/ui/DeleteButton";

import "./NodeEditor.scss";

class NodeEditor extends Component {
  deleteConfirmed = removeNodeFn => {
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
              <DeleteButton
                className="delete-node"
                itemName="Node"
                onDeleteConfirmed={() => this.deleteConfirmed(removeNode)}
              />
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
                  defaultChecked={node.root}
                />
              </label>
              <label htmlFor="node-restart">
                <span>Game End / Restart</span>
                <input
                  type="checkbox"
                  id="node-restart"
                  onChange={e => setRestartNode(nodeId)}
                  defaultChecked={node.restart}
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
