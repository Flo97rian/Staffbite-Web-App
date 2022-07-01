import { useState } from "react";
import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import AddShift from "./AddShift";
import { addCalendarShift } from "../reducers/Shiftplan";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";

const ModalAddCalendarShift = (props) => {
    const dispatch = useDispatch();
    const showCalendarAddShift = useSelector(state => state.modal.addCalendarShift)
    const day = useSelector(state => state.shiftSlot.day);
    const userInput = useSelector(state => state.userInput);
    const [tryCreate, setTryCreate] = useState(false);

    const handleCalendarAddShift = () => {
        if(userInput.shiftName === "") {
            setTryCreate(true);
        }
        if(userInput.shiftName) {
            dispatch(addCalendarShift({day: day, userInput: userInput}));
            dispatch(settingShiftplanChanged());
            dispatch(resettingModal())
        }
      }
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
                    <AddShift
                    tryCreate={tryCreate}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    <Button color="primary" onClick={() => handleCalendarAddShift(props.modalkey)}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
    }

export default ModalAddCalendarShift;