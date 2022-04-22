import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"
import { Schicht } from "./Form/Schicht";

const ModalSchichtBearbeiten = (props) => {
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={props.modal} 
                    onHide={() => props.handleCloseModal()}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <Schicht {...props}></Schicht>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => props.handleCloseModal()}> Schließen</Button>
                    <Button color="success" onClick={() => props.handleEditShift(props.shiftSlot.row, props.shiftSlot.col)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtBearbeiten 