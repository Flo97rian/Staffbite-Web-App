import _ from "lodash";
import React from "react";
import {
    FormGroup,
    Input
} from "reactstrap"
import { INFO_SHIFTPLAN_SHIFT_POSITION } from "../constants/InfoTexts";
import InfoLabel from "./InfoLabel"
function SelectPosition (props) {
    const positions = _.get(props.Meta, "schichten", []);
    const currentPosition = _.get(props.shiftDetails, "ShiftPosition", "")
        return(
            <FormGroup className="">
            <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                <Input type="select" name="position" className=" edit-event--description input-autosize form-control" onChange={(e) => props.onChange(e, "changeSchichtplan")}>
                    <option value="" hidden={!_.isEmpty(currentPosition)}>{currentPosition}</option>
                    {positions.map(item => {
                    return (<option value={item}>{item}</option>
                    )})}
                </Input>
            </FormGroup>    
            )
    
}

export default SelectPosition;