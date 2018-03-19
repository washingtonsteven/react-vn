import React from "react";
import ReactDOM from "react-dom";
import { StoryPlayerNoRouting as StoryPlayer } from "./StoryPlayer";

class PlayerApp extends React.Component {
  render() {
    return <StoryPlayer storyURL="data/story.json" />;
  }
}

ReactDOM.render(<PlayerApp />, document.getElementById("root"));
