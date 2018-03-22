import React, { Component } from "react";
import { StoryConsumer } from "@@/data/StoryContext";

import NodeLink from "./NodeLink";
import InputNodeLink from "./InputNodeLink";
import { NodeLinkTypes, replaceVariables } from "@@/util";
import NodeContent from "./NodeContent";

import Debug from "@@/ui/Debug";

import "./Story.scss";

const nodeLinkTypes = {
  input: InputNodeLink
};

const errorNode = {
  content: "there's been an error.",
  error: true,
  restart: true
};

const startNode = {
  content: 'Hit "Edit" to add your first page!'
};

class Story extends Component {
  state = { currentNodeId: null };

  gotoNode = nodeLink =>
    this.setState(state => {
      const newState = { ...state, currentNodeId: nodeLink.node };

      if (nodeLink.type === NodeLinkTypes.INPUT && nodeLink.targetVariable) {
        const { targetVariable, inputValue } = nodeLink;
        newState.customData = {
          ...(state.customData || {}),
          [targetVariable]: inputValue
        };
      }

      if (nodeLink.type === NodeLinkTypes.INVENTORY && nodeLink.item) {
        const { item, action } = nodeLink;
        let itemVal =
          state.inventory && state.inventory[item] ? state.inventory[item] : 0;
        itemVal += !action || action === "add" ? 1 : -1;
        newState.inventory = { ...(state.inventory || {}), [item]: itemVal };
      }

      if (nodeLink.restart) {
        newState.currentNodeId = null;
        newState.inventory = {};
        newState.customData = {};
      }

      return newState;
    });

  render() {
    return (
      <StoryConsumer>
        {({
          state: { storyData: { nodes = [] }, meta: { debug } },
          helpers: { getNode, getRootNode, getItems, getVariables }
        }) => {
          const currentNode =
            (!this.state.currentNodeId
              ? getRootNode()
              : getNode(this.state.currentNodeId)) ||
            (nodes.length ? errorNode : startNode);

          return (
            <div className="story">
              {currentNode && (
                <div className="node">
                  <NodeContent
                    content={replaceVariables(
                      currentNode.content,
                      this.state.customData
                    )}
                  />
                  <div className="node-links">
                    {currentNode.next &&
                      currentNode.next.map(nl =>
                        React.createElement(
                          nodeLinkTypes[nl.type] || NodeLink,
                          {
                            nodeLink: nl,
                            onClick: this.gotoNode,
                            key: btoa(`${nl.node}-${nl.content}`)
                          }
                        )
                      )}
                    {currentNode.restart && (
                      <NodeLink restart onClick={this.gotoNode} />
                    )}
                  </div>
                </div>
              )}
              {debug && (
                <React.Fragment>
                  <Debug title="currentNode">
                    {() => <pre>{JSON.stringify(currentNode, null, 1)}</pre>}
                  </Debug>
                  <Debug title="all items">
                    {() => <pre>{JSON.stringify(getItems(), null, 1)}</pre>}
                  </Debug>
                  <Debug title="all variables">
                    {() => <pre>{JSON.stringify(getVariables(), null, 1)}</pre>}
                  </Debug>
                  <Debug title="customData">
                    {() => (
                      <pre>
                        {JSON.stringify(this.state.customData, null, 1)}
                      </pre>
                    )}
                  </Debug>
                  <Debug title="inventory">
                    {() => (
                      <pre>{JSON.stringify(this.state.inventory, null, 1)}</pre>
                    )}
                  </Debug>
                </React.Fragment>
              )}
            </div>
          );
        }}
      </StoryConsumer>
    );
  }
}

export default Story;
