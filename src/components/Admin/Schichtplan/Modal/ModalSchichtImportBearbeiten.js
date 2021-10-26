import React from "react";
import {
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtBearbeiten from "../Form/SchichtBearbeiten";
import store from "../../../../store"

const ModalSchichtImportBearbeiten = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schicht bearbeiten
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SchichtBearbeiten {...props} modalkey={props.modalkey}></SchichtBearbeiten>
                </Modal.Body>
                <Modal.Footer>
                    <Button  outline color="danger" onClick={() => props.handleLoeschen(props.modalkey)}> Löschen </Button>
                    <Button color="success" onClick={() => props.handleSchichtBearbeiten(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtImportBearbeiten 