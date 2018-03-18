import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import "./DeleteButton.scss";

class DeleteButton extends Component {
  state = { aboutToBeDeleted: false };
  deleteSelf = () =>
    this.setState(state => ({ ...state, aboutToBeDeleted: true }));
  confirmDelete = () =>
    this.props.onDeleteConfirmed && this.props.onDeleteConfirmed();
  undelete = e => {
    e.stopPropagation();
    this.setState(state => ({ ...state, aboutToBeDeleted: false }));
  };
  render() {
    return (
      <div
        className={`delete-button${this.props.className &&
          ` ${this.props.className}`}`}
        onClick={this.deleteSelf}
      >
        <FontAwesomeIcon icon="trash" />
        {!this.state.aboutToBeDeleted && (
          <span className="confirm">
            Delete this{this.props.itemName && ` ${this.props.itemName}`}?
          </span>
        )}
        {this.state.aboutToBeDeleted && (
          <span className="confirm">
            Are you sure you want to delete this{this.props.itemName &&
              ` ${this.props.itemName}`}?{" "}
            <span className="confirmLink" onClick={this.confirmDelete}>
              Yes
            </span>{" "}
            <span className="confirmLink" onClick={this.undelete}>
              No
            </span>
          </span>
        )}
      </div>
    );
  }
}

export default DeleteButton;
