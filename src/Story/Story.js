import React, { Component } from "react";
import { StoryConsumer } from "@@/data/StoryContext";

import NodeLink from "./NodeLink";
import InputNodeLink from "./InputNodeLink";
import { NodeLinkTypes, replaceVariables } from "@@/util";
import NodeContent from "./NodeContent";

import Debug from "@@/Debug";

import "./Story.scss";

const nodeLinkTypes = {
  input: InputNodeLink
};

const errorNode = {
  content: "there's been an error.",
  error: true
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

      return newState;
    });

  render() {
    return (
      <StoryConsumer>
        {({ helpers: { getNode, getRootNode } }) => {
          const currentNode =
            (!this.state.currentNodeId
              ? getRootNode()
              : getNode(this.state.currentNodeId)) || errorNode;

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
                  </div>
                </div>
              )}
              <Debug>
                {() => <pre>{JSON.stringify(currentNode, null, 1)}</pre>}
              </Debug>
            </div>
          );
        }}
      </StoryConsumer>
    );
  }
}

export default Story;
