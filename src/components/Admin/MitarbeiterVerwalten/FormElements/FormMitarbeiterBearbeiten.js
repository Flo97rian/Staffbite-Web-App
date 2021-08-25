import React from "react";

import {
    Col,
    Row
} from "reactstrap"
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import Switch from "./Switch";
import Form from 'react-bootstrap/Form';

const FormMitarbeiterBearbeiten = (props) => {
        const employee = props.mitarbeiterdaten
        return(
            <>
                <form>
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
                        <InputNumber label="Stundenlohn in €" name="stundenlohn"  placeholder={employee["stundenlohn"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber label="Gehalt mtl. in €" name="zielmtleuro"  placeholder={employee["zielmtleuro"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber label="Ziel mtl. (h)" name="zielmtlh"  placeholder={employee["zielmtlh"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <Form.Label><p>betriebliche Einstellungen</p></Form.Label>
                        <ControlErfahrung label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <br/>
                        <InputString label="Position" name="position" placeholder={employee["position"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch type="switch" label="Frei" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <Switch type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                    </Row>
                </form>
            </>
        )
    }
export default FormMitarbeiterBearbeiten;