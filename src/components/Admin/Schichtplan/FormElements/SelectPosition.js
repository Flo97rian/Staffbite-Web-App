import React from "react";
import {
    FormGroup,
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
            <FormGroup className="mt-4">
            <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                <Input size="lg"  type="select" name="position" className="form-control-alternative edit-event--description input-autosize form-control" onChange={(e) => props.onChange(e, "changeSchichtplan")}>
                    <option value="" hidden>{currentPosition}</option>
                    {schichten.map(item => {
                    return (<option value={item}>{item}</option>
                    )})}
                </Input>
            </FormGroup>    
            )
         } else {
            return(
                <FormGroup className="mt-4">
                <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                    <Input size="lg" type="select" name="position" className="form-control-alternative edit-event--description input-autosize form-control" onChange={(e) => props.onChange(e, "changeSchichtplan")}>
                        {schichten.map(item => {
                        return (<option value={item}>{item}</option>
                        )})}
                    </Input>
                </FormGroup>    
                )
         }
    }
    
}

export default SelectPosition;