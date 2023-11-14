import { Component } from "react";
import { FormLabel, Button } from '@mui/joy'

import FileDropzone from '../FileDropzone'
import './style.scss'


export default class WordInputUpload extends Component {
    render() {
        return(
            <div>
                <FormLabel>Upload File</FormLabel>
                <FileDropzone />
                <FormLabel>Write a sentence</FormLabel>
                <textarea className="textarea"></textarea>
                <br />
                <Button style={{marginBottom: "2em"}}>Analyze Text</Button>
            </div>
        )
    }
}