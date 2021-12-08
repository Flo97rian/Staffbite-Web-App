import React from "react";
import {
    Col,
    Row,
    Input
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormNames from "../../Schichtplan/FormElements/FormNames";
import store from "../../../../store";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_USER_NOTICE } from "../../../../constants/InfoTexts";

const ModalSchichtBewerben = (props) => {

    function hasNotice(shift) {
        let isValid = !1
        let keys = Object.keys(shift)
        if (keys.includes("notice")) {
            if(shift.notice !== "") {
                isValid = !0;
            }
        }
        return isValid;
    }

    function includesUser(applyedApplicants) {
        let valid = !1;
        if(props.User.SK in applyedApplicants) {
            valid = !0;
        }
        return valid;

    }
    let notice;
    let day = props.shiftslot.col;
    let row = props.shiftslot.row;
    let shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day]
    let applyedApplicants = shiftplan[row][day].applicants
    let shiftname = shiftplan[row]["Wochentag"].ShiftName
    let shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    let shiftend = shiftplan[row]["Wochentag"].ShiftEnd
    if(hasNotice(shift)) {
        notice = shift.notice
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
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>Schicht</Form.Label>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Auf Schicht beworben</Form.Label>
                        </Col>
                        {includesUser(applyedApplicants) 
                        ?
                        <Col xs={2}>
                            <Form.Label>Bewerbung zurückziehen</Form.Label>
                        </Col>
                        :
                        <></>
                        }
                    </Row>
                    <Row className="text-center">
                        <Col xs={5}>
                            <Form.Label>{shiftname}<br/>{day}, {shiftplan[0][day]} <br/>{shiftstart} - {shiftend}</Form.Label>
                        </Col>
                        <Col xs={5}>
                            {applyedApplicants
                            ?
                            <FormNames names={applyedApplicants}></FormNames>
                            :
                            <Form.Label className="mt-4" >Leer</Form.Label>
                            }
                        </Col>
                        {includesUser(applyedApplicants) 
                        ?
                        <Col xs={2}>
                            <Button className="mt-4" variant="danger" onClick={() => props.onDelete(props.modalkey)}>X</Button>
                        </Col>
                        :
                        <></>
                        }
                    </Row>
                    {hasNotice(shift) 
                    ?
                    <div className="mt-4 pl-6 pr-4">
                        <Row className="text-center">
                        <InfoLabel title="Notizen" description={INFO_USER_NOTICE}></InfoLabel>
                        </Row>
                        <Row className="text-center">
                            <p>{notice}</p>
                        </Row>
                    </div>
                
                    : 
                    <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => props.onBewerben(props.modalkey)}> Bewerben </Button>  
                    <Button onClick={() => {store.dispatch({type: "CLOSE", payload: props.modalkey})}}> Schließen </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalSchichtBewerben;