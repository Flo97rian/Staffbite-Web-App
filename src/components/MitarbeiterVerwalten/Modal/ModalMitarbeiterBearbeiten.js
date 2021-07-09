import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
    Row
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
                        <Col xs={3}>
                            <Button onClick={() => this.props.handleUpdate(this.props.mitarbeiterdaten)}> Aktualisieren</Button>
                        </Col>
                        <Col xs={3}>
                            <Button variant="danger" onClick={() => this.props.handleDelete(this.props.mitarbeiterdaten.id)}> Löschen</Button>
                        </Col>
                        <Col xs={3}>
                            <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                        </Col>
                </Modal.Footer>
            </Modal>
        )
    }
}