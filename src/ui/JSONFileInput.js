import React, { Component } from "react";

class JSONFileInput extends Component {
  state = { fileData: null };
  fileReader = new FileReader();
  uploadFile = e => {
    const file = e.target.files[0];
    if (file.type === "application/json") {
      this.fileReader.onload = this.onFileLoad;
      this.fileReader.readAsText(file);
    } else {
      throw new Error(
        "JSONFileInput received non-json file. Make sure the MIME-type is 'application/json'"
      );
    }
  };

  onFileLoad = e => {
    try {
      const json = JSON.parse(e.target.result);
      this.props.onFileSelected && this.props.onFileSelected(json);
    } catch (e) {
      console.error(e);
      throw new Error("JSONFileInput errored while parsing file.");
    }
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
