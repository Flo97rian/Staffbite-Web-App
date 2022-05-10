import React from "react";

import {
    Col,
    Row,
    Card,
    Button,
    UncontrolledCollapse
} from "reactstrap"
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import ControlQualification from "./ControlQualification";
import Switch from "./Switch";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_IS_ACTIVE, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_MONTHLY_WORKING_HOURES, INFO_EMPLOYEE_OVERTIME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK, INFO_EMPLOYEE_VACATION } from "../constants/InfoTexts";
import FormPositions from "./FormPositons";
import { FEEDBACK_INVALID_EMPLOYEE_NAME, FEEDBACK_VALID_EMPLOYEE_NAME } from "../constants/FeedbackText";
import { validName } from "./ValidInputs";

const FormMitarbeiterBearbeiten = (props) => {
        const employee = props.mitarbeiterdaten
        return(
                <>
                    <Row className="m-2">
                        <Col>
                            <Row>
                                <Col>
                                <InputString info={true} label="Vorname, Nachname" name="name" valid={FEEDBACK_VALID_EMPLOYEE_NAME} invalid={FEEDBACK_INVALID_EMPLOYEE_NAME} value={props.userInput.name} placeholder={employee["name"]} onChange={(e) => props.onChange(e)}></InputString>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 id="collapsToggleEmployeeDetails" className="" style={{"cursor": "pointer"}}>
                                        Persönliche Daten
                                        {' '}
                                        <i className="fas fa-angle-down ml-2 text-right"/>
                                    </h3>
                                </Col>  
                            </Row>
                            <Row>
                                <Col>
                                    <UncontrolledCollapse toggler={"#collapsToggleEmployeeDetails"}>
                                        <Card className="p-4 bg-secondary shadow-none border" >
                                            <InputString label="E-Mail Adresse" name="email"  value={employee["email"]} disabled={true}></InputString>
                                            <Row>
                                                <Col>
                                                    <Switch info={true} description={INFO_EMPLOYEE_IS_ACTIVE} type="switch" label="Aktiv" name="aktiv" value={employee["aktiv"]} onChange={(e) => props.onChange(e)}></Switch>
                                                </Col>
                                                <Col>
                                                    <Switch info={true} description={INFO_EMPLOYEE_VACATION} type="switch" label="Urlaub" name="frei" value={employee["frei"]} onChange={(e) => props.onChange(e)}></Switch>
                                                </Col>
                                            </Row>
                                            <Button outline className="my-3" color="danger" size="sm" type="Button" onClick={() => props.handleDelete(props.mitarbeiterdaten.id)}>Mitarbeiter löschen</Button>{' '}
                                        </Card>
                                    </UncontrolledCollapse>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 id="collapsToggleCompanyEmployee" style={{"cursor": "pointer"}}>
                                        Betriebliche Einstellungen 
                                        {' '}
                                        <i className="fas fa-angle-down ml-2 text-right"/>
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <UncontrolledCollapse toggler={"#collapsToggleCompanyEmployee"}>

                                    <Card className="p-4 bg-secondary shadow-none border">
                                        <ControlQualification label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}/>
                                        <FormPositions {...props}></FormPositions>
                                        <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                                    </Card>
                                    </UncontrolledCollapse>
                                </Col>
                            </Row>
                            <Row hidden={true}>
                                <Col>
                                    <h3 id="collapsToggleCompanyEmployee" style={{"cursor": "pointer"}}>
                                        Stundenkonto
                                        {' '}
                                        <i className="fas fa-angle-down ml-2 text-right"/>
                                    </h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <UncontrolledCollapse toggler={"#collapsToggleCompanyEmployee"}>

                                    <Card className="p-4 bg-secondary shadow-none border">
                                        <ControlQualification label="Erfahrung" name="erfahrung"  {...props} defaultVal={employee["erfahrung"]}/>
                                        <FormPositions {...props}></FormPositions>
                                        <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder={employee["schichtenwoche"]} onChange={(e) => props.onChange(e)}></InputNumber>
                                    </Card>
                                    </UncontrolledCollapse>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
        )
    }
export default FormMitarbeiterBearbeiten;