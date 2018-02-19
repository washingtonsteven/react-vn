import React, { Component } from 'react';
import Story from './Story/Story';
import storyData from './data/story.json';

class App extends Component {
  render() {
    const storyProps = { 
      storyData 
    };

    return (
      <div className="App">
        <Story {...storyProps}  />
      </div>
    );
  }
}

export default App;
