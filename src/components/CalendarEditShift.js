import _ from "lodash";
import React, { useEffect, useState } from "react";
import getShiftDescriptionDetails from "../libs/getShiftDetails";
import {
    Row,
    Col,
    Card,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Input,
    UncontrolledCollapse,
    Collapse
} from "reactstrap"
import InputString from "./InputString";
import InputTime from "./InputTime";
import InputNumber from "./InputNumber";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import SelectPosition from "./SelectPosition";
import { INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_START, INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES } from "../constants/InfoTexts";
import Switch from "./Switch";
import { useSelector, useDispatch } from "react-redux";
import { resettingCurrentShiftCustomDays, resettingShiftCustomDays, resettingShiftIsDayly, settingCurrentShiftCustomsDays, settingShiftCustomDays, settingShiftEnd, settingShiftIsDayly, settingShiftName, settingShiftNumberOfEmployees, settingShiftStart } from "../reducers/userInput";
import { deletingCalendarShift, deletingCalendarShifts } from "../reducers/Shiftplan";
import { resettingModal } from "../reducers/modal";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { weekdays } from "../constants/Weekdays";
import InfoLabel from "./InfoLabel";

const CalendarEditShift = (props) => {
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const shift = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day]);
    const shiftRow = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index]);
    const shiftDetails = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag);
    const anzahl = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].anzahl);
    const userInputName = useSelector(state => state.userInput.shiftName);
    const userInputShiftIsDayly = useSelector(state => state.userInput.shiftIsDayly);
    const userInputCustomDays = useSelector(state => state.userInput.shiftCustomDays);
    const userInputIsDayly = useSelector(state => state.userInput.shiftIsDayly)
    const [customRepeat, setCustomRepeat] = useState(false);
    const dispatch = useDispatch()

    const deleteShift = () => {
        dispatch(deletingCalendarShift({day: day, index: index}))
        dispatch(resettingModal())
        dispatch(resettingShiftIsDayly())
        dispatch(resettingShiftCustomDays())
        dispatch(settingShiftplanChanged());
    }

    const deleteMultipleShifts = () => {
        dispatch(deletingCalendarShifts({index: index, customDays: userInputCustomDays}));
        dispatch(resettingShiftIsDayly())
        dispatch(resettingShiftCustomDays())
        dispatch(resettingModal());
        dispatch(settingShiftplanChanged());
    }
    useEffect(() => {
    let isDayly = true;
    _.forIn(shiftRow, function (value, key) {
        if (key === "Wochentag") return
        if (value.frei !== true) 
            isDayly = false;
    });
    let shiftsActiveDays = [];
    _.forIn(shiftRow, function (value, key) {

        if (key === "Wochentag") return
        if (value.frei === true) 
        shiftsActiveDays.push(key);
    });
    if(shiftsActiveDays.length === 1 && !isDayly && !customRepeat) {
        dispatch(settingCurrentShiftCustomsDays(shiftsActiveDays));
    }

    if(shiftsActiveDays.length > 1 && !isDayly && !customRepeat) {
        setCustomRepeat(true);
        dispatch(settingCurrentShiftCustomsDays(shiftsActiveDays));
    }

    if(isDayly) {
        dispatch(settingShiftIsDayly());
        dispatch(settingCurrentShiftCustomsDays(shiftsActiveDays));
    }
    }, [])

    useEffect(() => {
        let shiftsActiveDays = [];
        _.forIn(shiftRow, function (value, key) {
    
            if (key === "Wochentag") return
            if (value.frei === true) 
            shiftsActiveDays.push(key);
        });
        if(shiftsActiveDays !== userInputCustomDays && customRepeat) {
            dispatch(settingCurrentShiftCustomsDays(shiftsActiveDays));
        }
    }, [customRepeat])

    if(_.isEmpty(shift)) 
    return null

    const handleSelectRepeat = (event) => {
        if(event === "Eigene") {
            setCustomRepeat(true);
            dispatch(resettingShiftIsDayly());
        }

        if(event === "Täglich") {
            setCustomRepeat(false);
            dispatch(resettingCurrentShiftCustomDays());
            dispatch(settingShiftIsDayly())    
        }

        if(event === "Ohne") {
            setCustomRepeat(false);
            if(userInputIsDayly) {
                dispatch(resettingShiftIsDayly()) 
            }
            if(customRepeat) {
                dispatch(resettingCurrentShiftCustomDays());
            }
            dispatch(settingShiftCustomDays(day));
        }
    }

    const handleCustomDays = (day) => {
        if(userInputCustomDays.includes(day)) {
            dispatch(resettingShiftCustomDays(day));
        }
        if(!userInputCustomDays.includes(day)) {
            dispatch(settingShiftCustomDays(day));
        }
    }

    const showActive = () => {
        if(!userInputCustomDays.length) {

        }
    }

    return (
        <Card className="bg-secondary border px-2 shadow-none">
            <Row className="mt-3">
                <Col>
                    <InputString info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" value={userInputName} placeholder={shiftDetails.ShiftName} onChange={(event) => dispatch(settingShiftName(event.target.value))}></InputString>
                    <Row>
                        <Col>
                            <SelectPosition shiftDetails={shiftDetails}></SelectPosition>
                        </Col>
                        <Col>
                            <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl} onChange={(event) => dispatch(settingShiftNumberOfEmployees(event.target.value))}></InputNumber>
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
                    <Row>
                        <Col>
                            <InfoLabel title={"Wiederholen"}/>
                            <Input type="select" className=" edit-event--description input-autosize form-control" onChange={(event) => handleSelectRepeat(event.target.value)}>
                                <option key={"Ohne"} value={"Ohne"}>Ohne</option>
                                <option key={"isDayly"} value={"Täglich"} selected={userInputIsDayly}>Täglich</option>
                                <option key={"customRepeat"} value={"Eigene"} selected={customRepeat}>Eigene</option>
                            </Input>
                            <Row>
                                <Col>
                                    <Collapse isOpen={customRepeat}>
                                        <div className="m-4">
                                        <Pagination>
                                            {weekdays.map((weekday, index) => {
                                                return (
                                                    <PaginationItem key={index} active={userInputCustomDays.includes(weekday) ? true: false}>
                                                        <PaginationLink onClick={() => handleCustomDays(weekday)}>
                                                            {weekday.substring(0, 2)}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            })}
                                        </Pagination>
                                        </div>
                                    </Collapse>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card className="mb-2">
                            <Button hidden={!userInputIsDayly} size="sm" outline color="danger" onClick={() => deleteMultipleShifts()}>Schichten löschen</Button>
                            <Button hidden={userInputCustomDays.length === 1 || userInputIsDayly} size="sm" outline color="danger" onClick={() => deleteMultipleShifts()}>Ausgewählte Schichten löschen</Button>    
                            <Button hidden={userInputCustomDays.length > 1 || userInputIsDayly} size="sm" outline color="danger" onClick={() => deleteShift()}>Schicht löschen</Button>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )

}

export default CalendarEditShift;