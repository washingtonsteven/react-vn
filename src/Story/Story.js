import React, { Component } from 'react';
import './Story.scss';

import NodeLink from './NodeLink';

const errorNode = {
  content:'there\'s been an error.',
  error:true
}

class Story extends Component {
  constructor(props) {
    super(props);

    this.goToNode = this.goToNode.bind(this);

    if (props.storyData) {
      const rootNode = this.props.storyData.nodes.find(v => v.root);
      this.state = {
        rootNode,
        currentNode:rootNode,
        keyedNodes:{
          [rootNode.id]:rootNode
        }
      }
    }
  }

  getNode(id) {
    return new Promise((resolve, reject) => {
      if (this.state.keyedNodes && this.state.keyedNodes[id]) {
        return resolve(this.state.keyedNodes[id]);
      }

      const foundNode = this.props.storyData.nodes.find(v => v.id === id);
      if (foundNode) {
        this.setState({
          ...this.state,
          keyedNodes:{
            ...this.state.keyedNodes,
            [foundNode.id]:foundNode
          }
        }, () => { resolve(foundNode); });
      } else {
        // can't find it ¯\_(ツ)_/¯
        reject();
      }
    });
  }

  goToNode(nodeLink) {
    if (nodeLink.type === "input" && nodeLink.targetVariable) {
      this.setState({
        ...this.state,
        customData:{
          ...this.state.customData || {},
          [nodeLink.targetVariable]:nodeLink.inputValue
        }
      }, () => this.followNodeLink(nodeLink));
    } else {
      this.followNodeLink(nodeLink);
    }
  }

  followNodeLink(nodeLink) {
    this.getNode(nodeLink.node)
      .then(currentNode => {
        this.setState({
          ...this.state,
          currentNode
        })
      })
      .catch(() => {
        this.setState({
          ...this.state,
          currentNode:null
        });
      });
  }

  render() {
    const currentNode = this.state.currentNode || errorNode;

    return (
      <div className="story">
        <div className="node">
          <div className="node-content">
            {currentNode.content}
          </div>
          <div className="node-links">
            {
              currentNode.next ?
              currentNode.next.map(n => <NodeLink nodeLink={n} nodeClicked={this.goToNode} key={btoa(`${n.node}-${n.content}`)} />)
              : <NodeLink restart nodeClicked={() => this.goToNode({node:this.state.rootNode.id})} />
            }
          </div>
        </div>
        <div className="debug">
          <pre>
            {JSON.stringify(currentNode, null, 1)}
          </pre>
        </div>
      </div>
    )
  }
}

export default Story;