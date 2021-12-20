import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
    Button,
    Label
} from "reactstrap"

import FormMitarbeiterBearbeiten from "../FormElements/FormMitarbeiterBearbeiten"
import store from "../../../../store";

const ModalMitarbeiterBearbeiten = (props) => {
    
        const mitarbeiterdaten = props.handleFilter(props.modalkey);
        return (
            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            className="modal-secondary"
            show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
               <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Mitarbeiter bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormMitarbeiterBearbeiten mitarbeiterdaten={mitarbeiterdaten} {...props}></FormMitarbeiterBearbeiten>
                </Modal.Body>
                <hr className="my-4" />
                <Modal.Footer>
                            <Button outline color="danger" type="Button" onClick={() => props.handleDelete(mitarbeiterdaten.id)}>Entfernen</Button>{' '}
                            <Button color="primary" type="Button" onClick={() => props.handleUpdate(mitarbeiterdaten)}> Aktualisieren</Button>{' '}
                </Modal.Footer>
            </Modal>
        )
    }
export default ModalMitarbeiterBearbeiten