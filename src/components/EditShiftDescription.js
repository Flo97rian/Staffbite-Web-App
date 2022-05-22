import React, { useEffect } from "react";
import {
    Col,
    Row,
    FormGroup,
    Input
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import InputStringShiftName from "./InputStringShiftName"
import { validShiftName } from "./ValidInputs";
import InputTime from "./InputTime";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import InputNumber from "./InputNumber";
import SelectPosition from "./SelectPosition";
import {INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES,INFO_SHIFTPLAN_SHIFT_POSITION, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
import _ from "lodash";
import getShiftDescriptionDetails from "../libs/getShiftDetails";
import getShiftsNumberOfEmployees from "../libs/getShiftsNumberOfEmployees";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftEnd, settingShiftName, settingShiftNumberOfEmployees, settingShiftPosition, settingShiftStart } from "../reducers/userInput";


const EditShiftDescription = (props) => {
    const dispatch = useDispatch();
    const DisplayNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
    const newShiftplanDescription = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index]?.Wochentag : undefined);
    const ShiftplanDescription = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index]?.Wochentag : undefined);
    const newShiftplanNumberOfEmployees = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.anzahl : undefined);
    const ShiftplanNumberOfEmployees = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.anzahl : undefined);
    const shiftDetails = DisplayNewShiftplan ? newShiftplanDescription : ShiftplanDescription;
    const anzahl = DisplayNewShiftplan ? newShiftplanNumberOfEmployees : ShiftplanNumberOfEmployees;
    const CompanyPositions = useSelector(state => state.Meta.schichten);

    useEffect(() => {
        if(shiftDetails.ShiftPosition === "") {
            dispatch(settingShiftPosition(CompanyPositions[0]));
        }
    }, [])

        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <FormGroup className="mb-0 mt-0">
                            <InfoLabel title="Name der Schicht" description={INFO_SHIFTPLAN_SHIFT_NAME}></InfoLabel>
                            <Input type="text" size="lg" className="" placeholder={shiftDetails.ShiftName} onChange={(event) => dispatch(settingShiftName(event.target.value))}></Input>
                        </FormGroup>
                        <Row className="mt-3">
                            <Col>
                                <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl} onChange={(event) => dispatch(settingShiftNumberOfEmployees(event.target.value))}></InputNumber>
                            </Col>
                            <Col>
                                <FormGroup className="">
                                    <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                                    <Input type="select" name="position" className=" edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingShiftPosition(event.target.value))}>
                                        {CompanyPositions.map((item, index) => {
                                            if(item === shiftDetails.ShiftPosition) {
                                                return <option key={index} selected value={item}>{item}</option>
                                            }
                                        return (<option key={index} value={item}>{item}</option>
                                        )})}
                                        </Input>
                                </FormGroup>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(event) => dispatch(settingShiftStart(event.target.value))}></InputTime>
                            </Col>
                            <Col>
                                <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" placeholder={shiftDetails.ShiftEnd} onChange={(event) => dispatch(settingShiftEnd(event.target.value))}></InputTimeWithSwitch>
                            </Col>
                        </Row>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default EditShiftDescription