import React from "react";
import {
    Button,
    Label,
    Row,
    Col
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { settingTradeShift } from "../reducers/Shiftplan";
import { thunkUpdateTradeShift } from "../store/middleware/UpdateTradeShift";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";


const ModalTradeShift = (props) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const Employee = useSelector(state => state.DB.employee);
    const tradeShift = useSelector(state => state.modal.tradeShift);
    const ShiftName = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftStart = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftEnd = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftEnd);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice);
    const setApplicants = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].setApplicants);
    

    const setTradeShift = () => {
        dispatch(settingTradeShift({index: index, day: day, employeeId: Employee.SK}))
        dispatch(thunkUpdateTradeShift());
        dispatch(resettingModal())
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={tradeShift} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schichtdetails</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                <Row className="mx-4 mt-3">
                        <Col xs={6}>
                            <InfoLabel title="Schicht"></InfoLabel>
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

                    <Row hidden={!Object.keys(setApplicants).includes(Employee.SK)} className="mx-4">
                        <Col xs={6}>
                            <InfoLabel title="Eingetragen"/>
                        </Col>
                        <Col xs={6}>
                            <p>{Employee.name}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => setTradeShift()}> Tauschanfrage senden </Button>  
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalTradeShift;