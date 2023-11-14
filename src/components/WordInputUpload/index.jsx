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
            data.append("file", file)

            xhr.upload.addEventListener('progress', e => {
                this.props.onUpdateProgress(e.loaded, e.total);
            })

            xhr.upload.addEventListener('loadend', e => {
                this.props.onCompletedLoad();
            })

            xhr.upload.addEventListener('error', e => {
                errorMessage.style.display = "block"
            })

            xhr.open(method, url);
            xhr.send(data);
        }
    }

    render() {
        return(
            <div>
                <FormLabel>Upload File</FormLabel>
                <FileDropzone />
                <p id="sizeError" className="error">TOO BIG OF A FILE</p>
                <Button onClick={this.uploadFile} style={{marginBottom: "2em"}}>Analyze Text</Button>
            </div>
        )
    }
}