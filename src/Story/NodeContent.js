import React from "react";
import TextScroll from "@@/TextScroll";
import { processShortcodes } from "@@/util";

import "./NodeContent.scss";

const NodeContent = props => (
  <div className="node-content" style={{ minHeight: "90px" }}>
    <TextScroll>{processShortcodes(props.content)}</TextScroll>
  </div>
);

export default NodeContent;
