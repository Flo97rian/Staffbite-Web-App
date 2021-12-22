import React from "react";
import {
    Col,
    Input,
    Row
} from "reactstrap"
import { INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD, INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME } from "../../../../constants/InfoTexts";
import Datepicker from "../../../Application/functionalComponents/DateWeekPicker";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";

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

                        <InfoLabel title={"Neuer Name"} description={INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME}/>
                        <Input type="text" className="form-control-alternative edit-event--description input-autosize form-control" size="lg" placeholder={plan.name} name="name" onChange={(e) => props.onChange(e)}/> 
                        <br/>
                        <InfoLabel title={"Kalenderwoche"} description={INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD}/>
                        <Datepicker size="lg" getDates={props.getDates} start="WochenStart" ende="WochenEnde" placeholderAnfang={currentStart} placeholderEnde={currentEnde} />  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
}

export default SchichtplanFreigeben;