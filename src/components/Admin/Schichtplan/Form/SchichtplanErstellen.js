import React from "react";
import {
    Col,
    Row,
    Badge
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample.js";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

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
                <InputString info={true} description={"Wählen Sie einen Namen für diesen Schichtplan (z.B. Sommer, Herbst, Winter etc.)"} label="Name des Schichtplanes" name="name" placeholder="" onChange={(e) => props.onChange(e, "userInput")}></InputString>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie, wie viele unterschiedliche Schichten Sie pro Tag haben"} label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => props.onChange(e, "userInput")}></InputNumber>
                    <br/>
                        <InfoOverlay infotitle="Kalenderwoche" description="Tragen Sie hier eine Kalenderwoche von Montag bis Freitag ein. Im späteren Verlauf können Sie den Schichtplan auch für mehrere Wochen freischalten"/>
                        <Datepicker {...props} size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang der KW" placeholderEnde="Ende der KW" />  
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <InfoOverlay info={true} description={"Wählen Sie die Tage aus, an denen ihr Betrieb geschlossen ist!"} infotitle="Gibt es freie Tage?" InfoOverlay/>
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