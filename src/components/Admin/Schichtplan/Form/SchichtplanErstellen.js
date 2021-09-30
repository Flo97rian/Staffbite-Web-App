import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample.js";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import Switch from "../../../Application/functionalComponents/Switch";

export default class SchichtplanErstellen extends React.PureComponent {
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
                        <Datepicker size="lg" getDates={this.props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang der KW" placeholderEnde="Ende der KW" />  
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <InfoOverlay info={true} description={"Wählen Sie die Tage aus, an denen ihr Betrieb geschlossen ist!"} infotitle="Gibt es freie Tage?" InfoOverlay/>
                        </Col>
                    </Row>
                    <Switch info={true} type="switch" label="Montag" name="Montag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Dienstag" name="Dienstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Mittwoch" name="Mittwoch" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Donnerstag" name="Donnerstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Freitag" name="Freitag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Samstag" name="Samstag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                    <Switch info={true} type="switch" label="Sonntag" name="Sonntag" value="true" onChange={(e) => this.props.onChange(e, "daysIsActive")}></Switch>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}