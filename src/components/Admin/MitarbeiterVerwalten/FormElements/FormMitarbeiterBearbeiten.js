import React from "react";

import {
    Col,
    Row,
    Badge
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
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
                            <Switch info={true} description={"Tragen Sie ein, ob ihr:e Mitarbeiter:inn direkt in die Schichtplannung mit aufgenommen werden soll"}   type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
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
                            <Switch info={true} description={"Tragen Sie ein, ob ihr:e Mitarbeiter:inn direkt in die Schichtplannung mit aufgenommen werden soll"} type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                        <Form.Label><p>Persönliche Daten</p></Form.Label>
                        <InputString label="Vorname, Nachname" name="name" placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <InputString label="E-Mail Adresse" name="email"  placeholder={employee["email"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch info={true} description={"Tragen Sie hier ein, ob ihr Mitarbeiter gerade im Urlaub ist"} type="switch" label="Urlaub" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <Switch  info={true} description={"Tragen Sie hier ein, ob ihr Mitarbeiter aktuell Überstunden hat und diese abgebaut werden sollen. Mit dieser Einstellung wird dieser Mitarbeiter bewusst weniger im Schichtplan eingesetzt."} type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <Form.Label><p>betriebliche Einstellungen</p></Form.Label>
                        <ControlErfahrung label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <br/>
                        {props.showPositionHinzufuegen ?
                        <InputString info={true} description={"Wählen Sie eine gültige E-Mail Adresse. Über diese erhält ihr:e neu:e Mitarbeiter:inn alle benötigten Informationen, um sich auf Schichten zu bewerben"} label="Position" name="position"  placeholder="" onChange={(e) => props.handlePositionChange(e)}></InputString>
                        :
                        <InfoOverlay info={true} description={"Wählen Sie eine oder mehrere Positionen für die ihr:e Mitarbeiter:inn geeignet ist"} infotitle="Position"></InfoOverlay>
                        }
                        <>
                        { props.employeeIsActive !== null ? 
                        props.employeeIsActive["position"].map((item, index) => {
                            return (
                                <Badge key={index} className="mr-2 mt-2" color="primary" onClick={() => props.handleRemovePositions(item)}>{item}</Badge>
                            )
                        })
                        :
                        <></>
                        }
                        { props.meta.schichten !== null ? 
                        props.meta.schichten.map((item, index) => (!props.employeeIsActive["position"].includes(item) ?
                                <Badge key={index} className="mr-2" color="light" onClick={() => props.handleSetPositions(item)}>{item}</Badge>
                        :
                        <></>
                        ))
                        :
                        <></>
                        }
                        <br/>
                        {props.showPositionHinzufuegen ?
                        <>
                        <Badge className="mt-2 mb-4 mr-2" color="success" onClick={() => props.handlePositionErstellen()}>Position erstellen</Badge>
                        <Badge className="mt-2 mb-4" color="warning" onClick={() => props.handlePositionHinzufuegenClose()}>x</Badge>
                        </>
                        :
                        <Badge className="mt-2 mb-4" color="light" onClick={() => props.handlePositionHinzufuegen()}>Position erstellen</Badge>
                        }
                        </>
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