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

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <div style={{ display: "inline-block", margin: "25px 0" }}>
            <Link to="/" className="button">
              Home
            </Link>
          </div>
          <Switch>
            <Route path="/story/:storyURL" component={StoryPlayer} />
            <Route exact path="/" component={StoryList} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
