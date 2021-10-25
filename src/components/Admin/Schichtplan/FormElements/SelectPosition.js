import React from "react";
import {
    Input
} from "reactstrap"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
function SelectPosition (props) {
    if ("schichten" in props.Meta ) {
        let schichten = props.Meta.schichten;
        let currentPosition;
        if (props.shiftDetails && props.shiftDetails.ShiftPosition) {
            currentPosition = props.shiftDetails.ShiftPosition
            return(
            <>
            <InfoOverlay info={true} infotitle="Position" description={"Wählen Sie eine Position der Schicht. (z.B. Service, Küche etc.)"}></InfoOverlay>
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
                <InfoOverlay info={true} infotitle="Position" description={"Wählen Sie eine Position der Schicht. (z.B. Service, Küche etc.)"}></InfoOverlay>
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