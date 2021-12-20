import React from "react";
import {
    Button,
    Label
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
                    className="modal-secondary"
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
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