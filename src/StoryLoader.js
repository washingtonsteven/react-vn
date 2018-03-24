import React, { Component } from "react";
import JSONFileInput from "./ui/JSONFileInput";
import "./StoryLoader.scss";
import ErrorMessage from "@@/ui/ErrorMessage";

class StoryLoader extends Component {
  state = { jsonURL: "data/story.json" };

  fileSelected = json => {
    if (!json.nodes) {
      this.setState(state => ({
        ...state,
        error: "Supplied JSON must have a `nodes` property"
      }));
    } else if (!json.meta) {
      this.setState(state => ({
        ...state,
        error: "Supplies JSON must have a `meta` property"
      }));
    } else {
      this.props.onFileLoaded && this.props.onFileLoaded(json);
    }
  };

  loadFile = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onFilePathSet && this.props.onFilePathSet(this.state.jsonURL);
  };

  onLoadError = error => {
    this.setState(state => ({ ...state, error: error.message }));
  };

  setFilePath = e => {
    const jsonURL = e.target.value;
    this.setState(state => ({ ...state, jsonURL }));
  };

  clearError = () => this.setState(state => ({ ...state, error: null }));

  render() {
    return (
      <div className="story-loader">
        {!process.env.REACT_APP_IS_PLAYER && (
          <React.Fragment>
            <button onClick={this.props.onNew}>New Story</button>
            <div className="separator">Or</div>
          </React.Fragment>
        )}
        <div>
          <label htmlFor="story-file-loader">
            <span>Upload a .json story file</span>
            <JSONFileInput
              onFileSelected={this.fileSelected}
              onError={this.onLoadError}
              name="story-file-loader"
            />
          </label>
          {this.state.error && (
            <ErrorMessage onClose={this.clearError}>
              {this.state.error}
            </ErrorMessage>
          )}
        </div>
        <div className="separator">Or</div>
        <div>
          <form onSubmit={this.loadFile}>
            <label htmlFor="url-loader">
              <span>Enter a URL for a .json story file</span>
              <input
                type="text"
                placeholder="JSON url or serverpath"
                value={this.state.jsonURL}
                onChange={this.setFilePath}
                id="url-loader"
                name="url-loader"
              />
            </label>
            <button>Load!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default StoryLoader;
