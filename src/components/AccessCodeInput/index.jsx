import { Component } from "react";
import { FormControl, FormLabel, Input, Button} from '@mui/joy'

import './style.scss'

export default class AccessCodeInput extends Component {
    render() {
        return(
            <FormControl className="access">
                <FormLabel>Access Code</FormLabel>
                <Input type="text" placeholder="Access Code" />
                <Button>Get Data</Button>
            </FormControl>
        )
    }
}