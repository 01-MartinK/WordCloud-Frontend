import { Component } from "react";
import { FormLabel, Button } from '@mui/joy'

import FileDropzone from '../FileDropzone'
import './style.scss'


export default class WordInputUpload extends Component {
    uploadFile = () => {
        const file = document.querySelector('.fileInput').files[0]

        const errorMessage = document.querySelector('#sizeError')

        if (file != null){
            const url = "http://localhost:8080/upload";
            const method = "post";

            errorMessage.style.display = "none"

            const xhr = new XMLHttpRequest();

            const data = new FormData();
            data.append("document", file)

            xhr.upload.addEventListener('progress', e => {
                this.props.onUpdateProgress(e.loaded, e.total);
            })

            xhr.upload.addEventListener('loadend', e => {
                this.props.onCompletedLoad();
            })

            xhr.upload.addEventListener('error', e => {
                errorMessage.style.display = "block"
            })

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                  console.log(xhr.response);
                  window.alert("your access code for getting the wordcloud: "+xhr.response)
                }
              };

            xhr.open(method, url);
            xhr.send(data);
        }
    }

    render() {
        return(
            <div className="wordInputUplaod">
                <FormLabel>Upload File</FormLabel>
                <FileDropzone />
                <p id="sizeError" className="error">Your file exceeds 100mb</p>
                {(this.props.showButton) ? <Button onClick={this.uploadFile} style={{marginBottom: "2em"}}>Analyze Text</Button> : null}
            </div>
        )
    }
}