import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";

import StoryList from "./StoryList";
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
  state = { loadedStoryData: null };
  fileUploaded = fileText => {
    try {
      const json = JSON.parse(fileText);
      if (json.nodes) {
        this.setState(
          state => ({ ...state, loadedStoryData: json }),
          () => {
            this.router.history && this.router.history.push("/story/");
          }
        );
      } else {
        throw new Error(`uploaded JSON must have a 'nodes' property.`);
      }
    } catch (e) {
      console.error(e);
    }
  };
  render() {
    return (
      <Router className="App" ref={r => (this.router = r)}>
        <React.Fragment>
          <MenuBar />
          <Switch>
            <Route
              path="/story/:storyURL?"
              render={() => (
                <StoryPlayer
                  debug
                  editor
                  loadedStoryData={this.state.loadedStoryData}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => <StoryList onFileLoaded={this.fileUploaded} />}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
