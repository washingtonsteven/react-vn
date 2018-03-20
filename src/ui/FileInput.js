import React, { Component } from "react";

class JSONFileInput extends Component {
  state = { fileData: null };
  fileReader = new FileReader();
  uploadFile = e => {
    const file = e.target.files[0];
    //TODO: Check that type is correct, and parse?
    this.fileReader.onload = this.onFileLoad;
    this.fileReader.readAsText(file);
  };

  onFileLoad = e => {
    this.props.onFileSelected && this.props.onFileSelected(e.target.result);
  };

  render() {
    return (
      <span>
        <input type="file" name="file" onChange={this.uploadFile} />
      </span>
    );
  }
}

export default JSONFileInput;
