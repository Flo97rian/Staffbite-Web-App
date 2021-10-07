import React from "react";

import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import Switch from "../../../Application/functionalComponents/Switch";
import Form from 'react-bootstrap/Form';

const FormMitarbeiterBearbeiten = (props) => {
        const employee = props.mitarbeiterdaten
        return(
            <>
                {props.meta.stundenerfassung["BOOL"] ?
                    <>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Switch type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                        <Form.Label><p>Persönliche Daten</p></Form.Label>
                        <InputString info={true} description={"Tragen Sie hier den Vor- und Nachnamen ein"} label="Vorname, Nachname" name="name" placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <InputString info={true} description={"Tragen Sie hier die E-Mail Adresse ein"} label="E-Mail Adresse" name="email"  placeholder={employee["email"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <InputNumber info={true} description={"Tragen Sie hier den Stundenlohn ein. Diesen können Sie später ändern"} label="Stundenlohn in €" name="stundenlohn"  placeholder={employee["stundenlohn"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber info={true} description={"Tragen Sie hier das vereinbarte Gehalt ein"}  label="Gehalt mtl. in €" name="zielmtleuro"  placeholder={employee["zielmtleuro"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber info={true} description={"Tragen Sie hier die monatlichen Arbeitsstunden ein"}  label="Ziel mtl. (h)" name="zielmtlh"  placeholder={employee["zielmtlh"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <Form.Label><p>betriebliche Einstellungen</p></Form.Label>
                        <ControlErfahrung info={true} description={"Diese Wert repräsentiert den Erfahrungswert ihres Mitarbeiters"}  label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <br/>
                        <InputString info={true} description={"Tragen Sie hier die Schichten oder Positionen ein, auf die sich ihr Mitarbeiter in ihrem Betrieb bewerben darf"} label="Position" name="position" placeholder={employee["position"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch info={true} description={"Tragen Sie hier ein, ob ihr Mitarbeiter gerade im Urlaub ist"}  type="switch" label="Frei" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <Switch info={true} description={"Tragen Sie hier ein, ob ihr Mitarbeiter aktuell Überstunden hat und diese abgebaut werden sollen. Mit dieser Einstellung wird dieser Mitarbeiter bewusst weniger im Schichtplan eingesetzt."} type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <InputNumber info={true} description={"Wählen Sie hier eine Anzahl ein Schichten, die ihr Mitarbeiter pro Woche im Durchschnitt erhalten soll"} label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                    </Row>
                </>
                :
                <>
                <Row className="text-center">
                        <Col xs={12}>
                            <Switch type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                        <Form.Label><p>Persönliche Daten</p></Form.Label>
                        <InputString label="Vorname, Nachname" name="name" placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <InputString label="E-Mail Adresse" name="email"  placeholder={employee["email"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch type="switch" label="Frei" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <Form.Label><p>betriebliche Einstellungen</p></Form.Label>
                        <ControlErfahrung label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <br/>
                        <InputString label="Position" name="position" placeholder={employee["position"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                    </Row>
                </>
                }
            </>
        )
    }
export default FormMitarbeiterBearbeiten;