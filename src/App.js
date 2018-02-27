import React, { Component } from 'react';
import Story from './Story/Story';
import StoryEditor from './StoryEditor/StoryEditor';
import storyData from './data/story.json';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storyData
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.nodeUpdated = this.nodeUpdated.bind(this);
  }

  toggleEditing() {
    this.setState({
      ...this.state,
      editing:!this.state.editing
    });
  }

  nodeUpdated(node) {
    let idx = this.state.storyData.nodes.findIndex(n => n.id === node.id);

    if ((!idx && idx !== 0) || idx < 0) idx = this.state.storyData.nodes.length;

    this.setState(prevState => {
      const nodes = [...prevState.storyData.nodes];
      nodes[idx] = node;
      return {
        ...prevState,
        storyData:{
          ...prevState.storyData,
          nodes
        }
      }
    });
  }

  render() {
    const storyProps = { 
      storyData:this.state.storyData 
    };

    return (
      <div className="App">
        <div className="edit-toggle">
          <button onClick={this.toggleEditing}>{this.state.editing ? 'Play' : 'Edit'}</button>
        </div>
        {
          this.state.editing ?
          <StoryEditor {...storyProps} onNodeUpdated={this.nodeUpdated} /> :
          <Story {...storyProps} />
        }
      </div>
    );
  }
}

export default App;
