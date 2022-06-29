import React, {useEffect, useState} from "react";
import {
    Col,
    Row,
    FormGroup,
    Input,
    FormFeedback
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import InputTime from "./InputTime";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import { useSelector, useDispatch } from "react-redux";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_POSITION, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
import { settingShiftEnd, settingShiftIsDayly, settingShiftName, settingShiftNumberOfEmployees, settingShiftPosition, settingShiftStart } from "../reducers/userInput";
const AddShift = (props) => {
    const dispatch = useDispatch();
    const userInput = useSelector(state => state.userInput);
    const CompanyPositions = useSelector(state => state.Meta.schichten);

        return(
            <>            
            <Row>
                        <Col xs={1} ></Col>
                        <Col xs={10} >
                            <Row>
                                <Col>
                                    <FormGroup>
                                    <InfoLabel title="Name der Schicht" description={INFO_SHIFTPLAN_SHIFT_NAME}></InfoLabel>
                                    <Input 
                                        invalid={(props.tryCreate && !userInput.shiftName)}
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
                            <FormGroup>
                                <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={userInput.shiftStart} onChange={(event) => dispatch(settingShiftStart(event.target.value))}></InputTime>
                                <FormFeedback
                                    invalid
                                    >
                                        Trage den Beginn ein
                                    </FormFeedback>
                            </FormGroup>  
                            </Col>
                            <Col>
                                <FormGroup>
                                <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" placeholder={userInput.shiftEnd} onChange={(event) => dispatch(settingShiftEnd(event.target.value))}></InputTimeWithSwitch>
                                <FormFeedback
                                    invalid
                                    >
                                        Trage das Ende ein
                                    </FormFeedback>
                            </FormGroup> 
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={1} ></Col>
                    </Row>
            </>
    )
};

export default AddShift;