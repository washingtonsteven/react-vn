import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "./ErrorMessage.scss";

class ErrorMessage extends React.Component {
  closeError = () => {
    this.props.onClose && this.props.onClose();
  };
  render() {
    return (
      <span className="error-message">
        {this.props.children}{" "}
        <span className="close" onClick={this.closeError}>
          <FontAwesomeIcon icon="times-circle" />
        </span>
      </span>
    );
  }
}

export default ErrorMessage;
