import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { modalNode } from '@@';

class InputModal extends Component {
  constructor(props) {
    super(props);

    this.onInputComplete = this.onInputComplete.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  onInputComplete() {
    this.props.onInputComplete && this.props.onInputComplete(this.state.inputValue);
  }

  updateInput(e) {
    this.setState({
      ...this.state,
      inputValue:e.target.value
    });
  }

  render() {
    const modal = (
      <div className="input-modal">
        <span className="prompt">{this.props.nodeLink.prompt}</span>
        <input type="text" onChange={this.updateInput} />
        <button onClick={this.onInputComplete}>Submit</button>
      </div>
    );

    return ReactDOM.createPortal(modal, modalNode);
  }
}

export default InputModal;