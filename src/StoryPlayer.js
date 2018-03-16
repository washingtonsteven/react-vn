import React, { Component } from "react";
import axios from "axios";
import Story from "./Story/Story";
import StoryEditor from "./StoryEditor/StoryEditor";
import { StoryProvider } from "@@/data/StoryContext";
import { withRouter } from "react-router-dom";

class StoryPlayer extends Component {
  state = { editing: false };
  toggleEditing = () => {
    this.setState({
      ...this.state,
      editing: !this.state.editing
    });
  };

  componentDidMount() {
    const storyPath =
      this.props.storyURL ||
      (this.props.match &&
        this.props.match.params &&
        this.props.match.params.storyURL);

    if (!storyPath) {
      this.storyData = { nodes: [] };
      this.setState(state => ({ ...state, loaded: true }));
    } else {
      axios
        .get(`/${decodeURIComponent(storyPath)}`)
        .then(({ data, status }) => {
          if (data && status === 200) this.storyData = data;
        })
        .catch(error => this.setState(state => ({ ...state, error })))
        .then(() => this.setState(state => ({ ...state, loaded: true })));
    }
  }

  render() {
    if (this.state.error)
      return <pre>{JSON.stringify(this.state.error, null, 1)}</pre>;
    if (!this.state.loaded) return <div>Loading...</div>;

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

export default withRouter(StoryPlayer);
