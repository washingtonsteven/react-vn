import React, { Component } from "react";
import { excerpt } from "@@/util";

import "./NodeList.scss";

const NodeListItem = props => (
  <div
    className={`node ${props.className ? props.className : ""}`}
    onClick={() => props.onClick && props.onClick(props.node)}
    style={props.style || {}}
  >
    <span>
      <span className="prefix">ID:</span> {props.node.id}
    </span>
    <span>
      <span className="prefix">Excerpt:</span> {excerpt(props.node.content)}
    </span>
    <span>
      <span className="prefix">Exits:</span>
      {typeof props.node.next === "string"
        ? props.node.next
        : props.node.next && props.node.next.map(nl => nl.node).join(",")}
    </span>
  </div>
);

class NodeList extends Component {
  constructor(props) {
    super(props);

    this.onNodeClick = this.onNodeClick.bind(this);
  }
  onNodeClick(node) {
    this.props.onNodeSelected && this.props.onNodeSelected(node);
  }

  render() {
    return (
      <div className="node-list">
        <NodeListItem
          node={{ id: "ID", content: "Excerpt", next: "Exits" }}
          style={{ cursor: "default", borderColor: "transparent" }}
          className="header"
        />
        {this.props.list &&
          this.props.list.map &&
          this.props.list.map(n => (
            <NodeListItem
              node={n}
              onClick={this.onNodeClick}
              key={btoa(`${n.id}-${n.content}`)}
            />
          ))}
      </div>
    );
  }
}

export default NodeList;
