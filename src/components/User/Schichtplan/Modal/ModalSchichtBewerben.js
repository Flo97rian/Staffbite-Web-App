import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormNames from "../FormElements/FormNames";
import store from "../../../../store";

const ModalSchichtBewerben = (props) => {
    const tag = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.shiftplan.plan
    const applyedApplicants = shiftplan[row][tag].applicants
    const shiftname = shiftplan[row]["Wochentag"].ShiftName
    const shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    const shiftend = shiftplan[row]["Wochentag"].ShiftEnd
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Auf Schicht bewerben
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>Schicht</Form.Label>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Auf Schicht beworben</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Bewerbung zurückziehen</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>{shiftname}<br/>{tag}, {shiftplan[0][tag]} <br/>{shiftstart} - {shiftend}</Form.Label>
                        </Col>
                        <Col xs={5}>
                            {applyedApplicants
                            ?
                            <FormNames names={applyedApplicants}></FormNames>
                            :
                            <Form.Label>Leer</Form.Label>
                            }
                        </Col>
                        <Col xs={2}>
                            <Button variant="danger" onClick={() => props.onDelete(props.modalkey)}>X</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => props.onBewerben(props.modalkey)}> Bewerben </Button>  
                    <Button onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtBewerben;