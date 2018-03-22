import React, { Component } from "react";
import Story from "./Story/Story";
import StoryEditor from "./StoryEditor/StoryEditor";
import { StoryProvider } from "@@/data/StoryContext";

class StoryPlayer extends Component {
  state = { editing: false };
  toggleEditing = () => {
    this.setState({
      ...this.state,
      editing: this.props.editor ? !this.state.editing : false
    });
  };

  componentDidMount() {
    if (this.props.storyData) {
      this.storyData = this.props.storyData;
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
