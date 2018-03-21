import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./TextScroll.scss";

class TextScroll extends PureComponent {
  state = { animating: true };
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ animating: false }, () =>
        setTimeout(() => this.setState({ animating: true }), 1)
      );
    }
  }
  render() {
    return (
      <span
        className={`text-scroll ${
          this.state.animating ? "run-animation" : "hide"
        }`}
        style={{ width: `${this.props.children.length}em` }}
        dangerouslySetInnerHTML={{ __html: this.props.children }}
      />
    );
  }
}

TextScroll.propTypes = {
  children: PropTypes.string
};

export default TextScroll;
