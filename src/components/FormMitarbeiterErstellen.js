import React, {useEffect} from "react";
import {
    Col,
    Row,
    FormGroup,
    Input,
    Card,
    Badge
} from "reactstrap";
import InputString from "./InputString";
import InputStringValid from "./InputStringValid";
import InfoLabel from "./InfoLabel";
import InputNumber from "./InputNumber";
import Form from 'react-bootstrap/Form';
import ControlQualification from "./ControlQualification";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK } from "../constants/InfoTexts";
import { FEEDBACK_VALID_EMPLOYEE_EMAIL, FEEDBACK_INVALID_EMPLOYEE_EMAIL, FEEDBACK_VALID_EMPLOYEE_NAME, FEEDBACK_INVALID_EMPLOYEE_NAME } from "../constants/FeedbackText";
import FormPositions from "./FormPositons";
import { getMeta, getStundenerfassung, validName, validEmail } from "./ValidInputs";
import { useSelector, useDispatch } from "react-redux";
import { resettingEmployeePositions, settingEmployeeEmail, settingEmployeeName, settingEmployeePosition, settingEmployeeQualification, settingEmployeeShiftsPerWeek } from "../reducers/userInput";

function FormMitarbeiterErstellen (props) {
        const dispatch = useDispatch();
        const CompanyPositions = useSelector(state => state.Meta.schichten);
        const userInput = useSelector(state => state.userInput)
        const userPositions = useSelector(state => state.userInput.employeePositions);
        const emailhasAtChar = /[@]/;
        const emailhasDotChar = /[.]/;
                return(
                    <>
                        <Row>
                            <Col xs={1}>
                            </Col>
                            <Col xs={10}>
                            <FormGroup>
                                    <Row>
                                        <InfoLabel title="Vorname, Nachname *" description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME}></InfoLabel>
                                        <Input 
                                            type="text"
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeName(event.target.value))}    
                                        />
                                    </Row>
                                    <Row className="mt-3">
                                        <InfoLabel title="E-Mail Adresse *" description={INFO_EMPLOYEE_EMAIL_ADRESS}></InfoLabel>
                                        <Input 
                                            type="text"
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeEmail(event.target.value))}
                                        />
                                    </Row>
                                    <Row className="mt-3">
                                        <InfoLabel title="Erfahrung" description={INFO_EMPLOYEE_QUALIFIKATION}></InfoLabel>
                                        <Form.Control as="select" type="text" className="form-control-alternative edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingEmployeeQualification(event.target.value))}>
                                            <option>Anfänger</option>
                                            <option>Fortgeschritten</option>
                                            <option>Experte</option>
                                        </Form.Control>
                                    </Row>
                                    <Row className="mt-3">
                                        <InfoLabel title="Schichten/Woche" description={INFO_EMPLOYEE_SHIFTS_PER_WEEK}></InfoLabel>
                                        <Input 
                                            type="number"
                                            min={0}
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeShiftsPerWeek(event.target.value))}
                                        />
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="mx-0 px-0">
                                            <InfoLabel description={INFO_EMPLOYEE_POSITIONS} title="Position"></InfoLabel>
                                            <Card>
                                            {userPositions.map((item, index) => 
                                                <Badge key={index} className="mx-2 my-1" color="success" onClick={() => dispatch(resettingEmployeePositions(item))}>{item}</Badge>
                                            )}
                                            {CompanyPositions.filter(position => userPositions.includes(position) === false).map((item, index) => 
                                                <Badge key={index} className="mx-2 my-1" color="secondary" onClick={() => dispatch(settingEmployeePosition(item))}>{item}</Badge>
                                            )}
                                            </Card>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xs={1}>
                            </Col>
                        </Row>
                        </>
            )   
}

export default FormMitarbeiterErstellen;