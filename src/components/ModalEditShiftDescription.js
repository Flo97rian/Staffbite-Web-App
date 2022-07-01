import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtBearbeiten from "./EditShiftDescription";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { deleteShift, settingShiftDescription } from "../reducers/Shiftplan";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { deleteNewShift, settingNewShiftDescription } from "../reducers/NewShiftPlan";

const ModalEditShiftDescription = (props) => {
    const dispatch = useDispatch();
    const editShiftDescription = useSelector(state => state.modal.editShiftDescription);
    const userInput = useSelector(state => state.userInput);
    const displayingShiftplan = useSelector(state => state.display.displayShiftplan);
    const displayingNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
    const currentShiftIndex = useSelector(state => state.shiftSlot.index);

    const removeShift = () => {
        if(displayingShiftplan) {
            dispatch(deleteShift(currentShiftIndex));
            dispatch(resettingModal());
        }
        if(displayingNewShiftplan) {
            dispatch(deleteNewShift(currentShiftIndex));
            dispatch(resettingModal());
        }
    }

    const settingShiftDetail = () => {
        if(displayingShiftplan) {
            dispatch(settingShiftDescription({index: currentShiftIndex, userInput: userInput}));
            dispatch(settingShiftplanChanged());
            dispatch(resettingModal());
        }
        if(displayingNewShiftplan) {
            dispatch(settingNewShiftDescription({index: currentShiftIndex, userInput: userInput}));
            dispatch(resettingModal());
        }
    }
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
                    <SchichtBearbeiten></SchichtBearbeiten>
                </Modal.Body>
                <Modal.Footer>
                    <Button  outline color="danger" onClick={() => removeShift()}> Löschen </Button>
                    <Button color="success" onClick={() => settingShiftDetail()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditShiftDescription 