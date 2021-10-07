import React from "react";
import {
    Col,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FormMitarbeiterErstellen from "../FormElements/FormMitarbeiterErstellen";
import store  from "../../../../store"

const ModalMitarbeiterErstellen = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: "showErstellen"})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mitarbeiter:innen hinzufügen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormMitarbeiterErstellen {...props}></FormMitarbeiterErstellen>
                </Modal.Body>
                <Modal.Footer>
                    <Col xs={2}>
                        <Button color="secondary"onClick={() => {store.dispatch({type: "CLOSE", payload: "showErstellen"})}}> Schließen </Button>
                    </Col>
                    <Col xs={2}>
                        <Button color="primary" onClick={() => props.handleRegister(props.modalkey)}> Speichern</Button>
                  </Col>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalMitarbeiterErstellen;