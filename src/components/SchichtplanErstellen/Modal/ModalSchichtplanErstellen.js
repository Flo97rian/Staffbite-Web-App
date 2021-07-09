import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormSchichtplanErstellen from "../FormElements/FormSchichtplanErstellen";

export default class ModalSchichtplanErstellen extends React.PureComponent {
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
                    Schichtplan erstellen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSchichtplanErstellen {...this.props}></FormSchichtplanErstellen>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}