import React, { Component, Fragment } from 'react';

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
      <Fragment>
        <button className="node-link" onClick={this.nodeLinkClicked}>
          {nodeLink.content || '\u00bb'}
        </button>
        { this.props.children && this.props.children(this.props) }
      </Fragment>
    )
  }
}

export default NodeLink;