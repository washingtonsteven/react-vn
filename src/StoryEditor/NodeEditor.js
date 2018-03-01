import React, { Component } from 'react';
import './NodeEditor.scss';

import NodeLinkEditor from './NodeLinkEditor';

class NodeEditor extends Component {
  constructor(props) {
    super(props);

    this.onLinkChange = this.onLinkChange.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.addBlankNodeLink = this.addBlankNodeLink.bind(this);

    this.state = {
      node:props.node
    }
  }
  
  onLinkChange(linkIndex, link) {
    this.setState(prevState => {
      const next = [...this.state.node.next || []];
      next[linkIndex] = link;
      return {
        ...prevState,
        node: {
          ...prevState.node,
          next
        }
      }
    });
  }

  addBlankNodeLink() {
    const idx = this.state.node.next ? this.state.node.next.length : 0;
    this.onLinkChange(idx, {content:"", node:""});
  }

  onIdChange(e) {
    this.setState({
      ...this.state,
      node:{
        ...this.state.node,
        id:e.target.value
      }
    });
  }

  onContentChange(e) {
    this.setState({
      ...this.state,
      node:{
        ...this.state.node,
        content:e.target.value
      }
    })
  }

  render() {
    return (
      <div className="node-editor">
        <input type="text" className="node-id" value={this.state.node.id} onChange={this.onIdChange} readOnly />
        <textarea onChange={this.onContentChange} value={this.state.node.content}></textarea>
        {
          this.state.node && this.state.node.next &&
          this.state.node.next.map((link, i) => <NodeLinkEditor link={link} storyData={this.props.storyData} linkIndex={i} onChange={this.onLinkChange} key={btoa(`${i}`)} />)
        }
        <button onClick={this.addBlankNodeLink}>Add New Link</button>
        <button onClick={() => { this.props.onUpdate && this.props.onUpdate(this.state.node) }}>Save & Continue</button>
        <button onClick={() => { this.props.onUpdate && this.props.onUpdate(this.state.node); this.props.onExit && this.props.onExit() }}>Save & Quit</button>
        <button onClick={() => { this.props.onExit && this.props.onExit() }}>Back to List</button>
      </div>
    );
  }
}

export default NodeEditor;