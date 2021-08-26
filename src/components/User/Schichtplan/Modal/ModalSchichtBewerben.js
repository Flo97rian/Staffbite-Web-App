import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormNames from "../FormElements/FormNames";

export default class ModalSchichtBewerben extends React.PureComponent {
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
                    Auf Schicht bewerben
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>Schicht</Form.Label>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Auf Schicht beworben</Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Bewerbung zurückziehen</Form.Label>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>{this.props.bearbeiten.row.ShiftName}<br/>{this.props.bearbeiten.col}, {this.props.plaene[this.props.plan].plan[0][this.props.bearbeiten.col]} <br/>{this.props.bearbeiten.row.ShiftStart} - {this.props.bearbeiten.row.ShiftEnd}</Form.Label>
                        </Col>
                        <Col xs={5}>
                            {this.props.plaene[this.props.plan].plan[this.props.bearbeiten.rowindex][this.props.bearbeiten.col]["applicants"]
                            ?
                            <FormNames names={this.props.plaene[this.props.plan].plan[this.props.bearbeiten.rowindex][this.props.bearbeiten.col]["applicants"]}></FormNames>
                            :
                            <Form.Label>Leer</Form.Label>
                            }
                        </Col>
                        <Col xs={2}>
                            <Button variant="danger" onClick={() => this.props.onDelete(this.props.modalkey)}>X</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => this.props.onBewerben(this.props.modalkey)}> Bewerben </Button>  
                    <Button onClick={() => this.props.onHide(this.props.modalkey)}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}