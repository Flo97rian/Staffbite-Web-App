import React from "react";
import {
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtplanFreigeben from "../Form/SchichtplanFreigeben";
import store from "../../../../store";

const ModalSchichtplanFreigeben = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schichtplan zur Bewerbung freigeben
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SchichtplanFreigeben {...props}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="secondary" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                  <Button color="success" onClick={() => props.onUpdate(props.modalkey)}> Freigeben</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtplanFreigeben;