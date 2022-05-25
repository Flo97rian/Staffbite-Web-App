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

const ModalEditCalendarShift = (props) => {
    const dispatch = useDispatch();
    const editCalendarShift = useSelector(state => state.modal.editCalendarShift);
    const handleCalendarShiftChanges = () => {
        //const copyShiftplan = new ShiftPlan({...Shiftplan});
        //copyShiftplan.updateCalendarShift(userInput, ShiftSlot, DragAndDropRef);
        //const shiftplan = copyShiftplan.getAllPlanDetails()
        //dispatch(settingShiftplan(shiftplan))
        //dispatch(resettingModal())
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
                    <FromEditCalendarShift/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="success" onClick={() => handleCalendarShiftChanges()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditCalendarShift 