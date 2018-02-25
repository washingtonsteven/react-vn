import React, { Component, Fragment } from 'react';
import NodeList from './NodeList';
import NodeEditor from './NodeEditor';

import { generateId } from '@@/util';

import "./StoryEditor.scss";

const blankNode = {
  content:"",
  next:[]
}

const ExportButton = props => (
  <a 
    id="menu-export" 
    href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(props.data, null, 1))}`}
    download='story.json'
    className="button"
    role="button"
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
          <NodeEditor node={this.state.currentNode} storyData={this.props.storyData} onExit={this.exitNodeEditor} onUpdate={node => { this.props.onNodeUpdated && this.props.onNodeUpdated(node) }} /> :
          <Fragment>
            <NodeList list={this.props.storyData.nodes} onNodeSelected={this.onNodeSelected} />
            <button onClick={() => this.props.onNodeUpdated && this.props.onNodeUpdated({...blankNode, id:generateId()})}>Add New Node</button>
          </Fragment>
        }
      </div>
    )
  }
}

export default StoryEditor;