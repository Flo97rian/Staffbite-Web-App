import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtHinzufuegen from "./AddShift"
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";

const ModalAddCalendarShift = (props) => {
    const dispatch = useDispatch();
    const showCalendarAddShift = useSelector(state => state.modal.addCalendarShift)
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showCalendarAddShift} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht hinzufügen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <SchichtHinzufuegen {...props}></SchichtHinzufuegen>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="primary" onClick={() => props.handleCalendarAddShift(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }

export default ModalAddCalendarShift;