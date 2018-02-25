import React, { Component } from 'react';
import { excerpt } from '@@/util';

import "./NodeList.scss";

const NodeListItem = props => (
  <div className="node" onClick={() => props.onClick(props.node)}>
    {props.node.id} - {excerpt(props.node.content)}
  </div>
);

class NodeList extends Component {
  constructor(props) {
    super(props);

    this.onNodeClick = this.onNodeClick.bind(this);
  }
  onNodeClick(node){
    this.props.onNodeSelected && this.props.onNodeSelected(node)
  }

  render() {
    return(
      <div className="node-list">
        {this.props.list.map(n => <NodeListItem node={n} onClick={this.onNodeClick} key={btoa(`${n.id}-${n.content}`)} />)}
      </div>
    );
  }
}

export default NodeList;