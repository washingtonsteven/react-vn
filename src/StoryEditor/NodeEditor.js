import React, { Component } from 'react';

const NodeLinkEditor = props => (
  <div className="node-link">
    <input type="text" defaultValue={props.link.content} onChange={(e) => props.onChange(props.linkIndex, {...props.link, content:e.target.value})} />
    <input type="text" defaultValue={props.link.node} onChange={(e) => props.onChange(props.linkIndex, {...props.link, node:e.target.value})} />
  </div>
);

class NodeEditor extends Component {
  constructor(props) {
    super(props);

    this.onLinkChange = this.onLinkChange.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.state = {
      node:props.node
    }
  }
  
  onLinkChange(linkIndex, link) {
    this.setState({
      ...this.state,
      node:{
        ...this.state.node,
        next:((arr, i, replacement) => {
          const copy = [...arr];
          copy[i] = replacement;
          return copy;
        })(this.state.node.next, linkIndex, link)
      }
    })
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
        <input type="text" value={this.state.node.id} onChange={this.onIdChange} readOnly />
        <textarea onChange={this.onContentChange} value={this.state.node.content}></textarea>
        {
          this.state.node && this.state.node.next &&
          this.state.node.next.map((link, i) => <NodeLinkEditor link={link} linkIndex={i} onChange={this.onLinkChange} key={btoa(`${i}`)} />)
        }
        <button onClick={() => { this.props.onUpdate && this.props.onUpdate(this.state.node) }}>Save</button>
        <button onClick={() => { this.props.onExit && this.props.onExit() }}>Back to List</button>
      </div>
    );
  }
}

export default NodeEditor;