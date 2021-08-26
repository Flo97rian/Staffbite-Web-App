import React from "react";
import Form from 'react-bootstrap/Form';

export default class Input extends React.PureComponent {
    render() {
        return(
            <>
                        <p className="mb-0">{this.props.label}</p>
                        <Form>
                        <Form.Check custom type="switch" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>    
            </>
        )
    }
}