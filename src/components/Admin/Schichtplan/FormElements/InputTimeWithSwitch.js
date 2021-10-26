import React from "react";
import InfoOverlayWithSwitch from "./InfoOverlayWithSwitch";
import {
    Input,
    FormGroup,
    Form
} from "reactstrap"

export default class InputTimeWithSwitch extends React.PureComponent {
    render() {
        return(
            <>
                {this.props.info ?
                <Form>
                    <FormGroup>
                        <InfoOverlayWithSwitch infotitle={this.props.label} description={this.props.description} {...this.props}/>
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