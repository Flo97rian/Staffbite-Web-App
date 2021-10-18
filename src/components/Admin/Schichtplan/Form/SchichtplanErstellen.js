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
    let hasDaysIsActive = props.daysIsActive !== null
    
    function getColor(day) {
        let color = "light";
        if (hasDaysIsActive) {
            if (day in props.daysIsActive) {
                color = "primary";
            }
        }
        return color;
    }

    function dayInDaysIsActive(day) {
        let hasDay = !1;
        if (hasDaysIsActive) {
            if (day in props.daysIsActive) {
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
                <InputString info={true} description={"Wählen Sie einen Namen für diesen Schichtplan (z.B. Sommer, Herbst, Winter etc.)"} label="Name des Schichtplanes" name="name" placeholder="" onChange={(e) => props.onChange(e, "daysIsActive")}></InputString>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie, wie viele unterschiedliche Schichten Sie pro Tag haben"} label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => props.onChange(e, "daysIsActive")}></InputNumber>
                    <br/>
                        <InfoOverlay infotitle="Kalenderwoche" description="Tragen Sie hier eine Kalenderwoche von Montag bis Freitag ein. Im späteren Verlauf können Sie den Schichtplan auch für mehrere Wochen freischalten"/>
                        <Datepicker size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang="Anfang der KW" placeholderEnde="Ende der KW" />  
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
                        {dayInDaysIsActive("Montag") ? 
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
                        {dayInDaysIsActive("Dienstag") ? 
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
                        {dayInDaysIsActive("Mittwoch") ? 
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
                        {dayInDaysIsActive("Donnerstag") ? 
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
                        {dayInDaysIsActive("Freitag") ? 
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
                        {dayInDaysIsActive("Samstag") ? 
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
                        {dayInDaysIsActive("Sonntag") ? 
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