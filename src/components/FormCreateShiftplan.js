import React from "react";
import {
    Col,
    Row,
    Badge,
    FormGroup
} from "reactstrap"
import InputString from "./InputString";
import InputStringShiftName from "./InputStringShiftplanName"
import InputNumber from "./InputNumber";
import Datepicker from "./DatePicker.js";
import InfoOverlay from "./InfoOverlay";
import { INFO_SHIFTPLAN_DAYS_IS_CLOSED, INFO_SHIFTPLAN_NAME, INFO_SHIFTPLAN_NUMBER_OF_SHIFTS, INFO_SHIFTPLAN_PERIOD } from "../constants/InfoTexts";
import { validShiftplanName } from "./ValidInputs";
import _ from "lodash";

const FormCreateShiftplan = (props) => {
        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                    <FormGroup>
                        <InputStringShiftName info={true} description={INFO_SHIFTPLAN_NAME} label="Name deiner Vorlage" name="name" currentValue={props.userInput.name} isValid={validShiftplanName(props.userInput.name)} placeholder="Name" onChange={(e) => props.onChange(e, "userInput")} {...props}></InputStringShiftName>
                    </FormGroup>
                    <FormGroup className="mt-2">
                        <InputNumber info={true} description={INFO_SHIFTPLAN_NUMBER_OF_SHIFTS} label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => props.onChange(e, "userInput")}></InputNumber>
                    </FormGroup>
                    <br/>
                    <Row className="text-center mt-0">
                        <Col xs={12}>
                            <InfoOverlay info={true} description={INFO_SHIFTPLAN_DAYS_IS_CLOSED} infotitle="An welchen Tagen ist dein Betrieb geschlossen?" InfoOverlay/>
                        </Col>
                    </Row>
                    <div className="text-center">
                    <Badge 
                    key={"Montag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Montag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Montag")}>
                        Montag 
                        {" "}
                        {_.hasIn(props.userInput, "Montag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Dienstag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Dienstag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Dienstag")}>
                        Dienstag 
                        {" "}
                        {_.hasIn(props.userInput, "Dienstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Mittwoch"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Mittwoch") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Mittwoch")}>
                        Mittwoch
                        {" "}
                        {_.hasIn(props.userInput, "Mittwoch") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Donnerstag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Donnerstag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Donnerstag")}>
                        Donnerstag 
                        {" "}
                        {_.hasIn(props.userInput, "Donnerstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Freitag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Freitag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Freitag")}>
                        Freitag 
                        {" "}
                        {_.hasIn(props.userInput, "Freitag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Samstag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Samstag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Samstag")}>
                        Samstag 
                        {" "}
                        {_.hasIn(props.userInput, "Samstag") ? 
                        <i 
                        className="fas fa-times"
                        ></i>
                        : <></>
                        }
                    </Badge>
                    <Badge 
                    key={"Sonntag"} 
                    className="mr-2 mt-2" 
                    color={(_.hasIn(props.userInput, "Sonntag") ? "primary" : "light")} 
                    onClick={() => props.onCompanyClosed("Sonntag")}>
                        Sonntag
                        {" "}
                        {_.hasIn(props.userInput, "Sonntag") ? 
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

export default FormCreateShiftplan;