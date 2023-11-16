import { Component } from "react";
import { FormLabel, Button, Input } from "@mui/joy";

import FileDropzone from "../FileDropzone";
import "./style.scss";

export default class WordInputUpload extends Component {

  getExcludedWords = () => {
    const input = document.querySelector('#excludedWords').value
    if (input !== ""){
      let cleaned = input.replaceAll(" ", "");
      const list = cleaned.split(",");
      return list;
    }
    return null;
  }

  uploadFile = () => {
    const file = document.querySelector(".fileInput").files[0];

    console.log(this.getExcludedWords());

    // error message element
    const errorMessage = document.querySelector("#sizeError");

    // check if file exists
    if (file != null) {
      const url = "http://localhost:8080/upload";
      const method = "post";

      errorMessage.style.display = "none";

      // using XMLHttpRequest for some reason
      const xhr = new XMLHttpRequest();

      // for sending the file
      const data = new FormData();
      data.append("document", file);
      
      let excluded = this.getExcludedWords()
      data.append("list", excluded);

      console.log(data);

      // progress bar progression
      xhr.upload.addEventListener("progress", (e) => {
        this.props.onUpdateProgress(e.loaded, e.total);
      });

      // file uploaded
      xhr.upload.addEventListener("loadend", (e) => {
        this.props.onCompletedLoad(); // message parent that loading has completed
      });

      // error message
      xhr.upload.addEventListener("error", (e) => {
        errorMessage.textContent = "File exceeds 100mb"
        errorMessage.style.display = "block";
      });

      // xhr request completed
      xhr.onreadystatechange = () => {
        if (xhr.status === 400) {
          errorMessage.textContent = "Server side Error"
          errorMessage.style.display = "block";
        }
        if (xhr.readyState === 4) {
          console.log(xhr.response);
          window.alert(
            "your access code for getting the wordcloud: " + xhr.response
          );
        }
      };

      // xhr finish
      xhr.open(method, url);
      xhr.send(data);
    }
  };

  render() {
    return (
      <div className="wordInputUplaod">
        <FormLabel>Upload File</FormLabel>
        <FileDropzone />
        <h4 style={{textAlign: "left"}}>Excluded words</h4>
        <Input style={{marginBottom: "1em"}} id="excludedWords"/>
        <p id="sizeError" className="error">
          Your file exceeds 100mb
        </p>
        {this.props.showButton ? (
          <Button onClick={this.uploadFile} style={{ marginBottom: "2em" }}>
            Analyze Text
          </Button>
        ) : null}
      </div>
    );
  }
}
