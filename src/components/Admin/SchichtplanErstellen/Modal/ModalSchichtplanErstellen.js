import React from "react";
import {
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FormSchichtplanErstellen from "../FormElements/FormSchichtplanErstellen";
import store from "../../../../store";

const ModalSchichtplanErstellen = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schichtplan erstellen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSchichtplanErstellen {...props}></FormSchichtplanErstellen>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="secondary" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                  <Button color="success" onClick={() => props.onSave(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtplanErstellen