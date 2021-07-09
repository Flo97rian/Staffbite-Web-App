import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormSchichtplanImportieren from "../../SchichtplanErstellen/FormElements/FormSchichtplanImportieren";

export default class ModalSchichtplanVeroeffentlichen extends React.PureComponent {
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
                    Schichtplan auswählen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Importieren</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Löschen</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                    <FormSchichtplanImportieren {...this.props}></FormSchichtplanImportieren>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}