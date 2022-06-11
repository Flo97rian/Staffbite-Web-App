import React, { useRef } from "react";
import {
    Button,
    Label,
    UncontrolledCarousel,
    UncontrolledCollapse
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import FromEditCalendarShift from "./FormEditCalendarShift";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { settingApplicants, settingCalenderShift, settingShiftNotice, settingShiftplan } from "../reducers/Shiftplan";
import { resettingUserInput } from "../reducers/userInput";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { resettingEmployeeDummyShift, resettingEmployeesDummyshifts } from "../reducers/DB";

const ModalEditCalendarShift = (props) => {
    const dispatch = useDispatch();
    const editCalendarShift = useSelector(state => state.modal.editCalendarShift);
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const userInput = useSelector(state => state.userInput);
    const shiftNotice = useSelector(state => state.userInput.shiftNotice);
    const DragAndDropRef = useRef()

    const handleCalendarShiftChanges = () => {
        const updateApplicant = DragAndDropRef.current;
        dispatch(settingCalenderShift({index: index, day: day, userInput: userInput, DnDRef: updateApplicant}));
        dispatch(resettingUserInput())
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
        dispatch(resettingEmployeesDummyshifts());
      }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={editCalendarShift} onHide={() => dispatch(resettingModal())}
            >
                <Label className="h2 m-4 text-center">Schicht bearbeiten</Label>
                <Modal.Body className="pt-1">
                    <FromEditCalendarShift
                        DragAndDropRef={DragAndDropRef}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => handleCalendarShiftChanges()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditCalendarShift 