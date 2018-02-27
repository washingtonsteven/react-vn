import React from 'react';
import ReactDOM from 'react-dom';
import { modalNode } from '@@';
import './Modal.scss';

const Modal = (props) => ReactDOM.createPortal((
  <div className="modal">
    {props.children()}
  </div>
), modalNode);

export default Modal;