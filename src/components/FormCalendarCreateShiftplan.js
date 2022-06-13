import React from "react";
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

const FormCalendarCreateShiftplan = () => {
    const dispatch = useDispatch()

        return(
            <>
            <Row>
                <Col xs={1} ></Col>
                <Col xs={10} >
                    <FormGroup className="mb-0">
                    <InfoLabel title="Name des Schichtplans" description={INFO_SHIFTPLAN_NAME}></InfoLabel>
                    <Input type="text" onChange={(event) => dispatch(settingShiftplanName(event.target.value))}></Input>
                    </FormGroup>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }

export default FormCalendarCreateShiftplan;