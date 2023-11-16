import { Component } from "react";
import ReactWordcloud from "react-wordcloud";

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import AccessCodeInput from '../AccessCodeInput'
import './style.scss'

// options for the wordcloud element
const wordcloud_options = {
    rotations: 3,
    enableOptimizations: true,
    fontFamily: "impact",
    padding: 1,
    scale: "sqrt",
    transitionDuration: 1000,
    rotations: 3,
    fontSizes: [8,16]
}

export default class TextInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            words: []
        }
    }

    getWordList = async (id) => {
        // warning label
        const label = document.querySelector("#status")

        if (id === ""){ // empty id check
            label.textContent = "Access Code Field can't be empty"
            label.style.backgroundColor = "red";
            return
        }

        const response = await fetch(`http://localhost:8080/list/${id}`, {
            method: "GET",
            mode: "cors",
        })
        const result = await response.json() // convert response to json
        

        this.setState({ // reset the word list
            words: []
        })

        if (result.status === 2){ // check status and display
            label.textContent = "Showing"
            label.style.backgroundColor  = "cyan";
            this.setState({
                words: JSON.parse(result.wordList)
            })
        }else{ // if not completed
            if (result.status === 0){
                label.textContent = "Pending";
                label.style.backgroundColor = "yellow";
            }
            if (result.status === 1){
                label.textContent = "In Progress";
                label.style.backgroundColor = "greenyellow";
            }
            if (result.status === -1){
                label.textContent = "Error occured"
                label.style.backgroundColor = "red";
            }
        }

        // report error if not received word list
        if (response.status === 500){
            label.textContent = "No wordlist with that indentifier!"
            label.style.backgroundColor = "red";
        }
    }

    render() {
        return(
            <div className="textInfo">
                {(this.state.words.length !== 0) ? <div style={{ height: 300, width: 600, scale: "2", marginBottom: "4em" }}>
                        <ReactWordcloud className="wordcloud" options={wordcloud_options} words={this.state.words} />
                    </div> : null }
                <p id="status"></p>
                <AccessCodeInput callWordlistFetch={this.getWordList}/>
            </div>
        );
    }
}