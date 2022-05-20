import React, {useEffect, useState} from "react";

import {
    Col,
    Row,
    Card,
    Button,
    UncontrolledCollapse,
    InputGroup,
    Input,
    FormGroup,
    Badge

} from "reactstrap"
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import InfoLabel from "./InfoLabel";
import ControlQualification from "./ControlQualification";
import Switch from "./Switch";
import Form from 'react-bootstrap/Form';
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_IS_ACTIVE, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_MONTHLY_WORKING_HOURES, INFO_EMPLOYEE_OVERTIME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK, INFO_EMPLOYEE_VACATION } from "../constants/InfoTexts";
import FormPositions from "./FormPositons";
import { FEEDBACK_INVALID_EMPLOYEE_NAME, FEEDBACK_VALID_EMPLOYEE_NAME } from "../constants/FeedbackText";
import { validName } from "./ValidInputs";
import { useSelector, useDispatch } from "react-redux";
import { resettingEmployeeName, resettingEmployeePositions, resettingUserInput, settingEmployeeIsActive, settingEmployeeIsFree, settingEmployeeName, settingEmployeePosition, settingEmployeePositions, settingEmployeeQualification, settingEmployeeShiftsPerWeek } from "../reducers/userInput";
import InputAddOn from "./InputAddOn";
import { thunkDeleteEmployee } from "../store/middleware/DeleteEmployee";
import { resettingModal } from "../reducers/modal";

const FormMitarbeiterBearbeiten = (props) => {
        const dispatch = useDispatch();
        const Employee = useSelector(state => state.DB.employees[state.temporary.employeeID]);
        const EmployeeID = useSelector(state => state.temporary.employeeID)
        const CompanyPositions = useSelector(state => state.Meta.schichten);
        const [editEmployeeName, setEditEmployeeName] = useState(false);
        const userInput = useSelector(state => state.userInput);
        const userPositions = useSelector(state => state.userInput.employeePositions);

        useEffect(() => {
            dispatch(settingEmployeePositions(Employee.position));
        }, []);

        return(
                <>
                    <Row className="m-2">
                        <Col>
                            <Row className="mb-4">
                                <Col>
                                <InfoLabel title="Vorname, Nachnachme" description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME}></InfoLabel>
                                <InputGroup>
                                <Input 
                                    type="text"
                                    invalid={(userInput.employeeName.length >= 30)}
                                    disabled={!editEmployeeName}
                                    placeholder={Employee.name}
                                    defaultValue={Employee.name || ""}
                                    value={userInput.employeeName}
                                    onChange={(event) => dispatch(settingEmployeeName(event.target.value))}>
                                    </Input>
                                    <InputAddOn editable={editEmployeeName} setEditable={setEditEmployeeName} declineChanges={resettingEmployeeName}/>
                                </InputGroup>
                                <small className="text-danger">
                                            {userInput.employeeName.length >= 30 ? "Wähle bitte einen kürzeren Namen." : ""}
                                </small>
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
                                        <InfoLabel title="E-Mail Adresse" description={INFO_EMPLOYEE_EMAIL_ADRESS}></InfoLabel>
                                        <InputGroup>
                                            <Input
                                                className="m-2"
                                                type="text"
                                                disabled={true}
                                                placeholder={Employee.email}
                                            />
                                        </InputGroup>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <InfoLabel title="Aktiv" description={INFO_EMPLOYEE_IS_ACTIVE}></InfoLabel>
                                                                    <Form>
                                                                        <Form.Check className="ml-5" custom type="switch" size="lg" defaultChecked={Employee.aktiv} onChange={(event) => dispatch(settingEmployeeIsActive(event.target.checked))}></Form.Check>
                                                                    </Form>
                                                            </FormGroup>           
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <InfoLabel title="Urlaub" description={INFO_EMPLOYEE_VACATION}></InfoLabel>
                                                                    <Form>
                                                                        <Form.Check className="ml-5" custom type="switch" size="lg" defaultChecked={Employee.frei} onChange={(event) => dispatch(settingEmployeeIsFree(event.target.checked))}></Form.Check>
                                                                    </Form>
                                                            </FormGroup>           
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Button 
                                                outline
                                                className="my-3"
                                                color="danger"
                                                size="sm"
                                                type="Button" 
                                                onClick={() => {
                                                    dispatch(thunkDeleteEmployee(EmployeeID));
                                                    dispatch(resettingUserInput());
                                                    dispatch(resettingModal());
                                                }}
                                            >
                                                Mitarbeiter löschen
                                            </Button>{' '}
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
                                        <FormGroup>
                                            <InfoLabel title="Erfahrung" description={INFO_EMPLOYEE_QUALIFIKATION}></InfoLabel>
                                            <Form.Control 
                                                as="select" 
                                                type="text" 
                                                className="form-control-alternative edit-event--description input-autosize form-control" 
                                                defaultValue={Employee.erfahrung} 
                                                onChange={(event) => dispatch(settingEmployeeQualification(event.target.value))}
                                            >
                                                <option>Anfänger</option>
                                                <option>Fortgeschritten</option>
                                                <option>Experte</option>
                                            </Form.Control>
                                        </FormGroup>
                                        <Row>
                                            <Col>
                                            
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
                                        <InfoLabel title="Schichten/Woche" description={INFO_EMPLOYEE_SHIFTS_PER_WEEK}></InfoLabel>
                                        <Input 
                                            type="number" 
                                            min={0} 
                                            className="form-control-alternative edit-event--description input-autosize form-control" 
                                            placeholder={Employee.schichtenwoche} 
                                            onChange={(event) => dispatch(settingEmployeeShiftsPerWeek(event.target.value))}
                                        />
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