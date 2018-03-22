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
      console.log("Not JSON!");
      this.props.onError &&
        this.props.onError(
          new Error(
            "JSONFileInput received non-json file. Make sure the MIME-type is 'application/json'"
          )
        );
    }
  };

  onFileLoad = e => {
    try {
      const json = JSON.parse(e.target.result);
      this.props.onFileSelected && this.props.onFileSelected(json);
    } catch (e) {
      this.props.onError &&
        this.props.onError(
          new Error("JSONFileInput errored while parsing file.")
        );
    }
  };

  render() {
    return (
      <input
        type="file"
        name={this.props.name || "file"}
        id={this.props.name || "file"}
        onChange={this.uploadFile}
      />
    );
  }
}

export default JSONFileInput;
