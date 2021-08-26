import React from "react";
import Form from 'react-bootstrap/Form';

export default class FormNames extends React.PureComponent {
    typeofnames(names) {
        console.log(names)
        if (Object.keys(names).length === 1) {
            let obj = Object.keys(names)[0]
            return(
                 <option value={0}>{names[obj]}</option>
        )} else {
            let keys = Object.keys(names)
            console.log(keys)
            return( keys.map((item, index) => <option value={item}>{names[item]}</option>
        ))}
    }
    render() {
        return(
            <>
            <Form.Control as="select">
                 {this.typeofnames(this.props.names)}
            </Form.Control>
            </>
        )
    }
}