import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { modalNode } from '@@';
import './Modal.scss';

class Modal extends Component {
  render() {
    return ReactDOM.createPortal((
      <div className="modal">
        {this.props.children()}
      </div>
    ), modalNode);
  }
}

export default Modal;