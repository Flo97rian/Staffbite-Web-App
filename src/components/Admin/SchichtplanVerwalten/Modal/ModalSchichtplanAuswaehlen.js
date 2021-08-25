import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormSchichtplanImportieren from "../../SchichtplanErstellen/FormElements/FormSchichtplanImportieren";
import ModalSchichtAuswaehlen from "./ModalSchichtAuswaehlen";
import store from "../../../../store";

const ModalSchichtplanVeroeffentlichen = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.keytrue})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schichtplan auswählen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                        <Col xs={3}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Status</Form.Label>
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Importieren</Form.Label>
                        </Col>
                        <Col xs={3}>
                            <Form.Label>Löschen</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                    <FormSchichtplanImportieren {...props}></FormSchichtplanImportieren>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {store.dispatch({type: "CLOSE", payload: props.keytrue})}}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtplanVeroeffentlichen;