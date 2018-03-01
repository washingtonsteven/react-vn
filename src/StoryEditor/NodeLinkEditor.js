import React, { Component } from 'react';
import './NodeLinkEditor.scss';
import { excerpt, NodeLinkTypes } from '@@/util';
import { RadioGroup } from '@@/ui';

class NodeLinkEditor extends Component {
  state = { type:NodeLinkTypes.DEFAULT }
  render() {
    const { link, linkIndex, onChange, storyData } = this.props;
    return (
      <div className="node-link">
        <label htmlFor='node-link-content'>
          <span>NodeLink text</span>
          <input type="text" name='node-link-content' defaultValue={link.content} onChange={e => onChange(linkIndex, {...link, content:e.target.value})} />
        </label>
        <label htmlFor='node-link-node-target'>
          <span>Target Node</span>
          <select name='node-link-node-target' defaultValue={link.node} onChange={e => onChange(linkIndex, {...link, node:e.target.value})}>
            {storyData.nodes.map(node => <option value={node.id} key={node.id}>{node.id} - {excerpt(node.content)}</option>)}
          </select>
        </label>
        <RadioGroup options={Object.values(NodeLinkTypes)} onChange={v => this.setState({type:v}, () => onChange(linkIndex, {...link, type:this.state.type}))} />
        {this.renderOptions()}
      </div>
    )
  }

  renderOptions() {
    switch(this.state.type) {
      case NodeLinkTypes.INPUT: 
        return this.renderInputOptions();
      case NodeLinkTypes.INVENTORY: 
        return this.renderInventoryOptions();
      default: 
        return null;
    }
  }

  renderInputOptions() {
    const { onChange, link, linkIndex } = this.props;
    return (
      <div className='input-node-link-options'>
        <label htmlFor='target-variable'>
          <span>Target Variable</span>
          <input type="text" name="target-variable" defaultValue={link.targetVariable || ""} onChange={e => onChange(linkIndex, {...link, targetVariable:e.target.value})} />
        </label>
        <label htmlFor='prompt'>
          <span>Prompt</span>
          <input type="text" name="prompt" defaultValue={link.prompt || ""} onChange={e => onChange(linkIndex, {...link, prompt:e.target.value})} />
        </label>
      </div>
    )
  }

  renderInventoryOptions() {
    const { onChange, link, linkIndex } = this.props;
    return (
      <div className='inventory-node-link-options'>
        <label htmlFor='item'>
          <span>Item Name</span>
          <input type="text" name="target-variable" defaultValue={link.item || ""} onChange={e => onChange(linkIndex, {...link, item:e.target.value})} />
        </label>
        <label htmlFor='action'>
          <span>Action</span>
          <select name={`inventory-node-link-actions-${this.state.name}`} defaultValue={link.action || 'add'} onChange={e => onChange(linkIndex, {...link, action:e.target.value})}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </label>
      </div>
    )
  }
}



export default NodeLinkEditor;