import React from "react";
import {
    Input
} from "reactstrap"
import { INFO_SHIFTPLAN_SHIFT_POSITION } from "../../../../constants/InfoTexts";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel"
function SelectPosition (props) {
    if ("schichten" in props.Meta ) {
        let schichten = props.Meta.schichten;
        let currentPosition;
        if (props.shiftDetails && props.shiftDetails.ShiftPosition) {
            currentPosition = props.shiftDetails.ShiftPosition
            return(
            <>
            <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                <Input type="select" name="position" onChange={(e) => props.onChange(e, "changeSchichtplan")}>
                    <option value="" hidden>{currentPosition}</option>
                    {schichten.map(item => {
                    return (<option value={item}>{item}</option>
                    )})}
                </Input>
            </>    
            )
         } else {
            return(
                <>
                <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                    <Input type="select" name="position" onChange={(e) => props.onChange(e, "changeSchichtplan")}>
                        {schichten.map(item => {
                        return (<option value={item}>{item}</option>
                        )})}
                    </Input>
                </>    
                )
         }
    }
    
}

export default SelectPosition;