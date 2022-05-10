import _ from "lodash";
import React from "react";
import {
    Col,
    Row,
    Button,
    Input,
    FormGroup,
    FormFeedback
} from "reactstrap"
import { FEEDBACK_INVALID_NOTICE } from "../constants/FeedbackText";
import getShiftsNotice from "../libs/getShiftsNotice";
const ChangeShiftsNotice = (props) => {
    const day = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.shiftplan.plan
    const shiftNotice = getShiftsNotice(shiftplan, row, day);
    let currentNotice = props.userInput.notice;
        if(props.changeNotice) {
                return(
                    <FormGroup className="mb-3">
                        <Input
                        className="mb-2"
                        name="notice"
                        type="textarea"
                        invalid={currentNotice.length > 80}
                        placeholder={shiftNotice}
                        onChange={(e) => props.onChange(e)}
                        />
                        <FormFeedback invalid>{FEEDBACK_INVALID_NOTICE}</FormFeedback>
                        <Button hidden={_.isEmpty(shiftNotice)} classname="mt-0"color="warning" size="sm" onClick={() => props.handleResetShiftNotice(props.modalkey)}>Zurücksetzen</Button>
                    </FormGroup>
                )
        }
        return (
            <p>
                {shiftNotice}
                <i aria-hidden="true" className="fas fa-edit text-muted m-2" onClick={() => props.handleChangeNotice()}></i>
            </p>
        );
}

export default ChangeShiftsNotice;