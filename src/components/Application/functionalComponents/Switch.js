import React from "react";
import {
    FormGroup
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoOverlay from "./InfoOverlay";
import InfoLabel from "./InfoLabel";

export default class Switch extends React.PureComponent {
    render() {
        return(
            <>
                    {this.props.info ?
                    <FormGroup>
                        <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                        <Form>
                        <Form.Check custom type="switch" size="lg" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </FormGroup>
                    : 
                    <>
                        <Form>
                            <Form.Check custom type="switch" size="lg" defaultChecked={this.props.value} name={this.props.name} id={this.props.name} onChange={this.props.onChange}></Form.Check>
                        </Form>
                    </>
                    }              
            </>
        )
    }
}