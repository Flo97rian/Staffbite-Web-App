import React from "react";

import {
    Col,
    Row,
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import Switch from "../../../Application/functionalComponents/Switch";
import Form from 'react-bootstrap/Form';
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_IS_ACTIVE, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_MONTHLY_WORKING_HOURES, INFO_EMPLOYEE_OVERTIME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK, INFO_EMPLOYEE_VACATION } from "../../../../constants/InfoTexts";
import FormPositions from "./FormPositons";
import InputStringValid from "./InputStringValid";
import { FEEDBACK_INVALID_EMPLOYEE_NAME, FEEDBACK_VALID_EMPLOYEE_NAME } from "../../../../constants/FeedbackText";
import { validName } from "../../../Application/functionalComponents/ValidInputs";

const FormMitarbeiterBearbeiten = (props) => {
        const employee = props.mitarbeiterdaten
        return(
            <>
                {props.meta.stundenerfassung ?
                    <>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Switch info={true} description={INFO_EMPLOYEE_IS_ACTIVE}   type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                        <p className="lead">Persönliche Daten</p>
                        <InputStringValid info={true} description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME} label="Vorname, Nachname" name="name" placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputStringValid>
                        <br/>
                        <InputString info={true} description={INFO_EMPLOYEE_EMAIL_ADRESS} label="E-Mail Adresse" name="email"  placeholder={employee["email"]}></InputString>
                        <br/>
                        <InputNumber info={true} description={INFO_EMPLOYEE_HOURLY_WAGES} label="Stundenlohn in €" name="stundenlohn"  placeholder={employee["stundenlohn"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber info={true} description={INFO_EMPLOYEE_MONTHLY_INCOME}  label="Gehalt mtl. in €" name="zielmtleuro"  placeholder={employee["zielmtleuro"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        <InputNumber info={true} description={INFO_EMPLOYEE_MONTHLY_WORKING_HOURES}  label="Ziel mtl. (h)" name="zielmtlh"  placeholder={employee["zielmtlh"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <Form.Label><p>betriebliche Einstellungen</p></Form.Label>
                        <ControlErfahrung info={true} description={INFO_EMPLOYEE_QUALIFIKATION}  label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <br/>
                        <InputString info={true} description={INFO_EMPLOYEE_POSITIONS} label="Position" name="position" placeholder={employee["position"]} onChange={(e) => props.onChange(e)}></InputString>
                        <br/>
                        <Switch info={true} description={INFO_EMPLOYEE_VACATION}  type="switch" label="Frei" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <Switch info={true} description={INFO_EMPLOYEE_OVERTIME} type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        <br/>
                        <br/>
                        <InputNumber info={true} description={INFO_EMPLOYEE_SHIFTS_PER_WEEK} label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        <br/>
                        </Col>
                    </Row>
                </>
                :
                <>
                <Row className="text-center">
                        <Col xs={12}>
                            <Switch info={true} description={INFO_EMPLOYEE_IS_ACTIVE} type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5}>
                        <p className="lead">Persönliche Daten</p>
                        <InputStringValid info={true} label="Vorname, Nachname" name="name" valid={FEEDBACK_VALID_EMPLOYEE_NAME} invalid={FEEDBACK_INVALID_EMPLOYEE_NAME} isValid={validName(props.userInput.name)} currentValue={props.userInput.name} placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputStringValid>
                        <InputString label="E-Mail Adresse" name="email"  value={employee["email"]}></InputString>
                        <Switch info={true} description={INFO_EMPLOYEE_VACATION} type="switch" label="Urlaub" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                        <Switch  info={true} description={INFO_EMPLOYEE_OVERTIME} type="switch" label="Überstunden" name="ueberstunden" value={employee["ueberstunden"]} onChange={(e) => props.onChange(e)}></Switch>
                        </Col>
                        <Col xs={2}></Col>
                        <Col xs={5} >
                        <p className="lead">Betriebliche Einstellungen</p>
                        <ControlErfahrung label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}></ControlErfahrung>
                        <FormPositions {...props}></FormPositions>
                        <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                        </Col>
                    </Row>
                </>
                }
            </>
        )
    }
export default FormMitarbeiterBearbeiten;