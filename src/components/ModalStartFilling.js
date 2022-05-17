import React from "react";
import {
    Col,
    Row,
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BefuellungStarten from "./FormStartFilling";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalStartFilling = (props) => {
    const dispatch = useDispatch();
    const showBefuellungStarten = useSelector(state => state.modal.showBefuellungStarten);
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
                <Modal.Body className="pt-1">
                    <Row className="text-center">
                        <Col xs={6}>
                            <Form.Label>Datum</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Befüllungart</Form.Label>
                        </Col>
                    </Row>
                    <BefuellungStarten {...props}></BefuellungStarten>
                    <br/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => props.startAlg(props.modalkey)}> Ausführen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalStartFilling;