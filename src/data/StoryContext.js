import React, { createContext } from 'react';
import storyData from './story.json';
import { generateId } from '@@/util';

export const StoryContext = createContext();

export const StoryConsumer = StoryContext.Consumer;

export class StoryProvider extends React.Component {
  state = { ...storyData }
  keyedNodes = {}
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
    addBlank:() => {
      this.setState(state => ({
        ...state,
        nodes:[
          ...state.nodes,
          { id:generateId(state.nodes), content:"", next:[] }
        ]
      }));
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