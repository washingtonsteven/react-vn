import React, { Component } from 'react';
import { StoryConsumer } from '@@/data/StoryContext';

import NodeLinkEditor from './NodeLinkEditor';

import './NodeEditor.scss';

class NodeEditor extends Component {
  render() {
    const { nodeId } = this.props;
    return (
      <StoryConsumer>
        {
          ({ actions:{updateNodeContent, addBlankNodeLink}, helpers:{getNode} }) => {
            const node = getNode(nodeId);
            return (
              <div className="node-editor">
                <input type="text" className="node-id" value={nodeId} readOnly />
                <textarea onChange={e => updateNodeContent(nodeId, e.target.value)} defaultValue={node.content}></textarea>
                {
                  node && node.next && node.next.map((link, i) => <NodeLinkEditor nodeId={nodeId} link={link} linkIndex={i} key={i} />)
                }
                <button onClick={() => addBlankNodeLink(nodeId)}>Add New Link</button>
                <button onClick={() => { this.props.onExit && this.props.onExit() }}>Back to List</button>
              </div>
            );
          }
        }
      </StoryConsumer>
    );
  }
}

export default NodeEditor;