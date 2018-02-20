import React, { Component } from 'react';
import Story from './Story/Story';
import StoryEditor from './StoryEditor/StoryEditor';
import storyData from './data/story.json';

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
    const idx = storyData.nodes.findIndex(n => n.id === node.id);
    if (idx >= 0 && idx < this.state.storyData.nodes.length) {
      this.setState({
        ...this.state,
        storyData:{
          ...this.state.storyData,
          nodes:((arr, i, replacement) => {
            const copy = [...arr];
            copy[i] = replacement;
            return copy;
          })(this.state.storyData.nodes, idx, node)
        }
      });
    }
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
