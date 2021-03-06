import React, { createContext } from "react";
import { generateId, NodeLinkTypes } from "@@/util";

export const StoryContext = createContext();

export const StoryConsumer = StoryContext.Consumer;

export class StoryProvider extends React.Component {
  constructor(props) {
    super(props);
    if (!props.storyData) {
      throw new Error("StoryProvider missing required prop: storyData");
    }

    const rootNode = props.storyData.nodes.find(n => n.root);
    this.keyedNodes = rootNode ? { [rootNode.id]: rootNode } : {};
    this.state = {
      storyData: props.storyData,
      rootNode
    };
  }
  actions = {
    updateStoryTitle: title =>
      this.setState(state => ({
        ...state,
        storyData: {
          ...state.storyData,
          meta: { ...state.storyData.meta, title }
        }
      })),
    updateStoryAuthor: author =>
      this.setState(state => ({
        ...state,
        storyData: {
          ...state.storyData,
          meta: { ...state.storyData.meta, author }
        }
      })),
    updateShortcode: (shortcode, index) => {
      this.setState(state => {
        const shortcodes = [...(state.storyData.meta.shortcodes || [])];
        shortcodes[index] = shortcode;
        return {
          ...state,
          storyData: {
            ...state.storyData,
            meta: {
              ...state.storyData.meta,
              shortcodes
            }
          }
        };
      });
    },
    addBlankShortcode: () => {
      this.actions.updateShortcode(
        { tag: "", style: {} },
        (this.state.storyData.meta.shortcodes || []).length
      );
    },
    deleteShortcode: idx => {
      this.setState(state => {
        const shortcodes = [...(state.storyData.meta.shortcodes || [])].filter(
          (s, i) => i !== idx
        );
        return {
          ...state,
          storyData: {
            ...state.storyData,
            meta: {
              ...state.storyData.meta,
              shortcodes
            }
          }
        };
      });
    },
    addBlankNode: () =>
      this.actions.updateNode({
        id: generateId(this.state.storyData.nodes),
        content: "",
        next: [],
        root: !this.state.storyData.nodes || !this.state.storyData.nodes.length
      }),
    updateNodeContent: (nodeId, content) => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      node.content = content;
      this.actions.updateNode(node);
    },
    setRootNode: nodeId => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      node.root = true;
      this.actions.updateNode(node);
    },
    setRestartNode: (nodeId, value = true) => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      node.restart = value;
      this.actions.updateNode(node);
    },
    removeNodeLink: (nodeId, linkIndex) => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      node.next = node.next.filter((nl, i) => i !== linkIndex);
      this.actions.updateNode(node);
    },
    addBlankNodeLink: nodeId => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      if (!node.next) node.next = [];
      node.next.push({
        content: "",
        node: (this.helpers.getRootNode() || { id: -1 }).id
      });
      this.actions.updateNode(node);
    },
    updateNodeLink: (nodeId, linkIndex, link) => {
      const node = { ...(this.helpers.getNode(nodeId) || {}) };
      if (node && node.next) {
        node.next[linkIndex] = link;
      }
      this.actions.updateNode(node);
    },
    removeNode: nodeId => {
      this.keyedNodes[nodeId] = null;
      this.setState(state => {
        const nodes = [...state.storyData.nodes].filter(n => n.id !== nodeId);
        const rootNode = nodeId === state.rootNode.id ? null : state.rootNode;
        return {
          ...state,
          storyData: {
            ...state.storyData,
            nodes
          },
          rootNode
        };
      });
    },
    updateNode: node => {
      this.keyedNodes[node.id] = node;
      this.setState(state => {
        let idx = state.storyData.nodes.findIndex(n => n.id === node.id);
        if ((!idx && idx !== 0) || idx < 0) idx = state.storyData.nodes.length;
        const nodes = [...state.storyData.nodes];
        nodes[idx] = node;
        const rootNode = state.rootNode
          ? node.id === state.rootNode.id ? node : state.rootNode
          : node.root ? node : state.rootNode;
        return {
          ...state,
          storyData: {
            ...state.storyData,
            nodes
          },
          rootNode
        };
      });
    }
  };
  helpers = {
    getRootNode: () =>
      this.state.rootNode || this.state.storyData.nodes.find(n => n.root),
    getNode: id => {
      if (!this.keyedNodes[id]) {
        this.keyedNodes[id] = this.state.storyData.nodes.find(n => n.id === id);
      }

      return this.keyedNodes[id];
    },
    getNodeLinkVariables: fn => {
      if (!this.state.storyData.nodes || !fn || typeof fn !== "function")
        return [];

      return this.state.storyData.nodes.reduce((acc, n, i) => {
        if (n.next) {
          const items = n.next.reduce(
            (iacc, nl, j) => {
              return fn(nl, iacc);
            },
            [...acc]
          );

          return items;
        }
        return acc;
      }, []);
    },
    getItems: () => {
      return this.helpers.getNodeLinkVariables((nodeLink, itemsList) => {
        if (nodeLink.type === NodeLinkTypes.INVENTORY) {
          if (nodeLink.item && !itemsList.includes(nodeLink.item))
            itemsList.push(nodeLink.item);
        }
        return itemsList;
      });
    },
    getVariables: () => {
      return this.helpers.getNodeLinkVariables((nodeLink, variableList) => {
        if (nodeLink.type === NodeLinkTypes.INPUT) {
          if (
            nodeLink.targetVariable &&
            !variableList.includes(nodeLink.targetVariable)
          )
            variableList.push(nodeLink.targetVariable);
        }
        return variableList;
      });
    }
  };
  render() {
    return (
      <StoryContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
          helpers: this.helpers
        }}
      >
        {this.props.children}
      </StoryContext.Provider>
    );
  }
}
