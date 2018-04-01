import React from "react";

class NodeImage extends React.Component {
  render() {
    return (
      <div>
        <img src={`data/${this.props.path}`} style={{ maxWidth: "100%" }} />
      </div>
    );
  }
}

export default NodeImage;
