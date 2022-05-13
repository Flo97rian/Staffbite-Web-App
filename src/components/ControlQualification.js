import React from "react";
import { 
    FormGroup
    } from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoOverlay from "./InfoOverlay";
import InfoLabel from "./InfoLabel";

export default class ControlQualification extends React.PureComponent {
    render() {
        return(
            <FormGroup>
                <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                <Form.Control as="select" type="text" className="form-control-alternative edit-event--description input-autosize form-control" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
            </FormGroup>
        )
    }
}