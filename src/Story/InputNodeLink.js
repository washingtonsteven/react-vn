import React, { Component } from 'react';
import NodeLink from './NodeLink';
import InputModal from './InputModal';

class InputNodeLink extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    this.nodeLinkClicked = this.nodeLinkClicked.bind(this);
    this.inputModalComplete = this.inputModalComplete.bind(this);
  }

  nodeLinkClicked() {
    this.setState({
      showInput:true
    });
  }

  inputModalComplete(inputValue) {
    this.setState({
      ...this.state,
      showInput:false
    }, () => this.followNodeLink(inputValue));
  }

  followNodeLink(inputValue) {
    this.props.nodeLinkClicked && this.props.nodeLinkClicked({ ...this.props.nodeLink, inputValue });
  }

  render() {
    return (
      <NodeLink nodeLinkClicked={this.nodeLinkClicked} nodeLink={this.props.nodeLink}>
        {() => this.state.showInput && <InputModal onInputComplete={this.inputModalComplete} nodeLink={this.props.nodeLink} />}
      </NodeLink>
    )
  }
}

export default InputNodeLink;