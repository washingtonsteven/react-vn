import React, { Component } from "react";
import Modal from "@@/Modal";

import "./InputModal.scss";

class InputModal extends Component {
  constructor(props) {
    super(props);

    this.onInputComplete = this.onInputComplete.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  onInputComplete(e) {
    e.preventDefault(); // stop form submission
    this.props.onInputComplete &&
      this.props.onInputComplete(this.state.inputValue);
  }

  updateInput(e) {
    this.setState({
      ...this.state,
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <Modal>
        {() => (
          <div className="input-modal">
            <form onSubmit={this.onInputComplete}>
              <input
                type="text"
                autoFocus
                onChange={this.updateInput}
                placeholder={this.props.nodeLink.prompt}
              />
              <button type="button" onClick={this.onInputComplete}>
                Submit
              </button>
            </form>
          </div>
        )}
      </Modal>
    );
  }
}

export default InputModal;
