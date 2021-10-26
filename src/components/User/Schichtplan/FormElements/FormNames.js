import React from "react";
import Form from 'react-bootstrap/Form';

export default class FormNames extends React.PureComponent {
    typeofnames(names) {
        if (Object.keys(names).length === 0) {
            return(
                <p>Leer</p>
        )} else if (Object.keys(names).length === 1){
            return(
                <p>{names[Object.keys(names)[0]]}</p>
        )} else {
            let keys = Object.keys(names)
            return(
                <Form.Control as="select">
                    {keys.map((item, index) => <option value={item}>{names[item]}</option>)}
                </Form.Control>
        )}
    }
    render() {
        return(
            <>
                 {this.typeofnames(this.props.names)}
            </>
        )
    }
}