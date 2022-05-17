import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { FormEditShift } from "./FormEditShift";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";


export const ModalEditSingleShift = (props) => {
    const dispatch = useDispatch();
    const prioIsActive = useSelector(state => state.modal.prioIsActive);
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={prioIsActive} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Details bearbeiten</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormEditShift {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                    <Button color="success" onClick={() => props.handlePrio(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

