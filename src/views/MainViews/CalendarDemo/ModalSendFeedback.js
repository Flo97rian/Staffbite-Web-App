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
import { deleteEmployee, resettingCouterForEmployees, settingApplicationsCounterForEmployee, settingAuthenticationForAdmin, settingDemoPlans, settingShiftsCounterForEmployee, updateDemoEvent } from "../../../reducers/demo";
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
import { isSameWeek } from "date-fns";
import { de } from "date-fns/locale";
import ReactGA from "react-ga";

export const ModalSendFeedback = (props) => {
    const dispatch = useDispatch();
    const [feedbackText, setFeedbackText] = useState("");
    const demoSendFeedback = useSelector(state => state.modal.demoSendFeedback);

    function GAFeedback(type) {
        ReactGA.event({
              category: 'Feedback',
              action: type
        })
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoSendFeedback} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Dein Feedback</h2>
                                        <p>
                                            Dir fehlt eine oder mehrere Funktionen, damit Staffbite perfekt für dich passt?
                                            <br/>
                                            Wähle die jeweiligen Felder aus oder schreibe uns eine Nachricht.
                                            <br/>
                                            Mir fehlt ...
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mx-3 mt-3">
                                    <Col className="ml-4">
                                        <p className="">
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Mitarbeiter App" onChange={(event) => event.target.checked ? GAFeedback("Mitarbeiter App"): null}></Input>eine Mitarbeiter App
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Urlaubsplaner" onChange={(event) => event.target.checked ? GAFeedback("Urlaubsplaner"): null}></Input>ein Urlaubsplaner
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Stundenkonten" onChange={(event) => event.target.checked ? GAFeedback("Stundenkonten"): null}></Input>ein Stundenkonto
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Reporting" onChange={(event) => event.target.checked ? GAFeedback("Reporting"): null}></Input>ein Reporting
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Druckfunktion" onChange={(event) => event.target.checked ? GAFeedback("Druckfunktion"): null}></Input>eine Druckfunktion
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Zeiterfassung" onChange={(event) => event.target.checked ? GAFeedback("Zeiterfassung"): null}></Input>eine Zeiterfassung
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Automatisierter Schichtplan" onChange={(event) => event.target.checked ? GAFeedback("Automatisierter Schichtplan"): null}></Input>eine automatisierte Schichtplanung
                                                </Col>
                                                <Col>
                                                    
                                                </Col>
                                            </Row>
                                            <Row className="mt-4 ml--5">
                                                <Col>
                                                    <Input type="textarea" placeholder="Schreib uns gerne eine Nachricht!" onChange={(event) => event.target.value}></Input>
                                                </Col>
                                            </Row>
                                        </p>
                                        </Col>
                                    </Row>
                </Modal.Body>
                <Modal.Footer>
                                <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                                <Button color="success" onClick={() => {
                                    GAFeedback(feedbackText);
                                    dispatch(resettingModal())
                                    }}>Abschicken</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
}


