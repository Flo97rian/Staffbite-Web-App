import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
    Button
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
            show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>
                        Mitarbeiter:innen bearbeiten
                    </h3>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormMitarbeiterBearbeiten mitarbeiterdaten={mitarbeiterdaten} {...props}></FormMitarbeiterBearbeiten>
                </Modal.Body>
                <hr className="my-4" />
                <Modal.Footer>
                        <Col xs={2}>
                            <Button outline color="danger" type="Button" onClick={() => props.handleDelete(mitarbeiterdaten.id)}>Entfernen</Button>{' '}
                        </Col>
                        <Col xs={2}>
                            <Button color="primary" type="Button" onClick={() => props.handleUpdate(mitarbeiterdaten)}> Aktualisieren</Button>{' '}
                        </Col>
                        <Col xs={1}></Col>
                </Modal.Footer>
            </Modal>
        )
    }
export default ModalMitarbeiterBearbeiten