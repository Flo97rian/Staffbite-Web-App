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
import { settingAuthenticationForAdmin, settingDemoPlans, updateDemoEvent } from "../../../reducers/demo";
import { RegistrationForm, RegistrationFormAdmin } from "./Form/RegistrationFormAdmin";
import { AuthenticationFormEmployee } from "./Form/AuthenticationFormEmployee";
import { RegistrationFormEmployee } from "./Form/RegistrationFormEmployee";
import InputString from "../../../components/InputString";
import InputNumber from "../../../components/InputNumber";
import InputTime from "../../../components/InputTime";
import InputTimeWithSwitch from "../../../components/InputTimeWithSwitch";
import InfoLabel from "../../../components/InfoLabel";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../constants/InfoTexts";
import { settingShiftEnd, settingShiftName, settingShiftNumberOfEmployees, settingShiftStart } from "../../../reducers/userInput";
import { weekdays } from "../../../constants/Weekdays";
import { settingShiftplanChanged } from "../../../reducers/shiftplanChanged";
import { resettingTemporaryEventId } from "../../../reducers/temporary";

export const ModalApplyForShift = (props) => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({ShiftName: "", NumberOfEmployees: 0, ShiftStart: "", ShiftEnd: ""})
    const plans = useSelector(state => state.demo.demoPlans);
    const userInput = useSelector(state => state.userInput);
    const date = useSelector(state => state.date);
    const employee = useSelector(state => state.demo.demoEmployee);
    const event = useSelector(state => state.demo.demoPlans.find(event => event.id === state.temporary.eventId));
    const demoApplyForShift = useSelector(state => state.modal.demoApplyForShift);
    if(event) {
        let startHours = String(new Date(event.start).getHours());
        let startMinutes = String(new Date(event.start).getMinutes());
        startHours = startHours.length === 1 ? "0" + startHours : startHours;
        startMinutes = startMinutes.length === 1 ? startMinutes + "0" : startMinutes;
        let endHours = String(new Date(event.end).getHours());
        let endMinutes = String(new Date(event.end).getMinutes());
        endHours = endHours.length === 1 ? "0" + endHours : endHours;
        endMinutes = endMinutes.length === 1 ? endMinutes + "0" : endMinutes;
        let start = startHours + ":" + startMinutes;
        let end = endHours + ":" + endMinutes;

    const applyForShift = () => {
        const newApplicants = {...event.applicants};
        newApplicants[employee.id] = employee.name;

        let data = {
            id: event.id,
            title: event.title,
            start: event.start.toString(),
            end: event.end.toString(),
            display: "block",
            description: "Moin",
            NumberOfEmployees: event.NumberOfEmployees,
            backgroundColor: "#fb6340",
            borderColor: "#fb6340",
            textColor: "dark",
            notice: "",
            applicants: newApplicants,
            setApplicants: {},
            applicantsAfterPublish: {},
        }
        dispatch(resettingTemporaryEventId());
        dispatch(updateDemoEvent(data));
        dispatch(settingShiftplanChanged());
        dispatch(resettingModal());
    }

    const removeApplyFromShift = () => {
        const newApplicants = {...event.applicants};
        delete newApplicants[employee.id];

        let data = {
            id: event.id,
            title: event.title,
            start: event.start.toString(),
            end: event.end.toString(),
            display: "block",
            description: "Moin",
            NumberOfEmployees: event.NumberOfEmployees,
            backgroundColor: "#fb6340",
            borderColor: "#fb6340",
            textColor: "dark",
            notice: "",
            applicants: newApplicants,
            setApplicants: {},
            applicantsAfterPublish: {},
        }
        dispatch(resettingTemporaryEventId());
        dispatch(updateDemoEvent(data));
        dispatch(settingShiftplanChanged());
        dispatch(resettingModal());
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoApplyForShift} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                    <Row className="text-center mt-2">
                                        <Col>
                                            <h2>Auf Schicht bewerben</h2>
                                            <p hidden={!event.applicants[employee.id]}>Deine Verfügbarkeit für diese Schicht ist gespeichert.</p>
                                            <p hidden={!event.setApplicants[employee.id]}>Du bist für diese Schicht eingetragen.</p>
                                        </Col>
                                    </Row>
                                <Card className="bg-secondary border px-2 shadow-none">
                                <Row className="mt-3 mb-2">
                                    <Col>
                                        <InfoLabel description={INFO_SHIFTPLAN_SHIFT_NAME} title="Name der Schicht"/>
                                        <Input type="text" name="ShiftName" disabled value={event.title}></Input>
                                        <Row className="mt-2">
                                            <Col>
                                                <InfoLabel description={INFO_SHIFTPLAN_SHIFT_START} title="Beginn"/>
                                                <Input type="time" name="beginn" disabled value={start}></Input>
                                            </Col>
                                            <Col>
                                                <InfoLabel description={INFO_SHIFTPLAN_SHIFT_END} title="Ende"/>
                                                <Input type="time" name="ende" disabled value={end}></Input>
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
                                        <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                                        <Button hidden={!event.applicants[employee.id] || event.setApplicants[employee.id]} color="danger" onClick={() => removeApplyFromShift()}>Zurückziehen</Button>
                                        <Button hidden={event.applicants[employee.id] || event.setApplicants[employee.id]} color="success" onClick={() => applyForShift()}>
                                            Bewerben
                                        </Button>
                                </Col>
                            </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
return null;
}


