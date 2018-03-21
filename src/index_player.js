import React from "react";
import ReactDOM from "react-dom";
import StoryPlayer from "./StoryPlayer";
import axios from "axios";

class PlayerApp extends React.Component {
  state = { loaded: false };
  componentDidMount() {
    axios.get("data/story.json").then(({ data, status }) => {
      if (data && status === 200) {
        this.storyData = data;
        this.setState({ loaded: true });
      }
    });
  }
  render() {
    if (!this.state.loaded) return "Loading...";

    return <StoryPlayer storyData={this.storyData} />;
  }
}

ReactDOM.render(<PlayerApp />, document.getElementById("root"));
