import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { PrioSchicht } from "../Form/PrioSchicht";
import store from "../../../../store";


export const ModalPrioSchicht = (props) => {
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
                    className="modal modal-secondary"
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Details bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <PrioSchicht {...props}></PrioSchicht>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}>Schließen</Button>
                    <Button color="success" onClick={() => props.handlePrio(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

