import React, { Component } from "react";
import Story from "./Story/Story";
import StoryEditor from "./StoryEditor/StoryEditor";
import { StoryProvider } from "@@/data/StoryContext";
import { toCSS } from "@@/util";

class StoryPlayer extends Component {
  state = { editing: false };
  toggleEditing = () => {
    this.setState({
      ...this.state,
      editing: this.props.editor ? !this.state.editing : false
    });
  };

  injectStyles(shortcodes) {
    const s = document.createElement("style");
    s.innerText = shortcodes.reduce((acc, v) => {
      return `${acc} .${v.tag}{${toCSS(v.style)}}`;
    }, "");
    document.getElementsByTagName("head")[0].appendChild(s);
  }

  componentDidMount() {
    if (this.props.storyData) {
      this.storyData = this.props.storyData;
      this.injectStyles(this.props.storyData.meta.shortcodes);
      this.setState(state => ({ ...state, loaded: true }));
    } else {
      throw new Error(
        "Required prop 'storyData' not given to StoryPlayer Component"
      );
    }
  }

  render() {
    if (!this.state.loaded) return <div>Loading...</div>;

    return (
      <StoryProvider storyData={this.storyData} debug={this.props.debug}>
        <div className="App">
          {this.props.editor && (
            <div
              className={`edit-toggle ${this.state.editing ? "edit" : "play"}`}
            >
              <button onClick={this.toggleEditing}>
                {this.state.editing ? "Play" : "Edit"}
              </button>
            </div>
          )}
          {this.state.editing && this.props.editor ? (
            <StoryEditor />
          ) : (
            <Story />
          )}
        </div>
      </StoryProvider>
    );
  }
}

export default StoryPlayer;
