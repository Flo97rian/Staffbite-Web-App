import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InputString from "../../MitarbeiterVerwalten/FormElements/InputString";
import InputNumber from "../../MitarbeiterVerwalten/FormElements/InputNumber";
import DateRangePickerExample from "./DateRangePickerExample.js";
import InfoOverlay from "./InfoOverlay";
import Switch from "./Switch";

export default class FormSchichtplanErstellen extends React.PureComponent {
    render() {
        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                <InputString info={true} description={"Wählen Sie einen Namen für diesen Schichtplan (z.B. Sommer, Herbst, Winter etc.)"} label="Name des Schichtplanes" name="name" placeholder="" onChange={(e) => this.props.onChange(e, "daysIsActive")}></InputString>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie, wie viele unterschiedliche Schichten Sie pro Tag haben"} label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => this.props.onChange(e, "daysIsActive")}></InputNumber>
                    <br/>
                        <InfoOverlay infotitle="Kalenderwoche" description="Tragen Sie hier eine Kalenderwoche von Montag bis Freitag ein. Im späteren Verlauf können Sie den Schichtplan auch für mehrere Wochen freischalten"/>
                        <DateRangePickerExample getDates={this.props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang der KW" placeholderEnde="Ende der KW" />  
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Form.Label>Gibt es freie Tage?</Form.Label>
                        </Col>
                    </Row>
                    <Switch type="switch" label="Montag" name="Montag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Dienstag" name="Dienstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Mittwoch" name="Mittwoch" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Donnerstag" name="Donnerstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Freitag" name="Freitag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Samstag" name="Samstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch type="switch" label="Sonntag" name="Sonntag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}