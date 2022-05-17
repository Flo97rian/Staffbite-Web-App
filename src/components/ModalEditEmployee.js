import React from "react";
import Modal from 'react-bootstrap/Modal';
import {
    Col,
    Button,
    Label
} from "reactstrap"

import FormMitarbeiterBearbeiten from "./FormMitarbeiterBearbeiten";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalEditEmployee = (props) => {
    const dispatch = useDispatch();
        const mitarbeiterdaten = props.handleFilter(props.modalkey);
        return (
            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            className="modal-secondary"
            show={true} onHide={() => dispatch(resettingModal())}
            >
               <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Mitarbeiter bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormMitarbeiterBearbeiten mitarbeiterdaten={mitarbeiterdaten} {...props}></FormMitarbeiterBearbeiten>
                </Modal.Body>
                <hr className="my-4" />
                <Modal.Footer>
                            <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                            <Button color="primary" type="Button" onClick={() => props.handleUpdate(mitarbeiterdaten)}> Aktualisieren</Button>{' '}
                </Modal.Footer>
            </Modal>
        )
    }
export default ModalEditEmployee