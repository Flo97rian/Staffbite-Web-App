import React from "react";
import {
    Col,
    Row,
    Input,
    Button
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormNames from "../../Schichtplan/FormElements/FormNames";
import store from "../../../../store";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_USER_NOTICE } from "../../../../constants/InfoTexts";
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
                    show={props.keytrue} onHide={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Auf Schicht bewerben
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShiftDetails {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="" onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                    {includesUser()
                    ?
                    <Button className="" color="danger" onClick={() => props.onDelete(props.modalkey)}>Bewerbung zurückziehen</Button>
                    :
                    <Button color="success" onClick={() => props.onBewerben(props.modalkey)}> Bewerben </Button>  
                    }
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtBewerben;