import React, { PureComponent } from "react";
import Typing from "react-typing-animation";
import "./TextScroll.scss";
import { processShortcodes } from "@@/util";

const speeds = {
  INSTANT: 0,
  FAST: 10,
  SLOW: 50
};

class TextScroll extends PureComponent {
  state = { speed: speeds.FAST };
  render() {
    return (
      <div>
        <Typing
          key={this.props.children}
          speed={this.state.speed}
          cursor={null}
        >
          {processShortcodes(this.props.children)}
        </Typing>
      </div>
    );
  }
}

export default TextScroll;
