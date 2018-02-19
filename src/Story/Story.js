import React, { Component } from 'react';
import './Story.scss';

import NodeLink from './NodeLink';
import InputNodeLink from './InputNodeLink';

const errorNode = {
  content:'there\'s been an error.',
  error:true
};

const nodeLinkTypes = {
  "input":InputNodeLink
};

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
    if (nodeLink.restart) {
      this.followNodeLink({ node:this.state.rootNode.id });
    } else if (nodeLink.type === "input" && nodeLink.targetVariable) {
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

  replaceVariables(content) {
    const variableRegEx = new RegExp(/#{(\S+)}/);
    return content.replace(variableRegEx, (match, varName) => {
      return this.state.customData[varName] || match;
    });
  }

  render() {
    const currentNode = this.state.currentNode || errorNode;

    return (
      <div className="story">
        <div className="node">
          <div className="node-content">
            {this.replaceVariables(currentNode.content)}
          </div>
          <div className="node-links">
            {
              currentNode.next ?
              currentNode.next.map(n => React.createElement(nodeLinkTypes[n.type] || NodeLink, { nodeLink:n, nodeLinkClicked:this.goToNode, key:btoa(`${n.node}-${n.content}`) }))
              : <NodeLink restart nodeLinkClicked={this.goToNode} />
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