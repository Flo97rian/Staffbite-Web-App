import React from "react";
import {
    Label,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../store";
import ShiftDetails from "./UserShiftDetails";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";


const ModalUserApply = (props) => {
    const dispatch = useDispatch();
    const userApply = useSelector(state => state.modal.userApply);
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[index][day]
    let includesApplicants = Object.keys(shift).includes("applicants")
    function includesUser() {
        let valid = !1;
        if(includesApplicants) {
            let applyedApplicants = shiftplan[index][day].applicants
            if(props.User.SK in applyedApplicants) {
                valid = !0;
            }
        }
        return valid;

    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={userApply} onHide={() => dispatch(resettingModal())}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">In Schicht eintragen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ShiftDetails {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    {includesUser()
                    ?
                    <Button className="" color="danger" onClick={() => props.onDelete(props.modalkey)}>Bewerbung zurückziehen</Button>
                    :
                    <Button color="success" onClick={() => props.onBewerben(props.modalkey)}> Eintragen </Button>  
                    }
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalUserApply;