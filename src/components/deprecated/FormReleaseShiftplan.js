import React from "react";
import {
    Col,
    Input,
    Row
} from "reactstrap"
import { INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD, INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME } from "../../constants/InfoTexts";
import Datepicker from "../DateWeekPicker";
import InfoLabel from "../InfoLabel";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftplanName } from "../../reducers/userInput";

const FormReleaseShiftplan = (props) => {
    const dispatch = useDispatch()
    const Shiftplan = useSelector(state => state.Shiftplan);
        let currentStart = "1.1.2021"
        let currentEnde = "7.1.2021"
        if ( "zeitraum" in Shiftplan) {
            let splitPlan = Shiftplan.zeitraum.split(" - ")
            currentStart = splitPlan[0]
            currentEnde = splitPlan[1]
        }
        return(
            <>  
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >

                        <InfoLabel title={"Neuer Name"} description={INFO_SHIFTPLAN_RELEASE_WITH_NEW_NAME}/>
                        <Input type="text" className="form-control-alternative edit-event--description input-autosize form-control" size="lg" placeholder={Shiftplan.name} name="name" onChange={(event) => dispatch(settingShiftplanName(event.target.value))}/> 
                        <br/>
                        <InfoLabel title={"Kalenderwoche"} description={INFO_SHIFTPLAN_RELEASE_FOR_NEW_PERIOD}/>
                        <Datepicker size="lg"/>  
                        <br/>
                    </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
}

export default FormReleaseShiftplan;