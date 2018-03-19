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
  render() {
    return (
      <Router className="App">
        <React.Fragment>
          <MenuBar />
          <Switch>
            <Route
              path="/story/:storyURL?"
              render={() => <StoryPlayer debug editor />}
            />
            <Route exact path="/" component={StoryList} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
