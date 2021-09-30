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

const ModalSchichtTauschen = (props) => {
    const tag = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.plaene[props.plan].plan
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
                    Schicht tauschen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Form.Label>Schicht</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Form.Label>{shiftname}<br/>{tag}, {shiftplan[0][tag]} <br/>{shiftstart} - {shiftend}</Form.Label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => props.onTrade(props.modalkey)}> Tauschanfrage senden </Button>  
                    <Button onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtTauschen;