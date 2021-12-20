import React from "react";
import {
    Col,
    Button,
    Label
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
                    className="modal modal-secondary"
                    scrollable
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: "showErstellen"})}}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Mitarbeiter einladen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormMitarbeiterErstellen {...props}></FormMitarbeiterErstellen>
                </Modal.Body>
                <Modal.Footer>
                    <Col xs={2}>
                        <Button color="link"onClick={() => {store.dispatch({type: "CLOSE", payload: "showErstellen"})}}> Schließen </Button>
                    </Col>
                    <Col xs={2}>
                        <Button color="success" onClick={() => props.handleRegister(props.modalkey)}> Einladen</Button>
                  </Col>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalMitarbeiterErstellen;