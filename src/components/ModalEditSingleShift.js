import React from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { FormEditShift } from "./FormEditShift";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { resettingShiftSlot } from "../reducers/ShiftSlot";
import { resettingUserInput } from "../reducers/userInput";
import { settingShiftNotice } from "../reducers/Shiftplan";


export const ModalEditSingleShift = (props) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const userInput = useSelector(state => state.userInput);
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const DisplayNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
    const prioIsActive = useSelector(state => state.modal.prioIsActive);

      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
  const editShiftDetails = () => {
    if (DisplayNewShiftplan) {
    } 
    
    if(DisplayShiftplan) {
      dispatch(settingShiftNotice({index: index, day: day, shiftNotice: userInput.shiftNotice}));
      dispatch(settingShiftplanChanged())
    }
    dispatch(resettingShiftSlot())
    dispatch(resettingUserInput())
    dispatch(resettingModal())
  };
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
                    <FormEditShift/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                    <Button color="success" onClick={() => editShiftDetails()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

