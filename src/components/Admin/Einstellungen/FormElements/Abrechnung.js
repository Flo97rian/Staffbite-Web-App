// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import React from "react";
import { Row, Col } from "reactstrap";
import Button from "react-bootstrap/Button";
import DateRangePickerExample from "../../SchichtplanErstellen/FormElements/DateRangePickerExample";
import InfoOverlay from "../../SchichtplanErstellen/FormElements/InfoOverlay";

export default class Abrechnung extends React.PureComponent {
    render() {
        return (
            <>
            <br/>
            <hr className="my-4" />
            <br/>
            <Row className="text-center">
                <Col xs={6}>
                    <InfoOverlay
                    infotitle={"Abrechnungszeitraum"}
                    description={"Tragen Sie hier ihren individuellen Abrechnungszeitraum ein. Somit können wir Montat für Monat einen flüssigen Übergang ihrer Schichtpläne ermöglichen"}/>
                </Col>
                <Col xs={6}>
                    <DateRangePickerExample getDates={this.props.getDates} start="AbrechnungStart" ende="AbrechnungEnde" {...this.props} placeholderEnde={ this.props.org ? this.props.org.AbrechnungEnde["S"] : 'Ende eintagen'} placeholderAnfang={ this.props.org ? this.props.org.AbrechnungStart["S"] : 'Anfang eintagen'}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={10}></Col>
                <Col xs={2}>
                <Button variant="primary" onClick={() => this.props.onClick()}>Änderungen speichern</Button>
                </Col>
            </Row>
            </>
        );
    }
}