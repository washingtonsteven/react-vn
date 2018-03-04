import React, { createContext } from 'react';
import storyData from './story.json';
import { generateId } from '@@/util';

export const StoryContext = createContext();

export const StoryConsumer = StoryContext.Consumer;

export class StoryProvider extends React.Component {
  constructor(props) {
    super(props);

    const rootNode = storyData.nodes.find(n => n.root);
    this.keyedNodes = rootNode ? { [rootNode.id]:rootNode } : {};
    this.state = {
      storyData,
      rootNode
    }
  }
  actions = {
    addBlankNode:() => this.actions.updateNode({ id:generateId(this.state.storyData.nodes), content:"", next:[] }),
    updateNodeContent:(nodeId, content) => {
      const node = { ...this.helpers.getNode(nodeId) || {} };
      node.content = content;
      this.actions.updateNode(node);
    },
    addBlankNodeLink:(nodeId) => {
      const node = { ...this.helpers.getNode(nodeId) || {} };
      if (!node.next) node.next = [];
      node.next.push({ content:"", node:null });
      this.actions.updateNode(node);
    },
    updateNodeLink:(nodeId, linkIndex, link) => {
      const node = { ...this.helpers.getNode(nodeId) || {} };
      if (node && node.next) {
        node.next[linkIndex] = link;
      }
      this.actions.updateNode(node);
    },
    updateNode:node => {
      this.keyedNodes[node.id] = node;
      this.setState(state => {
        let idx = state.storyData.nodes.findIndex(n => n.id === node.id);
        if ((!idx && idx !== 0) || idx < 0) idx = state.storyData.nodes.length;
        const nodes = [...state.storyData.nodes];
        nodes[idx] = node;
        return {
          ...state,
          storyData:{
            ...state.storyData,
            nodes
          }
        }
      });
    }
  }
  helpers = {
    getRootNode: () => this.state.rootNode,
    getNode:id => {
      if (!this.keyedNodes[id]) {
        this.keyedNodes[id] = this.state.storyData.nodes.find(n => n.id === id);
      }

      return this.keyedNodes[id];
    }
  }
  render() {
    return (
      <StoryContext.Provider value={{ state:this.state, actions:this.actions, helpers:this.helpers }}>
        {this.props.children}
      </StoryContext.Provider>
    );
  }
}