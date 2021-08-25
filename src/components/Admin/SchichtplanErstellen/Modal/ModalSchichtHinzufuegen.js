import React from "react";
import {
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FormSchichtHinzufuegen from "../FormElements/FormSchichthinzufuegen";
import store from "../../../../store";

export default class ModalSchichtHinzufuegen extends React.PureComponent {
    render() {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: this.props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schicht hinzufügen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSchichtHinzufuegen {...this.props}></FormSchichtHinzufuegen>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="secondary" onClick={() => {store.dispatch({type: "CLOSE", payload: this.props.modalkey})}}> Schließen </Button>
                    <Button color="primary" onClick={() => this.props.onSaveHinzufuegen(this.props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}