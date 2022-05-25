import React from "react";
import {
    Col,
    Row,
    Badge,
    FormGroup,
    Input
} from "reactstrap"
import InputString from "./InputString";
import InputStringShiftName from "./InputStringShiftplanName"
import InputNumber from "./InputNumber";
import Datepicker from "./DatePicker.js";
import InfoOverlay from "./InfoOverlay";
import { INFO_SHIFTPLAN_DAYS_IS_CLOSED, INFO_SHIFTPLAN_NAME, INFO_SHIFTPLAN_NUMBER_OF_SHIFTS, INFO_SHIFTPLAN_PERIOD } from "../constants/InfoTexts";
import { validShiftplanName } from "./ValidInputs";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import InfoLabel from "./InfoLabel";
import { resettingShiftplanCompanyIsOpen, settingShiftplanCompanyIsOpen, settingShiftplanName, settingShiftplanNumberOfShifts } from "../reducers/userInput";

const FormCreateShiftplan = () => {
    const dispatch = useDispatch()

    const userInputCompanyIsOpen = useSelector(state => state.userInput.shiftplanCompanyIsOpen);

    const handleIsOpen = (day) => {
        const includesDay = userInputCompanyIsOpen.includes(day);

        if(includesDay) {
            dispatch(resettingShiftplanCompanyIsOpen(day));
        }

        if(!includesDay) {
            dispatch(settingShiftplanCompanyIsOpen(day));
        }

    };
        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                    <FormGroup className="mb-0">
                    <InfoLabel title="Name deiner Vorlage" description={INFO_SHIFTPLAN_NAME}></InfoLabel>
                    <Input type="text" onChange={(event) => dispatch(settingShiftplanName(event.target.value))}></Input>
                    </FormGroup>
                    <FormGroup className="mt-2">
                        <InfoLabel title="Schichten pro Tag" description={INFO_SHIFTPLAN_NUMBER_OF_SHIFTS}></InfoLabel>
                        <Input type="number" min={1} onChange={(event) => dispatch(settingShiftplanNumberOfShifts(event.target.value))}></Input>
                    </FormGroup>
                    <Row className="text-center mt-0">
                        <Col xs={12}>
                            <InfoOverlay info={true} description={INFO_SHIFTPLAN_DAYS_IS_CLOSED} infotitle="An welchen Tagen ist dein Betrieb geschlossen?" InfoOverlay/>
                        </Col>
                    </Row>
                    <div className="text-center">
                    <Badge 
                    key={"Montag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Montag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Montag")}>
                        Montag 
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Montag")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Dienstag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Dienstag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Dienstag")}>
                        Dienstag 
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Dienstag")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Mittwoch"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Mittwoch") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Mittwoch")}>
                        Mittwoch
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Mittwoch")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Donnerstag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Donnerstag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Donnerstag")}>
                        Donnerstag 
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Donnerstag")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Freitag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Freitag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Freitag")}>
                        Freitag 
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Freitag")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Samstag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Samstag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Samstag")}>
                        Samstag 
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Samstag")} className="fas fa-times"></i>
                    </Badge>
                    <Badge 
                    key={"Sonntag"} 
                    className="mr-2 mt-2" 
                    color={(userInputCompanyIsOpen.includes("Sonntag") ? "primary" : "light")} 
                    onClick={() => handleIsOpen("Sonntag")}>
                        Sonntag
                        {" "}
                        <i hidden={!userInputCompanyIsOpen.includes("Sonntag")} className="fas fa-times"></i>
                    </Badge>
                    </div>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }

export default FormCreateShiftplan;