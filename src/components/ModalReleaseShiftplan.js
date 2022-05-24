import React from "react";
import {
    Button,
    Label,
    Row,
    Col,
    Input
} from "reactstrap"
import Datepicker from "./DateWeekPicker";
import InfoLabel from "./InfoLabel";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD, INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME } from "../constants/InfoTexts";
import { resettingUserInput, settingShiftplanName } from "../reducers/userInput";
import { thunkReleaseForApplication } from "../store/middleware/ReleaseForApplication";

const ModalReleaseShiftplan = (props) => {
    const dispatch = useDispatch();
    const showSchichtplanFreigeben = useSelector(state => state.modal.showSchichtplanFreigeben);
    const startDate = useSelector(state => state.date.start);
    const endDate = useSelector(state => state.date.end);
    const Shiftplan = useSelector(state => state.Shiftplan);
    let currentStart = "1.1.2021"
    let currentEnde = "7.1.2021"
    if ( "zeitraum" in Shiftplan) {
        let splitPlan = Shiftplan.zeitraum.split(" - ")
        currentStart = splitPlan[0]
        currentEnde = splitPlan[1]
    }

    const releaseForApplication = () => {
        let detailsFilled = validateShiftplan();
        if (startDate && endDate && detailsFilled) {
            dispatch(thunkReleaseForApplication())
            props.setNavIndex(2);
            dispatch(resettingModal())
            dispatch(resettingUserInput())
        }
    }

    const validateShiftplan = () => {
        let valid = !0;
        const shiftplanLength = Shiftplan.plan.length;
        Shiftplan.plan.forEach((shiftRow, index) => {
            if(index !== 0 && index !== shiftplanLength - 1) {
                if (    shiftRow.Wochentag.ShiftName === "" |
                        shiftRow.Wochentag.ShiftStart === "" |
                        shiftRow.Wochentag.ShiftEnd === "" |
                        shiftRow.Wochentag.ShiftPosition === ""
                ) {
                    valid = !1
                }
            }
        })
        return valid;
    }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showSchichtplanFreigeben} onHide={() => dispatch(resettingModal())}
            >
                    <Label className="h2 m-3 text-center">Schichtplan zum Eintragen freigeben</Label>
                <Modal.Body className="pt-1">
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >

                        <InfoLabel title={"Neuer Name"} description={INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME}/>
                        <Input type="text" className="" placeholder={Shiftplan.name} name="name" onChange={(event) => dispatch(settingShiftplanName(event.target.value))}/> 
                        <br/>
                        <InfoLabel title={"Kalenderwoche"} description={INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD}/>
                        <Datepicker size="lg"/>  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                  <Button color="success" onClick={() => releaseForApplication()}> Freigeben</Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalReleaseShiftplan;