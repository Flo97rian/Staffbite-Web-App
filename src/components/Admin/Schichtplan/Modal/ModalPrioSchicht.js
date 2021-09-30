import React from "react";
import {
    Button
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
                    className="modal"
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Mindestanforderung hinzufügen
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrioSchicht {...props}></PrioSchicht>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success" onClick={() => props.handlePrio(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

