import React, { Component, Fragment } from 'react';

const restartNodeLink = {
  content:'Restart',
  restart:true
}

class NodeLink extends Component {
  onClick = () => {
    this.props.onClick && this.props.onClick({ ...this.props.nodeLink, restart:this.props.restart });
  }

  render() {
    const nodeLink = this.props.restart ? restartNodeLink : this.props.nodeLink || {};

    return (
      <Fragment>
        <button className="node-link" onClick={this.onClick}>
          {nodeLink.content || '\u00bb'}
        </button>
        { this.props.children && this.props.children(this.props) }
      </Fragment>
    )
  }
}

export default NodeLink;