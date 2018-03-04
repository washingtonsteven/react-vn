import React, { Component } from 'react';
import './Story.scss';

import Debug from '@@/Debug';

import NodeContent from './NodeContent';
import NodeLink from './NodeLink';
import InputNodeLink from './InputNodeLink';

import { replaceVariables, NodeLinkTypes } from '@@/util';

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

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) return true;
    if (JSON.stringify(this.state.curentNode) !== JSON.stringify(nextState.currentNode)) return true;
    return false;
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
      this.setState({
        ...this.state,
        customData:{},
        inventory:{}
      }, () => this.followNodeLink({ node:this.state.rootNode.id }));
    } else if (nodeLink.type === NodeLinkTypes.INPUT && nodeLink.targetVariable) {
      this.setState({
        ...this.state,
        customData:{
          ...this.state.customData || {},
          [nodeLink.targetVariable]:nodeLink.inputValue
        }
      }, () => this.followNodeLink(nodeLink));
    } else if (nodeLink.type === NodeLinkTypes.INVENTORY && nodeLink.item) {
      const inc = !nodeLink.action || nodeLink.action === 'add' ? 1 : -1; 
      const newCount = this.state.inventory && this.state.inventory[nodeLink.item] ? this.state.inventory[nodeLink.item] + (inc) : inc;
      this.setState({
        ...this.state,
        inventory:{
          ...this.state.inventory || {},
          [nodeLink.item]:newCount
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
    const content = replaceVariables(currentNode.content, this.state.customData);

    return (
      <div className="story">
        <div className="node">
          <NodeContent content={content} />
          <div className="node-links">
            {
              currentNode.next && currentNode.next.length ?
              currentNode.next.map(n => React.createElement(nodeLinkTypes[n.type] || NodeLink, { nodeLink:n, nodeLinkClicked:this.goToNode, key:btoa(`${n.node}-${n.content}`) }))
              : <NodeLink restart nodeLinkClicked={this.goToNode} />
            }
          </div>
        </div>
        <Debug>
          {() => (
            <pre>
              {JSON.stringify(currentNode, null, 1)}
            </pre>
          )}
        </Debug>
      </div>
    )
  }
}

export default Story;