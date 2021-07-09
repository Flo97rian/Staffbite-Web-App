import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormSchichtBearbeiten from "../FormElements/FormSchichtBearbeiten";

export default class ModalSchichtplanImportBearbeiten extends React.PureComponent {
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
                    Schicht bearbeiten
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSchichtBearbeiten {...this.props}></FormSchichtBearbeiten>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}