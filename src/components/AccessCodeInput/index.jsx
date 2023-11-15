import { Component } from "react";
import { FormControl, FormLabel, Input, Button} from '@mui/joy'

import './style.scss'

export default class AccessCodeInput extends Component {
    onPressedGetData = (e) => {
        const code = document.querySelector('.accesscode').firstChild.value
        this.props.callGet(code)
        e.preventDefault()
    }

    render() {
        return(
            <FormControl className="access">
                <FormLabel>Access Code</FormLabel>
                <Input className="accesscode" type="text" placeholder="Access Code" />
                <Button onClick={this.onPressedGetData}>Get Data</Button>
            </FormControl>
        )
    }
}