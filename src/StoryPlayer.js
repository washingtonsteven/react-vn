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

  render() {
    return (
      <div className="story-player">
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
          <Story debug={this.props.debug} />
        )}
      </div>
    );
  }
}

const StoryPlayerWithProvider = props => (
  <StoryProvider storyData={props.storyData}>
    <StoryPlayer {...props} />
  </StoryProvider>
);

export default StoryPlayerWithProvider;
export const StoryPlayerWithoutProvider = StoryPlayer;
