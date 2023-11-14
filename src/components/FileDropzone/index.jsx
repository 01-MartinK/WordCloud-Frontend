import { Component } from "react";

import "./style.scss";

export default class FileDropzone extends Component {
  dropHandler = (e) => {
    const allowedTypes = ['text/plain', 'application/json', 'application/msword'];

    const fileInput = document.querySelector(".fileInput");
    
    console.log("file dropped");
    e.preventDefault();

    document.querySelector("#dropZone").classList.remove("entered");

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind == "file" && allowedTypes.includes(item.type)) {
          const file = item.getAsFile();

          fileInput.file = file;

          console.log(file.type);
          
          document.querySelector('.error').style.display = "none"
          document.querySelector(".filename").textContent = file.name;

          console.log(`... file[${i}].name = ${file.name}`);
        }else {
          document.querySelector('.error').style.display = "block"
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  onSelectHandler = (e) => {
    const file = e.target.files[0];
    document.querySelector(".filename").textContent = file.name;
    e.preventDefault();
  };

  dragOverHandler = (e) => {
    e.preventDefault();
    document.querySelector("#dropZone").classList.add("entered");
  };

  dragLeaveHandler = (e) => {
    e.preventDefault();
    document.querySelector("#dropZone").classList.remove("entered");
  };

  onUploadPressed = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        id="dropZone"
        onDrop={this.dropHandler}
        onDragOver={this.dragOverHandler}
        onDragLeave={this.dragLeaveHandler}
      >
        <p className="filename">
          Drag a file to this <i>drop zone</i>
        </p>
        <input
          onChange={this.onSelectHandler}
          accept=".doc,.docx,.txt,.csv,.json"
          className="fileInput"
          id="file"
          name="file"
          type="file"
          style={{ display: "none" }}
        />
        <label className="uploadBtn" htmlFor="file">
          Upload
        </label>
        <p className="error">Not supported</p>
      </div>
    );
  }
}
