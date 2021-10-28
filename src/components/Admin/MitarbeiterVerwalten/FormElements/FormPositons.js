import React from "react";

import {
    Badge
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import FilterUnsettedPositions from "./FilterUnsettedPositions";
import FilterSettedPositions from "./FilterSettedPositions";
import { INFO_EMPLOYEE_POSITIONS, INFO_ORGANISATION_POSITIONS } from "../../../../constants/InfoTexts";


const FormPositions = (props) => {
        return(
            <>
                {props.showPositionHinzufuegen ?
                <InputString info={true} description={INFO_ORGANISATION_POSITIONS} label="Position" name="position"  placeholder="" onChange={(e) => props.handlePositionChange(e)}></InputString>
                :
                <InfoOverlay info={true} description={INFO_EMPLOYEE_POSITIONS} infotitle="Position"></InfoOverlay>
                }
                {props.meta ?
                <>
                <FilterSettedPositions {...props}></FilterSettedPositions>
                <FilterUnsettedPositions {...props}></FilterUnsettedPositions>
                </>
                :
                <></>
                }
                <br/>
                {props.showPositionHinzufuegen ?
                <>
                <Badge className="mt-2 mb-4 mr-2" color="success" onClick={() => props.handlePositionErstellen()}>Position erstellen</Badge>
                <Badge className="mt-2 mb-4" color="warning" onClick={() => props.handlePositionHinzufuegenClose()}>x</Badge>
                </>
                :
                <Badge className="mt-2 mb-4" color="light" onClick={() => props.handlePositionHinzufuegen()}>Position erstellen</Badge>
                }
            </>
        )
}

export default FormPositions;