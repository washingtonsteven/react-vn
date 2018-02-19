import React, { Component } from 'react';

const restartNodeLink = {
  content:'Restart',
  restart:true
}

class NodeLink extends Component {
  constructor(props) {
    super(props);

    this.nodeLinkClicked = this.nodeLinkClicked.bind(this);
  }

  nodeLinkClicked() {
    this.props.nodeLinkClicked && this.props.nodeLinkClicked({ ...this.props.nodeLink, restart:this.props.restart });
  }

  render() {
    const nodeLink = this.props.restart ? restartNodeLink : this.props.nodeLink || {};
    return (
      <button className="node-link" onClick={this.nodeLinkClicked}>
        {nodeLink.content}
      </button>
    )
  }
}

export default NodeLink;