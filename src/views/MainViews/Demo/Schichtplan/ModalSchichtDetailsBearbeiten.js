import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store"
import Bearbeiten from './Form/Bearbeiten'

const ModalSchichtDetailsBearbeiten = (props) => {
    let index = Number(props.shiftSlot.row)
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
                    <Bearbeiten {...props}></Bearbeiten>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => props.handleCloseModal()}> Schließen</Button>
                    <Button color="success" onClick={() => props.handleEditShiftDetails(index)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtDetailsBearbeiten 