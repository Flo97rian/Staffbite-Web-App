import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtBearbeiten from "./EditShiftDescription";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalEditShiftDescription = (props) => {
    const dispatch = useDispatch();
    const editShiftDescription = useSelector(state => state.modal.editShiftDescription);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={editShiftDescription} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0"closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <SchichtBearbeiten {...props} modalkey={props.modalkey}></SchichtBearbeiten>
                </Modal.Body>
                <Modal.Footer>
                    <Button  outline color="danger" onClick={() => props.handleLoeschen(props.modalkey)}> Löschen </Button>
                    <Button color="success" onClick={() => props.handleSchichtBearbeiten(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditShiftDescription 