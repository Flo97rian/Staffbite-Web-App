import React from "react";
import Form from 'react-bootstrap/Form';
import InfoOverlay from "../../SchichtplanErstellen/FormElements/InfoOverlay";
import {
    Col,
    Row
} from "reactstrap"

export default class ControlErfahrung extends React.PureComponent {
    render() {
        return(
            <>
            {this.props.info ?
            <>
                <InfoOverlay infotitle={this.props.label} description={this.props.description}/>
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