import React, { Component, Fragment } from 'react';
import InputModal from './InputModal';

const restartNodeLink = {
  content:'Restart'
}

class NodeLink extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.nodeClicked = this.nodeClicked.bind(this);
    this.nodeInputComplete = this.nodeInputComplete.bind(this);
  }

  nodeClicked() {
    if (this.props.nodeLink.type === "input") {
      this.setState({
        ...this.state,
        showInput:true
      });
    } else {
      this.followNodeLink();
    }
  }

  followNodeLink(additionalData = {}) {
    this.props.nodeClicked && this.props.nodeClicked({...this.props.nodeLink, ...additionalData});
  }

  nodeInputComplete(inputValue) {
    this.setState({
      ...this.state,
      showInput:false
    }, () => this.followNodeLink({ inputValue }));
  }

  render() {
    const nodeLink = this.props.restart ? restartNodeLink : this.props.nodeLink || {};
    return (
      <Fragment>
        <button className="node-link" onClick={this.nodeClicked}>
          {nodeLink.content}
        </button>
        {
          nodeLink.type === "input" && this.state.showInput ?
          <InputModal onInputComplete={this.nodeInputComplete} nodeLinkData={this.props.nodeLink} />
          : null
        }
      </Fragment>
    )
  }
}

export default NodeLink;