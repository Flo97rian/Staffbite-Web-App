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

export const ModalEmployees = (props) => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({ShiftName: "", NumberOfEmployees: 0, ShiftStart: "", ShiftEnd: ""})
    const Employees = useSelector(state => state.demo.demoEmployees);
    const demoEmployees = useSelector(state => state.modal.demoEmployees);

      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoEmployees} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Dein Team</h2>
                                    </Col>
                                </Row>
                                <Row className="m-2">
                                    <p>
                                        <Col>
                                            Name:
                                        </Col>
                                        <Col>
                                            
                                        </Col>
                                        <Col>
                                            
                                        </Col>
                                        </p>
                                    </Row>
                                <Card>
                                    <p>
                                    {Employees.length ? Employees.map(employee => {
                                        return (
                                            <Row className="m-2">
                                                <Col>
                                                    {employee.name}
                                                </Col>
                                                <Col>
                                                </Col>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <Row className="text-right">
                                                        <Col>
                                                            <Button size="sm"color="danger">Löschen</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>            
                                        )
                                    })
                                    :
                                    <></>
                                    }
                                    </p>
                                </Card>
                </Modal.Body>
                <Modal.Footer>
                                <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
}


