import { Component } from "react";

import "./style.scss";

export default class FileDropzone extends Component {
  // drop file that mouse is carrying
  dropHandler = (e) => {
    e.preventDefault();

    const allowedTypes = [ // allowed types from drag
      "text/plain",
      "application/json",
      "application/msword",
    ];

    // file input element
    const fileInput = document.querySelector(".fileInput");
    
    document.querySelector("#dropZone").classList.remove("entered");

    // check files from mouse drop
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind == "file" && allowedTypes.includes(item.type)) {
          const file = item.getAsFile();

          fileInput.file = file;

          // reset error
          document.querySelector(".error").style.display = "none";
          // set file name to label
          document.querySelector(".filename").textContent = file.name;

          // console log the file for checking
          console.log(`... file[${i}].name = ${file.name}`);
        } else {
          document.querySelector(".error").style.display = "block";
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };
  
  // when mouse is hovering over box with file
  dragOverHandler = (e) => {
    document.querySelector("#dropZone").classList.add("entered");
    e.preventDefault();
  };

  // when the mouse leaves with the file
  dragLeaveHandler = (e) => {
    document.querySelector("#dropZone").classList.remove("entered");
    e.preventDefault();
  };

  // when file selected via dialog
  onSelectHandler = (e) => {
    const file = e.target.files[0];
    document.querySelector(".filename").textContent = file.name;
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
