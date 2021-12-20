import React from "react";
import InfoOverlay from "./InfoOverlay";
import {
    Input,
    FormGroup,
    Form
} from "reactstrap"
import InfoLabel from "./InfoLabel";

export default class InputTime extends React.PureComponent {
    render() {
        return(
            <>
                {this.props.info ?
                <Form>
                    <FormGroup>
                    <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                        <Input type="time" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                    </FormGroup>
                </Form>
                : 
                <Form>
                    <FormGroup>
                        <p className="mb-0">{this.props.label}</p>
                        <Input type="time" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" name={this.props.name} value={this.props.value} defaultValue={this.props.placeholder} onChange={this.props.onChange}></Input>
                    </FormGroup>
                </Form>
                }             
        </>
        )
    }
}