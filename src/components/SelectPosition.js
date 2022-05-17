import _ from "lodash";
import React from "react";
import {
    FormGroup,
    Input
} from "reactstrap"
import { INFO_SHIFTPLAN_SHIFT_POSITION } from "../constants/InfoTexts";
import { useSelector, useDispatch } from "react-redux";
import InfoLabel from "./InfoLabel"
import { settingShiftPosition } from "../reducers/userInput";
function SelectPosition () {
    const positions = useSelector(state => state.Meta.schichten);
    const currentPosition = useSelector(state => state.Shiftplan.plan[state.shiftSlot.row].Wochentag.ShiftPosition)
    const dispatch = useDispatch()
        return(
            <FormGroup className="">
            <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                <Input type="select" name="position" className=" edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingShiftPosition(event.target.value))}>
                    {positions.map((item, index) => {
                        if(item === currentPosition) {
                            return <option key={index} selected value={currentPosition}>{currentPosition}</option>
                        }
                    return (<option key={index} value={item}>{item}</option>
                    )})}
                </Input>
            </FormGroup>    
            )
    
}

export default SelectPosition;