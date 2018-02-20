import React, { Component } from 'react';
import NodeList from './NodeList';
import NodeEditor from './NodeEditor';

const ExportButton = props => (
  <a 
    id="menu-export" 
    href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(props.data))}`}
    download='story.json'
  >
    Export
  </a>
)

class StoryEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onNodeSelected = this.onNodeSelected.bind(this);
    this.exitNodeEditor = this.exitNodeEditor.bind(this);
  }

  onNodeSelected(node) {
    this.setState({
      ...this.state,
      editing:true,
      currentNode:node
    });
  }

  exitNodeEditor() {
    this.setState({
      ...this.state,
      editing:false,
      currentNode:null
    });
  }

  render() {
    return(
      <div className="editor">
        <div className="menu">
          <ExportButton data={this.props.storyData} />
        </div>
        {
          this.state.editing && this.state.currentNode ?
          <NodeEditor node={this.state.currentNode} onExit={this.exitNodeEditor} onUpdate={node => { this.props.onNodeUpdated && this.props.onNodeUpdated(node) }} /> :
          <NodeList list={this.props.storyData.nodes} onNodeSelected={this.onNodeSelected} />
        }
      </div>
    )
  }
}

export default StoryEditor;