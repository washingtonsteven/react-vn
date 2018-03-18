import React, { Component } from "react";
import { StoryConsumer } from "@@/data/StoryContext";
import { NodeLinkTypes, excerpt } from "@@/util";
import { RadioGroup } from "@@/ui";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import "./NodeLinkEditor.scss";

class NodeLinkEditor extends Component {
  state = { aboutToBeDeleted: false };
  deleteSelf = removeNodeLinkFn => {
    if (this.state.aboutToBeDeleted)
      removeNodeLinkFn(this.props.nodeId, this.props.linkIndex);
    else {
      this.setState(state => ({ ...state, aboutToBeDeleted: true }));
    }
  };
  render() {
    return (
      <StoryConsumer>
        {({
          state: { storyData: { nodes } },
          actions: { updateNodeLink, removeNodeLink }
        }) => {
          const { nodeId, linkIndex, link } = this.props;
          return (
            <div className="node-link-editor">
              <div
                className="delete-node-link"
                onClick={e => this.deleteSelf(removeNodeLink)}
              >
                <FontAwesomeIcon icon="trash" />
                {this.state.aboutToBeDeleted && (
                  <span className="confirm">Click again to confirm</span>
                )}
              </div>
              <label htmlFor="node-link-content">
                <span>NodeLink text</span>
                <input
                  type="text"
                  name="node-link-content"
                  defaultValue={link.content}
                  onChange={e =>
                    updateNodeLink(nodeId, linkIndex, {
                      ...link,
                      content: e.target.value
                    })
                  }
                />
              </label>
              <label htmlFor="node-link-node-target">
                <span>Target Node</span>
                <select
                  name="node-link-node-target"
                  defaultValue={link.node}
                  onChange={e =>
                    updateNodeLink(nodeId, linkIndex, {
                      ...link,
                      node: e.target.value
                    })
                  }
                >
                  {nodes.map(node => (
                    <option value={node.id} key={node.id}>
                      {node.id} - {excerpt(node.content)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="node-link-type-options">
                <RadioGroup
                  options={Object.values(NodeLinkTypes)}
                  label="NodeLink type"
                  onChange={v =>
                    updateNodeLink(nodeId, linkIndex, { ...link, type: v })
                  }
                />
                {link.type === NodeLinkTypes.INPUT &&
                  this.renderInputOptions(updateNodeLink)}
                {link.type === NodeLinkTypes.INVENTORY &&
                  this.renderInventoryOptions(updateNodeLink)}
              </div>
            </div>
          );
        }}
      </StoryConsumer>
    );
  }

  renderInputOptions(updateFn) {
    const { link, linkIndex, nodeId } = this.props;
    return (
      <div className="input-node-link-options">
        <label htmlFor="target-variable">
          <span>Target Variable</span>
          <input
            type="text"
            name="target-variable"
            defaultValue={link.targetVariable || ""}
            onChange={e =>
              updateFn(nodeId, linkIndex, {
                ...link,
                targetVariable: e.target.value
              })
            }
          />
        </label>
        <label htmlFor="prompt">
          <span>Prompt</span>
          <input
            type="text"
            name="prompt"
            defaultValue={link.prompt || ""}
            onChange={e =>
              updateFn(nodeId, linkIndex, { ...link, prompt: e.target.value })
            }
          />
        </label>
      </div>
    );
  }

  renderInventoryOptions(updateFn) {
    const { nodeId, link, linkIndex } = this.props;
    return (
      <div className="inventory-node-link-options">
        <label htmlFor="item">
          <span>Item Name</span>
          <input
            type="text"
            name="item"
            defaultValue={link.item || ""}
            onChange={e =>
              updateFn(nodeId, linkIndex, { ...link, item: e.target.value })
            }
          />
        </label>
        <label htmlFor="action">
          <span>Action</span>
          <select
            name={`action`}
            defaultValue={link.action || "add"}
            onChange={e =>
              updateFn(nodeId, linkIndex, { ...link, action: e.target.value })
            }
          >
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </label>
      </div>
    );
  }
}

export default NodeLinkEditor;
