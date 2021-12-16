import React from "react";
import {
    Col,
    Row,
    Badge,
    FormGroup
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputStringShiftName from "../../../Application/functionalComponents/InputStringShiftplanName"
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample.js";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import { INFO_SHIFTPLAN_DAYS_IS_CLOSED, INFO_SHIFTPLAN_NAME, INFO_SHIFTPLAN_NUMBER_OF_SHIFTS, INFO_SHIFTPLAN_PERIOD } from "../../../../constants/InfoTexts";
import { validShiftplanName } from "../../../Application/functionalComponents/ValidInputs";

const SchichtplanErstellen = (props) => {
    let hasuserInput = props.userInput !== null
    
    function getColor(day) {
        let color = "light";
        if (hasuserInput) {
            if (day in props.userInput) {
                color = "primary";
            }
        }
        return color;
    }

    function dayInuserInput(day) {
        let hasDay = !1;
        if (hasuserInput) {
            if (day in props.userInput) {
                hasDay = !0;
            }   
        }
        return hasDay;
    }

        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                        <InputStringShiftName info={true} description={INFO_SHIFTPLAN_NAME} label="Name deiner Vorlage" name="name" currentValue={props.userInput.name} isValid={validShiftplanName(props.userInput.name)} placeholder="Name" onChange={(e) => props.onChange(e, "userInput")} {...props}></InputStringShiftName>
                    <br/>
                    <InputNumber info={true} description={INFO_SHIFTPLAN_NUMBER_OF_SHIFTS} label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => props.onChange(e, "userInput")}></InputNumber>
                    {!1 === !0 ? 
                    <>
                    <br/>
                        <InfoOverlay infotitle="Kalenderwoche" description={INFO_SHIFTPLAN_PERIOD}/>
                        <Datepicker {...props} size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang der KW" placeholderEnde="Ende der KW" />  
                    </>
                    :
                    <></>
                    }
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <InfoOverlay info={true} description={INFO_SHIFTPLAN_DAYS_IS_CLOSED} infotitle="An welchen Tagen ist dein Betrieb geschlossen?" InfoOverlay/>
                        </Col>
                    </Row>
                    <div className="text-center">
                    <Badge 
                    key={"Montag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Montag")} 
                    onClick={() => props.onCompanyClosed("Montag")}>
                        Montag 
                        {" "}
                        {dayInuserInput("Montag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Dienstag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Dienstag")} 
                    onClick={() => props.onCompanyClosed("Dienstag")}>
                        Dienstag 
                        {" "}
                        {dayInuserInput("Dienstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Mittwoch"} 
                    className="mr-2 mt-2" 
                    color={getColor("Mittwoch")} 
                    onClick={() => props.onCompanyClosed("Mittwoch")}>
                        Mittwoch
                        {" "}
                        {dayInuserInput("Mittwoch") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Donnerstag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Donnerstag")} 
                    onClick={() => props.onCompanyClosed("Donnerstag")}>
                        Donnerstag 
                        {" "}
                        {dayInuserInput("Donnerstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Freitag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Freitag")} 
                    onClick={() => props.onCompanyClosed("Freitag")}>
                        Freitag 
                        {" "}
                        {dayInuserInput("Freitag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Samstag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Samstag")} 
                    onClick={() => props.onCompanyClosed("Samstag")}>
                        Samstag 
                        {" "}
                        {dayInuserInput("Samstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Sonntag"} 
                    className="mr-2 mt-2" 
                    color={getColor("Sonntag")} 
                    onClick={() => props.onCompanyClosed("Sonntag")}>
                        Sonntag
                        {" "}
                        {dayInuserInput("Sonntag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    </div>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }

export default SchichtplanErstellen;