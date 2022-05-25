import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import FormMitarbeiterErstellen from "./FormMitarbeiterErstellen";
import store  from "../store"
import { useSelector, useDispatch } from "react-redux";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK } from "../constants/InfoTexts";
import { resettingEmployeePositions, settingEmployeeEmail, settingEmployeeName, settingEmployeePosition, settingEmployeeQualification, settingEmployeeShiftsPerWeek } from "../reducers/userInput";
import InfoLabel from "./InfoLabel";
import {
    Button,
    Label,
    Col,
    Row,
    FormGroup,
    Input,
    Card,
    Badge,
    FormFeedback
} from "reactstrap";
import Form from 'react-bootstrap/Form';
import { resettingModal } from "../reducers/modal";
import { resettingUserInput } from "../reducers/userInput";
import { thunkRegisterEmployee } from "../store/middleware/RegisterEmployee";
import { settingMissingNewEmployeeEmail, settingMissingNewEmployeeName, settingMissingNewEmployeePosition } from "../reducers/ErrorMessages";

const ModalAddEmployee = (props) => {
    const dispatch = useDispatch();
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const CompanyPositions = useSelector(state => state.Meta.schichten);
    const userPositions = useSelector(state => state.userInput.employeePositions);
    const userInput = useSelector(state => state.userInput);
    const showErstellen = useSelector(state => state.modal.showErstellen);
    const emailhasAtChar = /[@]/;
    const emailhasDotChar = /[.]/;
    const namehasSpaceOrComma = /[, ]/

    useEffect(() => {
        if(invalidEmail) {
            setInvalidEmail(false);
        };
        if(invalidName) {
            setInvalidName(false);
        }

    }, [userInput])

    const addEmployee = () => {
        let NewEmployee = {};
        if( !namehasSpaceOrComma.test(userInput.employeeName)) {
            dispatch(settingMissingNewEmployeeName())
            setInvalidName(true);
        }

        if( !emailhasAtChar.test(userInput.employeeEmail) | 
            !emailhasDotChar.test(userInput.employeeEmail)
            ) {
                setInvalidEmail(true);
                dispatch(settingMissingNewEmployeeEmail())
            }

        if( userInput.employeePositions.length === 0) {
            dispatch(settingMissingNewEmployeePosition())
            }
        NewEmployee.name = userInput.employeeName;
        NewEmployee.email = userInput.employeeEmail;
        NewEmployee.position = userInput.employeePositions;
        NewEmployee.schichtenwoche = userInput.employeeShiftsPerWeek;
        NewEmployee.erfahrung = userInput.employeeQualification;
        NewEmployee.stundenlohn = 10;
        NewEmployee.zielmtleuro = 450;
        NewEmployee.zielmtlh = 45;

        if( namehasSpaceOrComma.test(userInput.employeeName) &&
            emailhasAtChar.test(userInput.employeeEmail) &&
            emailhasDotChar.test(userInput.employeeEmail) &&
            userInput.employeePositions.length > 0
        ) {
            dispatch(thunkRegisterEmployee(NewEmployee));
            dispatch(resettingModal())
        }
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal modal-secondary"
                    scrollable
                    show={showErstellen} 
                    onHide={() => {
                        dispatch(resettingModal());
                        dispatch(resettingUserInput());
                    }}
            >
                    <Label className="h2 m-3 text-center">Mitarbeiter einladen</Label>
                <Modal.Body className="pt-1">
                        <Row>
                            <Col className="mx-5">
                            <FormGroup>
                                    <Row>
                                    <Col>
                                        <FormGroup>
                                        <InfoLabel title="Vorname, Nachname *" description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME}></InfoLabel>
                                        <Input 
                                            invalid={invalidName}
                                            valid={namehasSpaceOrComma.test(userInput.employeeName)}
                                            type="text"
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeName(event.target.value))}    
                                        />
                                        <FormFeedback
                                        invalid
                                        >
                                            Trage einen Vor- & Nachnamen ein
                                        </FormFeedback>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <FormGroup>
                                        <InfoLabel title="E-Mail Adresse *" description={INFO_EMPLOYEE_EMAIL_ADRESS}></InfoLabel>
                                        <Input 
                                            invalid={invalidEmail}
                                            valid={emailhasAtChar.test(userInput.employeeEmail) && emailhasDotChar.test(userInput.employeeEmail)}
                                            type="text"
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeEmail(event.target.value))}
                                        />
                                        <FormFeedback
                                        invalid
                                        >
                                            Trage eine valide E-Mail Adresse ein.
                                        </FormFeedback>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                        <InfoLabel title="Erfahrung" description={INFO_EMPLOYEE_QUALIFIKATION}></InfoLabel>
                                        <Form.Control as="select" type="text" className="form-control-alternative edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingEmployeeQualification(event.target.value))}>
                                            <option>Anfänger</option>
                                            <option>Fortgeschritten</option>
                                            <option>Experte</option>
                                        </Form.Control>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                        <FormGroup>
                                        <InfoLabel title="Schichten/Woche" description={INFO_EMPLOYEE_SHIFTS_PER_WEEK}></InfoLabel>
                                        <Input 
                                            type="number"
                                            min={0}
                                            className=""
                                            onChange={(event) => dispatch(settingEmployeeShiftsPerWeek(event.target.value))}
                                        />
                                                                                </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                        <FormGroup>
                                            <InfoLabel description={INFO_EMPLOYEE_POSITIONS} title="Position"></InfoLabel>
                                            <Card>
                                            {userPositions.map((item, index) => 
                                                <Badge key={index} className="mx-2 my-1" color="success" onClick={() => dispatch(resettingEmployeePositions(item))}>{item}</Badge>
                                            )}
                                            {CompanyPositions.filter(position => userPositions.includes(position) === false).map((item, index) => 
                                                <Badge key={index} className="mx-2 my-1" color="secondary" onClick={() => dispatch(settingEmployeePosition(item))}>{item}</Badge>
                                            )}
                                            </Card>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Col xs={2}>
                        <Button 
                            color="link"
                            onClick={() => {
                                dispatch(resettingModal());
                                dispatch(resettingUserInput());
                            }}
                        >
                            Schließen 
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button color="success" onClick={() => addEmployee()}> Einladen</Button>
                  </Col>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalAddEmployee;