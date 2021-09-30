import React from "react";
import InfoOverlay from "./InfoOverlay";
import {
    Input,
    FormGroup,
    Form
} from "reactstrap"

export default class InputTime extends React.PureComponent {
    render() {
        return(
            <>
                {this.props.info ?
                <Form>
                    <FormGroup>
                        <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
                        <Input type="time" size="lg" name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                    </FormGroup>
                </Form>
                : 
                <Form>
                    <FormGroup>
                        <p className="mb-0">{this.props.label}</p>
                        <Input type="time" size="lg" name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                    </FormGroup>
                </Form>
                }             
        </>
        )
    }
}