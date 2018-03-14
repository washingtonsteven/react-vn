import React, { Component } from "react";
import axios from "axios";
import Story from "./Story/Story";
import StoryEditor from "./StoryEditor/StoryEditor";
import { StoryProvider } from "@@/data/StoryContext";

import "./App.scss";

class App extends Component {
  state = { editing: false };
  toggleEditing = () => {
    this.setState({
      ...this.state,
      editing: !this.state.editing
    });
  };

  componentDidMount() {
    if (!this.props.storyURL) {
      this.setState(state => ({
        ...state,
        error: { msg: "No url for fetching a story provided" }
      }));
      return;
    }

    axios
      .get(this.props.storyURL)
      .then(({ data, status }) => {
        if (data && status === 200) this.storyData = data;
      })
      .catch(error => this.setState(state => ({ ...state, error })))
      .then(() => this.setState(state => ({ ...state, loaded: true })));
  }

  render() {
    if (this.state.error)
      return <pre>{JSON.stringify(this.state.error, null, 1)}</pre>;
    if (!this.state.loaded) return "Loading...";

    return (
      <StoryProvider storyData={this.storyData}>
        <div className="App">
          <div className="edit-toggle">
            <button onClick={this.toggleEditing}>
              {this.state.editing ? "Play" : "Edit"}
            </button>
          </div>
          {this.state.editing ? (
            <StoryEditor onNodeUpdated={this.nodeUpdated} />
          ) : (
            <Story />
          )}
        </div>
      </StoryProvider>
    );
  }
}

export default App;
