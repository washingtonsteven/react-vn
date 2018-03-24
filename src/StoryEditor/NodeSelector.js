import React from "react";
import Downshift from "downshift";
import { excerpt } from "@@/util";

import "./NodeSelector.scss";

class NodeSelector extends React.Component {
  itemSelected = selectedItem => {
    this.props.onChange && this.props.onChange(selectedItem);
  };
  render() {
    const { nodes, selectedNode } = this.props;
    return (
      <Downshift
        itemToString={i => (i ? `${i.id} - ${excerpt(i.content)}` : "")}
        onChange={this.itemSelected}
        selectedItem={selectedNode || undefined}
        render={({
          getInputProps,
          isOpen,
          getItemProps,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div className="node-selector">
            <label htmlFor="node-selector-input">
              <span>Target Node</span>
              <input
                {...getInputProps({
                  placeholder: "Type to search for a node..."
                })}
                id="node-selector-input"
                onClick={e => e.target.select()}
                type="text"
              />
            </label>
            {isOpen && (
              <div className="node-selector-list">
                {nodes
                  .filter(
                    n =>
                      !inputValue ||
                      n.content
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      n.id.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((n, i) => (
                    <div
                      {...getItemProps({ item: n })}
                      key={n.id}
                      className={`node-selector-item ${
                        highlightedIndex === i ? "highlighted" : ""
                      } ${
                        selectedItem && selectedItem.id === n.id
                          ? "selected"
                          : ""
                      }`}
                    >
                      {n.id} - {excerpt(n.content)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      />
    );
  }
}

export default NodeSelector;
