import React, { Component } from "react";
import NodeLink from "@@/Story/NodeLink";
import InputModal from "./InputModal";

class InputNodeLink extends Component {
  state = {};

  onClick = () => {
    this.setState({
      showInput: true
    });
  };

  inputModalComplete = inputValue => {
    this.setState(
      {
        ...this.state,
        showInput: false
      },
      () => this.followNodeLink(inputValue)
    );
  };

  followNodeLink(inputValue) {
    this.props.onClick &&
      this.props.onClick({ ...this.props.nodeLink, inputValue });
  }

  render() {
    return (
      <NodeLink onClick={this.onClick} nodeLink={this.props.nodeLink}>
        {() =>
          this.state.showInput && (
            <InputModal
              onInputComplete={this.inputModalComplete}
              nodeLink={this.props.nodeLink}
            />
          )
        }
      </NodeLink>
    );
  }
}

export default InputNodeLink;
