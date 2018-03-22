import React from "react";
import TextScroll from "@@/ui/TextScroll";

import "./NodeContent.scss";

const NodeContent = props => (
  <div className="node-content" style={{ minHeight: "90px" }}>
    <TextScroll>{props.content}</TextScroll>
  </div>
);

export default NodeContent;
