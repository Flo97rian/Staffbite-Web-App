import React from "react";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";

export default class ControlErfahrung extends React.PureComponent {
    render() {
        return(
            <>
            {this.props.info ?
            <>
                <InfoLabel description={this.props.description} title={this.props.label}></InfoLabel>
                <Form.Control as="select" type="text" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
            </>
            : 
            <>
                <p className="mb-0">{this.props.label}</p>
                <Form.Control as="select" type="text" defaultValue={this.props.defaultVal} name={this.props.name} onChange={(e) => this.props.onChange(e, "mitarbeiterBearbeiten")}>
                        <option>Anfänger</option>
                        <option>Fortgeschritten</option>
                        <option>Experte</option>
                      </Form.Control>
            </>
            }            
            </>
        )
    }
}