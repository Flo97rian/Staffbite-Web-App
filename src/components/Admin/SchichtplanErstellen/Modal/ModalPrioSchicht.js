import React from "react";
import {
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { FormPrioSchicht } from "../FormElements/FormPrioSchicht"
import store from "../../../../store";


export const ModalPrioSchicht = (props) => {
    console.log(props)
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
                    className="modal"
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Mindestanforderung hinzufügen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormPrioSchicht {...props}></FormPrioSchicht>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success" onClick={() => props.handlePrio(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

