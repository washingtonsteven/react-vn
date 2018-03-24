import React, { Component } from "react";
import { StoryConsumer } from "@@/data/StoryContext";
import { NodeLinkTypes } from "@@/util";
import RadioGroup from "@@/ui/RadioGroup";
import DeleteButton from "./DeleteButton";
import NodeSelector from "./NodeSelector";

import "./NodeLinkEditor.scss";

class NodeLinkEditor extends Component {
  deleteConfirmed = removeNodeLinkFn => {
    removeNodeLinkFn(this.props.nodeId, this.props.linkIndex);
  };
  render() {
    return (
      <StoryConsumer>
        {({
          state: { storyData: { nodes } },
          actions: { updateNodeLink, removeNodeLink },
          helpers: { getNode }
        }) => {
          const { nodeId, linkIndex, link } = this.props;
          return (
            <div className="node-link-editor">
              <DeleteButton
                className="delete-node-link"
                itemName="Link"
                onDeleteConfirmed={() => this.deleteConfirmed(removeNodeLink)}
              />
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
              <NodeSelector
                nodes={nodes}
                selectedNode={getNode(link.node)}
                onChange={n =>
                  updateNodeLink(nodeId, linkIndex, { ...link, node: n.id })
                }
              />
              <div className="node-link-type-options">
                <RadioGroup
                  options={Object.values(NodeLinkTypes)}
                  selectedItem={link.type}
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
