import {useEffect, useRef, useState} from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Input,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import { removeShift, resettingDummyShifts, updateDemoEvent } from "../../../reducers/demo";
import InputTime from "../../../components/InputTime";
import InputTimeWithSwitch from "../../../components/InputTimeWithSwitch";
import InfoLabel from "../../../components/InfoLabel";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../constants/InfoTexts";
import { settingShiftplanChanged } from "../../../reducers/shiftplanChanged";
import { resettingTemporaryEventId } from "../../../reducers/temporary";
import EmployeesDnD from "./Form/EmployeesDnD";

export const ModalEditShift = (props) => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({ShiftName: "", NumberOfEmployees: 0, ShiftStart: "", ShiftEnd: ""})
    const date = useSelector(state => state.date);
    const event = useSelector(state => state.demo.demoPlans.find(event => event.id === state.temporary.eventId));
    const [showEmployees, setShowEmployees] = useState(event?.extendedProps?.showEmployee || false );
    const demoEditShift = useSelector(state => state.modal.demoEditShift);
    const DnDRef = useRef();

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

    const editShift = () => {
        let start = new Date(date.start)
        if(userForm.ShiftStart !== "") {
            start = new Date(event.start);
            start.setHours(userForm.ShiftStart.split(":")[0])
            start.setMinutes(userForm.ShiftStart.split(":")[1]) 
        }
        if(userForm.ShiftStart === "") {
            start = new Date(event.start);
        }

        let end = new Date(date.start);
        if(userForm.ShiftEnd !== "") {
            if(userForm.ShiftEnd === "on") {
                end = new Date(event.start);
                end.setHours("24")
                end.setMinutes("00")
            }
            if(userForm.ShiftEnd !== "on") {
                end = new Date(event.start);
                end.setHours(userForm.ShiftEnd.split(":")[0])
                end.setMinutes(userForm.ShiftEnd.split(":")[1])
            }
        }

        if(userForm.ShiftEnd === "") {
            end = new Date(event.end);
        }

        let shiftName = "";
        if(userForm.ShiftName !== "") {
            shiftName = userForm.ShiftName;
        }

        if(userForm.ShiftName === "") {
            shiftName = event.title;
        }

        let numberOfEmployees
        if(userForm.NumberOfEmployees !== 0) {
            numberOfEmployees = userForm.NumberOfEmployees;
        }

        if(userForm.NumberOfEmployees === 0) {
            numberOfEmployees = event.NumberOfEmployees;
        }

        let updateSetApplicants = DnDRef.current;
        let newSetApplicants = {};
        if(updateSetApplicants) {
            updateSetApplicants.forEach(applicant => {
                let applicantId = applicant.id.substring(1);
                let applicantName = applicant.content;
                newSetApplicants[applicantId] = applicantName;
            })
        }
        dispatch(resettingDummyShifts());
        

        let data = {
            id: event.id,
            title: shiftName,
            start: start.toString(),
            end: end.toString(),
            display: "block",
            description: "Moin",
            NumberOfEmployees: numberOfEmployees,
            backgroundColor: "#fb6340",
            borderColor: "#fb6340",
            textColor: "dark",
            notice: "",
            applicants: event.applicants,
            setApplicants: newSetApplicants,
            applicantsAfterPublish: {},
        }
        props.updateStepIndex(true);
        dispatch(resettingTemporaryEventId());
        dispatch(updateDemoEvent(data));
        dispatch(settingShiftplanChanged());
        dispatch(resettingModal());


    }

    const handleRemoveShift = () => {
        dispatch(removeShift(event.id));
        dispatch(resettingTemporaryEventId());
        dispatch(settingShiftplanChanged());
        dispatch(resettingModal());
    }

    const handleCloseModal = () => {
        dispatch(resettingDummyShifts());
        dispatch(resettingModal());
    }

      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoEditShift} onHide={() => handleCloseModal()}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                    <div id="editfirstShift">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Schicht bearbeiten</h2>
                                    </Col>
                                </Row>
                                <h3 onClick={() => setShowEmployees(!showEmployees)}>
                                    Allgemeine Einstellungen
                                    <i className="fas fa-angle-down fas-sm ml-2 text-right"/>
                                </h3>
                                <Collapse isOpen={!showEmployees}>
                                <Card className="bg-secondary border px-2 shadow-none">
                                <Row className="mt-3">
                                    <Col>
                                        <InfoLabel description={INFO_SHIFTPLAN_SHIFT_NAME} title="Name der Schicht"/>
                                        <Input type="text" name="ShiftName" placeholder={event.title} onChange={(event) => setUserForm({...userForm, ShiftName: event.target.value})}></Input>
                                        <Row className="mt-2">
                                            <Col>
                                            <InfoLabel info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} title="Anzahl benötigter Mitarbeiter"/>
                                                <Input type="number" placeholder={event.NumberOfEmployees} min="0" name="anzahl" onChange={(event) => setUserForm({...userForm, NumberOfEmployees: event.target.value})}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col xs="12" md="6">
                                                <InputTime info={true} placeholder={start} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn" onChange={(event) => setUserForm({...userForm, ShiftStart: event.target.value})}></InputTime>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <InputTimeWithSwitch info={true} placeholder={end} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" onChange={(event) => setUserForm({...userForm, ShiftEnd: event.target.value})}></InputTimeWithSwitch>
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
                            </Collapse>
                            <h3 onClick={() => setShowEmployees(!showEmployees)}>
                                Mitarbeiter 
                                <i className="fas fa-angle-down fas-sm ml-2 text-right"/>
                            </h3>
                            <Collapse isOpen={showEmployees}>
                                <EmployeesDnD ref={DnDRef}/>
                            </Collapse>
                            <Row className="mt-3">
                                <Col>
                                        <Row className="text-left">
                                            <Col>
                                                <Button color="link" onClick={() => handleRemoveShift()}>
                                                    Löschen
                                                </Button>
                                            </Col>
                                        </Row>
                                </Col>
                                <Col>
                                    <Row className="text-right">
                                            <Col>
                                                <Button color="link" onClick={() => handleCloseModal()}>
                                                    Schließen
                                                </Button>
                                                <Button color="primary" onClick={() => editShift()}>
                                                    Schicht ändern
                                                </Button>
                                            </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </div>
                </Modal.Body>
            </Modal>
            </>
        );
    }
return null;
}


