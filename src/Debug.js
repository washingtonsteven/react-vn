import React, { Component } from "react";

const debugStyle = {
  backgroundColor: "rgba(255,183,0,0.4)",
  color: "#ff4542",
  padding: "25px",
  display: "inline-block",
  borderRadius: "0.3rem",
  boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
};

class Debug extends Component {
  state = { show: false };
  toggleShow() {
    this.setState(state => ({ show: !state.show }));
  }
  render() {
    return (
      <div
        className="debug"
        style={this.state.show ? debugStyle : { padding: "25px" }}
      >
        <button
          style={{ fontSize: "0.75rem" }}
          onClick={() => this.toggleShow()}
        >
          {this.state.show ? "hide" : "show"} debug
        </button>
        {this.state.show && (
          <div className="debug-content">{this.props.children(this.state)}</div>
        )}
      </div>
    );
  }
}

export default Debug;
