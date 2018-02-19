import React, { Component } from 'react';
import './Story.scss';

const errorNode = {
  content:'there\'s been an error.',
  error:true
}

const restartNodeLink = {
  content:'Restart'
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

  goToNode(e) {
    this.getNode(e.target.dataset.nodeLinkId)
      .then(currentNode => {
        this.setState({
          ...this.state,
          currentNode
        })
      });
  }

  renderNodeLink(nodeLink) {
    if (!nodeLink.node) nodeLink.node = this.state.rootNode.id;

    return (
      <button className="node-link" onClick={this.goToNode} data-node-link-id={nodeLink.node} key={btoa(`${nodeLink.node}-${nodeLink.content}`)}>
        {nodeLink.content}
      </button>
    );
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
              currentNode.next.map(n => this.renderNodeLink(n))
              : this.renderNodeLink(restartNodeLink)
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