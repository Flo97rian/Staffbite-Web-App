import _ from "lodash";
import React, {useState} from "react";
import {
    Col,
    Row,
    Button,
    Input,
    FormGroup,
    FormFeedback
} from "reactstrap"
import { FEEDBACK_INVALID_NOTICE } from "../constants/FeedbackText";
import { useSelector, useDispatch } from "react-redux";
import { resettingShiftNotice } from "../reducers/Shiftplan";
import { settingShiftNotice } from "../reducers/userInput";
const ChangeShiftsNotice = (props) => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch()
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice)
    const userInputShiftNotice = useSelector(state => state.userInput.shiftNotice);

    const resetShiftNotice = () => {
        dispatch(resettingShiftNotice({index: index, day: day}));
    }
        if(edit) {
                return(
                    <FormGroup className="mb-3">
                        <Input
                        className="mb-2"
                        name="notice"
                        type="textarea"
                        invalid={userInputShiftNotice.length > 80}
                        placeholder={ShiftNotice}
                        onChange={(event) => dispatch(settingShiftNotice(event.target.value))}
                        />
                        <FormFeedback invalid>{FEEDBACK_INVALID_NOTICE}</FormFeedback>
                        <Button hidden={_.isEmpty(userInputShiftNotice)} classname="mt-0"color="warning" size="sm" onClick={() => resetShiftNotice()}>Zurücksetzen</Button>
                    </FormGroup>
                )
        }
        return (
            <p>
                {ShiftNotice}
                <i aria-hidden="true" className="fas fa-edit text-muted m-2" onClick={() => setEdit(!edit)}></i>
            </p>
        );
}

export default ChangeShiftsNotice;