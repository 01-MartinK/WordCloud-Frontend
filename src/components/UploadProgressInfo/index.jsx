import { Component } from "react";
import './style.scss'

export default class UploadProgressInfo extends Component {
    
    render() {
        return(
            <div className="progressInfo">
                { (this.props.showAccessCode) ?
                <>
                    <p>Access Code</p>
                    <h1 className="accessCodeLabel">189123</h1>
                </> 
                : null
                }
                <div className="progressbar">
                    <div className="progress" style={{width: `${this.props.progress}%`}}/>
                    <p>{this.props.status}</p>
                </div>
            </div>
        )
    }
}