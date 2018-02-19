import React, { Component } from 'react';

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
    return (
      <div className="input-modal">
        <input type="text" onChange={this.updateInput} />
        <button onClick={this.onInputComplete}>Submit</button>
      </div>
    )
  }
}

export default InputModal;