import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FormSchichtplanErstellen from "../FormElements/FormSchichtplanErstellen";
import store from "../../../../store";

const ModalSchichtplanErstellen = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header>
                            <Label className="h3 mb-2 align-items-center">Schichtplan erstellen</Label>
                </Modal.Header>
                <Modal.Body>
                    <FormSchichtplanErstellen {...props}></FormSchichtplanErstellen>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" size="lg" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>{' '}
                  <Button color="success" size="lg" onClick={() => props.onSave(props.modalkey)}> Übernehmen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtplanErstellen