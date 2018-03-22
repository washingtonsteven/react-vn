import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import axios from "axios";

import StoryLoader from "./StoryLoader";
import StoryPlayer from "./StoryPlayer";

import "./App.scss";

const MenuBar = () => (
  <nav className="menu-bar">
    <h1>React VN</h1>
    <div className="menu">
      <ul>
        <li>
          <Link to="/" className="button">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

class App extends Component {
  state = { storyData: null };
  loadFile = url => {
    axios.get(url).then(({ data, status }) => {
      if (data && status === 200) this.fileUploaded(data);
    });
  };
  fileUploaded = json => {
    if (json.nodes) {
      this.setState(
        state => ({ ...state, storyData: json }),
        () => this.router.history && this.router.history.push("/story")
      );
    } else {
      throw new Error(`Supplied JSON must have a 'nodes' property.`);
    }
  };
  startNewStory = () => {
    this.setState(
      state => ({ ...state, storyData: { nodes: [] } }),
      () => this.router.history && this.router.history.push("/story")
    );
  };
  render() {
    const playerProps = {
      debug: !process.env.REACT_APP_IS_PLAYER,
      editor: !process.env.REACT_APP_IS_PLAYER
    };

    return (
      <Router className="App" ref={r => (this.router = r)}>
        <React.Fragment>
          <MenuBar />
          <Switch>
            <Route
              path="/story/"
              render={() =>
                this.state.storyData ? (
                  <StoryPlayer
                    {...playerProps}
                    storyData={this.state.storyData}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/"
              render={() => (
                <StoryLoader
                  onFileLoaded={this.fileUploaded}
                  onFilePathSet={this.loadFile}
                  onNew={this.startNewStory}
                />
              )}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
