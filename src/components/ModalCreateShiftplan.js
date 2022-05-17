import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtplanErstellen from "./FormCreateShiftplan"
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalCreateShiftplan = (props) => {
    const dispatch = useDispatch();
    const showSchichtplanErstellen = useSelector(state => state.modal.showSchichtplanErstellen);
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={showSchichtplanErstellen} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0">
                            <Label className="h2 m-3 align-items-center">Vorlage erstellen</Label>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <SchichtplanErstellen {...props}></SchichtplanErstellen>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" size="lg" onClick={() => dispatch(resettingModal())}> Schließen </Button>{' '}
                  <Button color="success" size="lg" onClick={() => props.onSave()}>Erstellen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalCreateShiftplan