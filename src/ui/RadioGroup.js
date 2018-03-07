import React, { Component } from "react";
import { uuid } from "@@/util";

const labelStyle = {
  display: "inline-block",
  padding: "5px 25px",
  backgroundColor: "#ccc",
  position: "relative",
  fontWeight: "bold",
  cursor: "pointer"
};

const selectedLabelStyle = {
  ...labelStyle,
  backgroundColor: "#999"
};

const radioButtonStyle = {
  position: "absolute",
  left: "-9999px"
};

class RadioGroup extends Component {
  state = { selected: this.props.options[0], name: uuid() };
  changeSelection = e =>
    this.setState({ ...this.state, selected: e.target.value }, this.emitChange);
  emitChange = () =>
    this.props.onChange && this.props.onChange(this.state.selected);
  render() {
    const { title, options } = this.props;
    return (
      <div className="radio-group">
        {title || ""}
        <form>
          {options.map &&
            options.map((o, i) => (
              <label
                htmlFor={`radiogrp-${o}-${this.state.name}`}
                key={btoa(`${i}-${o}`)}
                style={
                  this.state.selected === o ? selectedLabelStyle : labelStyle
                }
              >
                <input
                  type="radio"
                  name={`radiogrp-${this.state.name}`}
                  id={`radiogrp-${o}-${this.state.name}`}
                  value={o}
                  checked={this.state.selected === o}
                  onChange={this.changeSelection}
                  style={radioButtonStyle}
                />
                {o}
              </label>
            ))}
        </form>
      </div>
    );
  }
}

export default RadioGroup;
