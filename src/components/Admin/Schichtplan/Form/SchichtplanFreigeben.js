import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Datepicker from "../../../Application/functionalComponents/DateRangePickerExample";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

const SchichtplanFreigeben = (props) => {
        let plan = props.plaene[props.plan];
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
                        <InfoOverlay infotitle={"Kalenderwoche"} description={"Wenn Sie den Schichtplan für eine andere Woche freigeben möchten, tragen Sie die jeweilige Woche hier ein. Tragen Sie nichts ein, wird der Plan für die bisher eingetragene Woche freigegeben"}/>
                        <Datepicker size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang={currentStart} placeholderEnde={currentEnde} />  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
}

export default SchichtplanFreigeben;