import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtHinzufuegen from "./AddShift"
import store from "../store";

export default class ModalAddCalendarShift extends React.PureComponent {
    render() {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={this.props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: this.props.modalkey})}}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht hinzufügen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <SchichtHinzufuegen {...this.props}></SchichtHinzufuegen>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: this.props.modalkey})}}> Schließen </Button>
                    <Button color="primary" onClick={() => this.props.handleCalendarAddShift(this.props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}