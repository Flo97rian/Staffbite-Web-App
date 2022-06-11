import React from "react";
import {
    Col,
    Row,
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { thunkStartAlg } from "../store/middleware/StartAlg";
import { thunkSendReminderForApplication } from "../store/middleware/SendReminderForApplication";

const ModalStartFilling = (props) => {
    const dispatch = useDispatch();
    const showBefuellungStarten = useSelector(state => state.modal.showBefuellungStarten);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const Employees = useSelector(state => state.DB.employees);

    const getNumberOfApplyedApplicants = () => {
        const EmployeeIds = Object.keys(Employees);
        const NumberOfAcitveEmployees = EmployeeIds.filter(id => Employees[id].aktiv).length;
        const ShiftplanZeitraum = Shiftplan.zeitraum;
        const NumberOfApplyedEmployees = EmployeeIds.filter(id => {
            if( Employees[id]?.bewerbungen[ShiftplanZeitraum] && 
                Employees[id]?.bewerbungen[ShiftplanZeitraum].length
              ) {
                return true;
              }
            return false;
        }).length;
        return (
            <>
            <Row>
                <Col>
                    <Form.Label>Bisher beworben: </Form.Label>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{NumberOfApplyedEmployees} / {NumberOfAcitveEmployees} Mitarbeiter <i className="fas fa-user-clock ml-2"></i></p>
                    <Button size="sm" color="success" onClick={() => dispatch(thunkSendReminderForApplication())}>Erinnerung schicken</Button>
                </Col>
                <Col>
                </Col>
            </Row>
        </>
        );
    }
    const startFilling = () => {
        const id = Shiftplan.id;
        dispatch(thunkStartAlg(id));
        dispatch(resettingModal())
        }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showBefuellungStarten} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Befüllung starten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1 mx-2">
                    <Row className="">
                        <Col xs={6}>
                            <Form.Label>Datum</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Befüllungart</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs={6}>
                        <p>{Shiftplan.zeitraum}</p>
                    </Col>
                    <Col xs={6}> 
                    <p>Standard</p>
                    </Col>
                </Row>
                    <br/>
                    {getNumberOfApplyedApplicants()}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => startFilling()}> Ausführen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalStartFilling;