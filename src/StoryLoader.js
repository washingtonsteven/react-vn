import React, { Component } from "react";
import JSONFileInput from "./ui/JSONFileInput";

class StoryLoader extends Component {
  state = { jsonURL: "data/story.json" };

  fileSelected = file => {
    this.props.onFileLoaded && this.props.onFileLoaded(file);
  };

  loadFile = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onFilePathSet && this.props.onFilePathSet(this.state.jsonURL);
  };

  setFilePath = e => {
    const jsonURL = e.target.value;
    this.setState(state => ({ ...state, jsonURL }));
  };

  render() {
    return (
      <div>
        {!process.env.REACT_APP_IS_PLAYER && (
          <button onClick={this.props.onNew}>New Story</button>
        )}
        <div>
          <JSONFileInput onFileSelected={this.fileSelected} />
        </div>
        <div>
          <form onSubmit={this.loadFile}>
            <input
              type="text"
              placeholder="JSON url or serverpath"
              value={this.state.jsonURL}
              onChange={this.setFilePath}
            />
            <button>Load!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default StoryLoader;
