import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Input,
    Label,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { AuthenticationFormAdmin } from "./Form/AuthenticationFormAdmin";
import { settingAuthenticationForAdmin, settingDemoPlans } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";
import InputString from "../../../components/InputString";
import InputNumber from "../../../components/InputNumber";
import ReactGA from "react-ga";
import InputTime from "../../../components/InputTime";
import InputTimeWithSwitch from "../../../components/InputTimeWithSwitch";
import InfoLabel from "../../../components/InfoLabel";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../constants/InfoTexts";
import { settingShiftEnd, settingShiftName, settingShiftNumberOfEmployees, settingShiftStart } from "../../../reducers/userInput";
import { weekdays } from "../../../constants/Weekdays";
import { settingShiftplanChanged } from "../../../reducers/shiftplanChanged";

export const ModalAddShift = (props) => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({ShiftName: "", NumberOfEmployees: 0, ShiftStart: "", ShiftEnd: "", ShiftDate: ""})
    const plans = useSelector(state => state.demo.demoPlans);
    const userInput = useSelector(state => state.userInput);
    const date = useSelector(state => state.date);
    const demoAddShift = useSelector(state => state.modal.demoAddShift);
    const addShift = () => {
        let start;
        let end;
        console.log(userForm);
        if(props.isListView) {
            start = new Date(userForm.ShiftDate);
            end = new Date(date.start);
        }

        if(!props.isListView) {
            start = new Date(date.start); 
            end = new Date(date.start);   
        }
        start.setHours(userForm.ShiftStart.split(":")[0])
        start.setMinutes(userForm.ShiftStart.split(":")[1])
        end.setHours(userForm.ShiftEnd.split(":")[0])
        end.setMinutes(userForm.ShiftEnd.split(":")[1])
        let data = {
            id: plans.length,
            title: userForm.ShiftName,
            start: start.toString(),
            end: end.toString(),
            display: "block",
            description: "Moin",
            NumberOfEmployees: userForm.NumberOfEmployees,
            backgroundColor: "#fb6340",
            borderColor: "#fb6340",
            textColor: "dark",
            notice: "",
            applicants: {},
            setApplicants: {},
            applicantsAfterPublish: {},
        }
        ReactGA.event({
            category: 'Demo',
            action: "Create Shift"
        });
        dispatch(settingDemoPlans([...plans, data]))
        dispatch(settingShiftplanChanged());
        dispatch(resettingModal());

    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoAddShift} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Schicht erstellen</h2>
                                       {!plans.length ? <p>Erstelle deine erste Schicht</p> : <></> }
                                    </Col>
                                </Row>
                                <Card className="bg-secondary px-2 shadow-none border-none">
                                <Row className="mt-3">
                                    <Col>
                                        <InfoLabel description={INFO_SHIFTPLAN_SHIFT_NAME} title="Name der Schicht"/>
                                        <Input type="text" name="ShiftName" onChange={(event) => setUserForm({...userForm, ShiftName: event.target.value})}></Input>
                                        <Row className="mt-2">
                                            <Col>
                                            <InfoLabel info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} title="Anzahl benötigter Mitarbeiter"/>
                                                <Input type="number" placeholder="" min="0" name="anzahl" onChange={(event) => setUserForm({...userForm, NumberOfEmployees: event.target.value})}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col xs="12" md="6">
                                                <InfoLabel title="Beginn" description={INFO_SHIFTPLAN_SHIFT_START}></InfoLabel>
                                                <Input hidden={!props.isListView} type="date" className=" edit-event--description input-autosize form-control" name="beginn" defaultValue="" onChange={(event) => setUserForm({...userForm, ShiftDate: event.target.value})}></Input>
                                                <Input type="time" className=" edit-event--description input-autosize form-control" name="beginn" defaultValue="" onChange={(event) => setUserForm({...userForm, ShiftStart: event.target.value})}></Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <InputTimeWithSwitch info={true} placeholder="" description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" onChange={(event) => setUserForm({...userForm, ShiftEnd: event.target.value})}></InputTimeWithSwitch>
                                            </Col>
                                        </Row>
                                        {/*<Row>
                                            <Col>
                                                <InfoLabel title={"Wiederholen"}/>
                                                <Input type="select" className=" edit-event--description input-autosize form-control" onChange={(event) => handleSelectRepeat(event.target.value)}>
                                                    <option key={"Ohne"} value={"Ohne"}>Ohne</option>
                                                    <option key={"isDayly"} value={"Täglich"} selected={userInputIsDayly}>Täglich</option>
                                                    <option key={"customRepeat"} value={"Eigene"} selected={customRepeat}>Eigene</option>
                                                </Input>
                                                <Row>
                                                    <Col>
                                                        <Collapse isOpen={customRepeat}>
                                                            <div className="m-4">
                                                            <Pagination>
                                                                {weekdays.map((weekday, index) => {
                                                                    return (
                                                                        <PaginationItem key={index} active={userInputCustomDays.includes(weekday) ? true: false}>
                                                                            <PaginationLink onClick={() => handleCustomDays(weekday)}>
                                                                                {weekday.substring(0, 2)}
                                                                            </PaginationLink>
                                                                        </PaginationItem>
                                                                    )
                                                                })}
                                                            </Pagination>
                                                            </div>
                                                        </Collapse>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        */}
                                    </Col>
                                </Row>
                            </Card>
                            <Row className="text-right">
                                <Col>
                                    <Button color="link" onClick={() => dispatch(resettingModal())}>
                                        Schließen
                                    </Button>
                                    <Button color="success" onClick={() => addShift()}>
                                        Schicht erstellen
                                    </Button>
                                </Col>
                            </Row>
                </Modal.Body>
            </Modal>
            </>
        );
    }

