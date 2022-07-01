import React, { useRef } from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import DragAndDrop from "./EmployeesDnDForSingleShift";
import FormSetApplicantsDetails from "./FormSetApplicantsDetails";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { resettingUserInput } from "../reducers/userInput";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { settingApplicants, settingShiftNotice } from "../reducers/Shiftplan";
import { resettingEmployeesDummyshifts } from "../reducers/DB";

const ModalEditEmployeesInShift = (props) => {
    const dispatch = useDispatch();
    const applyIsActive = useSelector(state => state.modal.applyIsActive);
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const shiftNotice = useSelector(state => state.userInput.shiftNotice);

    const DragAndDropRef = useRef()
    const handleClose = () => {
        dispatch(resettingModal());
        dispatch(resettingUserInput());
        dispatch(resettingEmployeesDummyshifts());
    }
    const handleSetApplicant = () => {
        const updateApplicant = DragAndDropRef.current;
        dispatch(settingShiftNotice({index: index, day: day, shiftNotice: shiftNotice}));
        dispatch(settingApplicants({index: index, day: day, updateApplicants: updateApplicant}))
        dispatch(resettingUserInput())
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
        dispatch(resettingEmployeesDummyshifts());
      };
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={applyIsActive}
                    onHide={() => handleClose()}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht zuteilen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <FormSetApplicantsDetails/>
                    <DragAndDrop
                        ref={DragAndDropRef}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button  color="link" 
                        onClick={() => handleClose()}
                    > Schließen </Button>
                    <Button color="success" onClick={() => handleSetApplicant()}>Änderungen übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalEditEmployeesInShift;