import React, { Component } from 'react';

import './NodeContent.scss';

let printTimeout = null;;

class NodeContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content:""
    }
  }

  componentDidMount() { if (this.props.content) this.printContent(this.props.content, true); }
  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) { this.printContent(this.props.content, true) }
  }

  printContent(content, doReset) {
    if (printTimeout) clearTimeout(printTimeout);

    const nextVal = doReset ? "" : content.substring(0, this.state.content.length+1);
    this.setState({ ...this.state, content:nextVal }, () => {
      if (this.state.content.length < content.length) {
        printTimeout = setTimeout(() => {
          this.printContent(content)
        }, 10);
      }
    })
  }

  render() {
    return (
      <div className='node-content' style={{minHeight:"90px"}}>
        {this.state.content}
      </div>
    )
  }
}

export default NodeContent;