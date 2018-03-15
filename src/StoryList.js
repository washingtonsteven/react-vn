import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class StoryList extends Component {
  state = {};
  componentDidMount() {
    axios
      .get("/data/stories.json")
      .then(({ data, status }) => {
        this.storyList = data;
        this.setState(state => ({ ...state, loaded: true }));
      })
      .catch(error => this.setState(state => ({ ...state, error })));
  }

  render() {
    if (!this.state.loaded || !this.storyList)
      return <div>Loading stories...</div>;

    return (
      <div>
        {this.storyList.stories.map(s => (
          <div key={btoa(`${s.path}`)}>
            <Link
              to={`/story/${encodeURIComponent(s.path)}`}
              className="button"
            >
              {s.title} - {s.path}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default StoryList;
