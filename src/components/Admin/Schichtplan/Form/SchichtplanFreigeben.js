import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import { INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD } from "../../../../constants/InfoTexts";
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

const SchichtplanFreigeben = (props) => {
        let plan = props.shiftplan;
        let currentStart = "1.1.2021"
        let currentEnde = "7.1.2021"
        if ( "zeitraum" in plan) {
            let splitPlan = plan.zeitraum.split(" - ")
            currentStart = splitPlan[0]
            currentEnde = splitPlan[1]
        }
        return(
            <>  
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <InfoOverlay infotitle={"Kalenderwoche"} description={INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD}/>
                        <Datepicker size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang={currentStart} placeholderEnde={currentEnde} />  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
}

export default SchichtplanFreigeben;