import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
} from "reactstrap"
import Button from 'react-bootstrap/Button';

import FormMitarbeiterBearbeiten from "../FormElements/FormMitarbeiterBearbeiten"

export default class ModalMitarbeiterBearbeiten extends React.PureComponent {
    render() {
        return (
            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.keytrue} onHide={() => this.props.onHide(this.props.modalkey)}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mitarbeiter:innen bearbeiten
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormMitarbeiterBearbeiten mitarbeiterdaten={this.props.mitarbeiterdaten} {...this.props}></FormMitarbeiterBearbeiten>
                </Modal.Body>
                <Modal.Footer>
                <Col xs={6}>
                    </Col>
                    <Col xs={6}>
                        <Button onClick={() => this.props.handleUpdate(this.props.mitarbeiterdaten)}> Aktualisieren</Button>
                        <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        )
    }
}