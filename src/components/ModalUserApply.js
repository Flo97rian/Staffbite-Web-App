import React from "react";
import {
    Label,
    Button,
    Row,
    Col
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../store";
import ShiftDetails from "./UserShiftDetails";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { deleteApplicant, settingApplicant } from "../reducers/Shiftplan";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import FormNames from "./FormNames";


const ModalUserApply = (props) => {
    const dispatch = useDispatch();
    const userApply = useSelector(state => state.modal.userApply);
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const Employee = useSelector(state => state.DB.employee);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const ShiftName = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftStart = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftEnd = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftEnd);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice);
    const Applicants = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].applicants);

    function setApplication () {
        dispatch(settingApplicant({index: index, day: day, Employee: {SK: Employee.SK, name: Employee.name}}))
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
    }

    function includesUser() {
        return Object.keys(Shiftplan.plan[index][day].applicants).includes(Employee.SK)
    }

    const deleteApplication = () => {
        dispatch(deleteApplicant({index: index, day: day, employeeId: Employee.SK}))
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
      }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={userApply} onHide={() => dispatch(resettingModal())}
            >
                    <Label className="h2 m-3 text-center">In Schicht eintragen</Label>
                <Modal.Body className="pt-1">
                    <Row className="mx-4 mt-3">
                        <Col xs={6}>
                            <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                        </Col>
                        <Col xs={6}>
                            <p className=" mt-0">{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                        </Col>
                    </Row>

                    <Row hidden={!ShiftNotice} className="mx-4">
                        <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                        </Col>
                        <Col xs={6}>
                            <p className="font-weight-bold">
                                {ShiftNotice}
                            </p>
                        </Col>
                    </Row>

                    <Row hidden={!Object.keys(Applicants).includes(Employee.SK)} className="mx-4">
                        <Col xs={6}>
                            <InfoLabel title="Bewerber"/>
                        </Col>
                        <Col xs={6}>
                            <p>Deine Verfübarkeit ist gespeichert.</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    {includesUser()
                    ?
                    <Button className="" color="danger" onClick={() => deleteApplication()}>Bewerbung zurückziehen</Button>
                    :
                    <Button color="success" onClick={() => setApplication()}> Eintragen </Button>  
                    }
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalUserApply;