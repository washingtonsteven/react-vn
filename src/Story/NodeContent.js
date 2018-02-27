import React, { Component } from 'react';
import TextScroll from '@@/TextScroll'

import './NodeContent.scss';

class NodeContent extends Component {


  render() {
    return (
      <div className='node-content' style={{minHeight:"90px"}}>
        <TextScroll>{this.props.content}</TextScroll>
      </div>
    )
  }
}

export default NodeContent;