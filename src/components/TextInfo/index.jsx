import { Component } from "react";
import ReactWordcloud from "react-wordcloud";

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import AccessCodeInput from '../AccessCodeInput'

const wordcloud_options = {
    rotations: 3,
    fontFamily: "impact",
    padding: 1,
    scale: "sqrt",
    transitionDuration: 1000,
    rotations: 3
}

export default class TextInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            words: []
        }
    }

    getWordList = async (id) => {
        const response = await fetch(`http://localhost:8080/list/${id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        })
        const result = await response.json()
        this.setState({
            words: result
        })
    }

    render() {
        return(
            <div className="textInfo">
                {(this.state.words.length !== 0) ? <div style={{ height: 300, width: 500, scale: "2", marginBottom: "2em" }}>
                        <ReactWordcloud className="wordcloud" options={wordcloud_options} words={this.state.words} />
                    </div> : null }
                <AccessCodeInput callGet={this.getWordList}/>
            </div>
        );
    }
}