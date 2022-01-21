import React from "react";
import {
    Label,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import store from "../../../../store";
import ShiftDetails from "../Form/ShiftDetails";


const ModalSchichtBewerben = (props) => {
    const day = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day]
    let includesApplicants = Object.keys(shift).includes("applicants")
    function includesUser() {
        let valid = !1;
        if(includesApplicants) {
            let applyedApplicants = shiftplan[row][day].applicants
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
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">In Schicht eintragen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <ShiftDetails {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
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
export default ModalSchichtBewerben;