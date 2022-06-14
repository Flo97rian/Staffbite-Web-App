import React, { useEffect } from "react";
import {
    Col,
    Row,
    FormGroup,
    Input
} from "reactstrap"
import {INFO_SHIFTPLAN_NAME} from "../constants/InfoTexts";
import { useSelector, useDispatch } from "react-redux";
import InfoLabel from "./InfoLabel";
import { settingShiftplanName } from "../reducers/userInput";
import format from "date-fns/format";
import { de } from "date-fns/locale";
import AddShift from "./AddShift";

const FormCalendarCreateShiftplan = () => {
    const dispatch = useDispatch()
    const Dates = useSelector(state => state.date);

    const getShiftplanDateName = () => {
        let shiftplanName = "";
        if(Dates.start && Dates.end) {
            let startDate = new Date(Dates.start);
            let endDate = new Date(Dates.end);
            let startOfWeek = startDate.getDate();
            let endOfWeek = endDate.getDate();
            let startMonthOfWeek = format(endDate, "MMM", {locale: de, weekStartsOn: 1});
            let endMonthOfWeek = format(endDate, "MMM", {locale: de, weekStartsOn: 1});
            shiftplanName = startOfWeek + '. ' + startMonthOfWeek + ' - ' + endOfWeek + '. ' + endMonthOfWeek;  
        }
        return shiftplanName;

    }


        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                    <FormGroup className="mb-0">
                    <InfoLabel title="Name des Schichtplans" description={INFO_SHIFTPLAN_NAME}></InfoLabel>
                    <Input type="text" placeholder={getShiftplanDateName()} onChange={(event) => dispatch(settingShiftplanName(event.target.value))}></Input>
                    </FormGroup>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            <div className="mt-3">
                <AddShift />
            </div>
            </>
        )
    }

export default FormCalendarCreateShiftplan;