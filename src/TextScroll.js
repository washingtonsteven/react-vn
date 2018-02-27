import React, { PureComponent, Fragment } from 'react';

let printTimeout = null;

class TextScroll extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content:""
    }
  }

  componentDidMount() {
    if (typeof this.props.children !== 'string') {
      throw new Error(`Only text children are allowed for TextScroll. Received ${this.props.children.map ? this.props.children.map(c => c.type).join(',') : this.props.children.type}`);
    }

    if (this.props.children) {
      this.printContent(this.props.children, true);
    } 
  }

  componentDidUpdate(prevProps) {
    if (typeof this.props.children !== 'string') {
      throw new Error(`Only text children are allowed for TextScroll. Received ${typeof this.props.children}`);
    }

    if (prevProps.children !== this.props.children) { 
      this.printContent(this.props.children, true) 
    }
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
    });
  }


  render() {
    return (
      <Fragment>
        {this.state.content}
      </Fragment>
    )
  }
}

export default TextScroll;