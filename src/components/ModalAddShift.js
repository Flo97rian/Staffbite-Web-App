import React, {useState} from "react";
import {
    Button,
    Label,
    Row,
    Col,
    FormGroup,
    Input,
    FormFeedback
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import Modal from 'react-bootstrap/Modal';
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import InputTime from "./InputTime";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { resettingUserInput, settingShiftEnd, settingShiftName, settingShiftNumberOfEmployees, settingShiftPosition, settingShiftStart } from "../reducers/userInput";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_POSITION, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
import { settingNewShift } from "../reducers/Shiftplan";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";

const ModalAddShift = (props) => {
    const dispatch = useDispatch();
    const [invalidShiftName, setInvalidShiftName] = useState(false);
    const showSchichthinzufuegen = useSelector(state => state.modal.showSchichthinzufuegen);
    const CompanyPositions = useSelector(state => state.Meta.schichten);
    const userInput = useSelector(state => state.userInput);
    const DisplayShiftplan = useSelector(state => state.Shiftplan.id !== "");
    const DisplayNewShiftplan = useSelector(state => state.newShiftPlan.id !== "");

    const addShift = () => {

        if(userInput.shiftName === "") {
            setInvalidShiftName(true);
        }
        
        if (DisplayShiftplan) {
            dispatch(settingNewShift(userInput));
            dispatch(resettingUserInput())
            dispatch(resettingModal())
            dispatch(settingShiftplanChanged())
        } 

        if(DisplayNewShiftplan) {
            dispatch(resettingUserInput())
            dispatch(resettingModal())
        }

    };
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={showSchichthinzufuegen} 
                    onHide={() => {
                        dispatch(resettingModal())
                        dispatch(resettingUserInput())
                    }}
            >
                <Modal.Header className="pb-0" closeButton>
                    <Label className="h2 m-3 align-items-center">Schicht hinzufügen</Label>
                </Modal.Header>
                <Modal.Body className="pt-1">
                    <Row>
                        <Col xs={1} ></Col>
                        <Col xs={10} >
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <InfoLabel title="Name der Schicht" description={INFO_SHIFTPLAN_SHIFT_NAME}></InfoLabel>
                                    <Input 
                                        invalid={invalidShiftName}
                                        type="text"
                                        className=""
                                        onChange={(event) => dispatch(settingShiftName(event.target.value))}    
                                    />
                                    <FormFeedback
                                    invalid
                                    >
                                        Trage einen Schichtnamen ein
                                    </FormFeedback>
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                            <Col>
                                <InfoLabel title="Anzahl benötigter Mitarbeiter" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES}/>
                                <Input  type="Number" placeholder={userInput.numberOfEmployees} onChange={(event) => dispatch(settingShiftNumberOfEmployees(event.target.value))}></Input>
                            </Col>
                            <Col>
                                <FormGroup className="">
                                    <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                                    <Input type="select" name="position" className=" edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingShiftPosition(event.target.value))}>
                                        {CompanyPositions.map((item, index) => {
                                        return <option key={index} value={item}>{item}</option>
                                        })}
                                        </Input>
                                </FormGroup>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={userInput.shiftStart} onChange={(event) => dispatch(settingShiftStart(event.target.value))}></InputTime>
                            </Col>
                            <Col>
                                <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" placeholder={userInput.shiftEnd} onChange={(event) => dispatch(settingShiftEnd(event.target.value))}></InputTimeWithSwitch>
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={1} ></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="link"
                        onClick={() => {
                            dispatch(resettingModal())
                            dispatch(resettingUserInput())
                        }}> Schließen </Button>
                    <Button color="primary" onClick={() => addShift()}> Übernehmen</Button>
                </Modal.Footer>
            </Modal>
        );
}

export default ModalAddShift;