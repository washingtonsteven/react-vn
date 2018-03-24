import React from "react";

class ShortcodeEditor extends React.Component {
  onTagChanged = e => {
    const newShortcode = { ...this.props.shortcode, tag: e.target.value };
    this.props.onShortcodeUpdated &&
      this.props.onShortcodeUpdated(newShortcode, this.props.shortcodeIndex);
  };
  addNewStyle = () => {
    const newShortcode = {
      ...this.props.shortcode,
      style: { ...this.props.shortcode.style, newProperty: "newValue" }
    };
    this.props.onShortcodeUpdated &&
      this.props.onShortcodeUpdated(newShortcode, this.props.shortcodeIndex);
  };
  onStyleChanged(e, styleProp, index) {
    const newStyle = Object.entries({ ...this.props.shortcode.style });
    newStyle[index] =
      styleProp === "property"
        ? [e.target.value, newStyle[index][1]]
        : [newStyle[index][0], e.target.value];
    const newStyleObj = newStyle.reduce((acc, v, i) => {
      acc[v[0]] = v[1];
      return acc;
    }, {});
    const newShortcode = { ...this.props.shortcode, style: newStyleObj };
    this.props.onShortcodeUpdated &&
      this.props.onShortcodeUpdated(newShortcode, this.props.shortcodeIndex);
  }
  render() {
    const { shortcode: { tag, style } } = this.props;
    return (
      <div className="shortcode-editor">
        <label htmlFor="shortcode-tag">
          <span>Shortcode Tag</span>
          <input
            type="text"
            defaultValue={tag}
            id="shortcode-tag"
            onChange={this.onTagChanged}
          />
        </label>
        {style &&
          Object.entries(style).map(([property, value], i) => (
            <div className="shortcode-style-editor" key={i}>
              <label htmlFor="shortcode-style-property">
                <span>Shortcode Style Property</span>
                <input
                  type="text"
                  defaultValue={property}
                  id="shortcode-style-property"
                  onChange={e => this.onStyleChanged(e, "property", i)}
                />
              </label>
              <label htmlFor="shortcode-style-value">
                <span>Shortcode Style value</span>
                <input
                  type="text"
                  defaultValue={value}
                  id="shortcode-style-value"
                  onChange={e => this.onStyleChanged(e, "value", i)}
                />
              </label>
            </div>
          ))}
        <button onClick={this.addNewStyle}>Add New Style</button>
      </div>
    );
  }
}

export default ShortcodeEditor;
