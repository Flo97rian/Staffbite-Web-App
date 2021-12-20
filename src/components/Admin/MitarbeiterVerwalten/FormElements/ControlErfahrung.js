import React from "react";
import { 
    FormGroup
    } from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";

export default class ControlErfahrung extends React.PureComponent {
    render() {
        return(
            <>
            {this.props.info ?
            <FormGroup>
                <InfoLabel description={this.props.description} title={this.props.label}></InfoLabel>
                <Form.Control as="select" type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
            </FormGroup>
            : 
            <FormGroup>
                <InfoLabel title={this.props.label} description={this.props.description}></InfoLabel>
                <Form.Control as="select" type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
            </FormGroup>
            }            
            </>
        )
    }
}