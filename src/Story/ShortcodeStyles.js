import React from "react";
import ReactDOM from "react-dom";
import { toCSS } from "@@/util";
import { styleNode } from "@@";

class ShortcodeStyles extends React.Component {
  render() {
    if (!this.props.shortcodes) return "";

    const styleContent = this.props.shortcodes.reduce((acc, v) => {
      return `${acc} .${v.tag}{${toCSS(v.style)}}`;
    }, "");

    return ReactDOM.createPortal(<style>{styleContent}</style>, styleNode);
  }
}

export default ShortcodeStyles;
