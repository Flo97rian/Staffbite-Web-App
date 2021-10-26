import React from "react";
import {
    Col,
    Row,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BefuellungStarten from "../Form/BefuellungStarten";
import store from "../../../../store";

const ModalBefuellungStarten = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Zusammenfassung
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Button color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                    <Button color="success" onClick={() => props.startAlg(props.modalkey)}> Ausführen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalBefuellungStarten;