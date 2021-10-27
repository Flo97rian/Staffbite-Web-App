import React from "react";

import {
    Badge
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_IS_ACTIVE, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_MONTHLY_WORKING_HOURES, INFO_EMPLOYEE_OVERTIME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK, INFO_EMPLOYEE_VACATION, INFO_ORGANISATION_POSITIONS } from "../../../../constants/InfoTexts";
//Ziel: Zeige die Positionen des Betriebs an, wenn der User sie nicht schon inne hat
function filterSettedPositions (OrgPositions, UserPositions ) {
    let settedPositions = OrgPositions.filter(item => UserPositions[item])
    settedPositions.map((item, index) => {
        return (
            <Badge key={index} className="mr-2 mt-2" color="primary" onClick={() => props.handleRemovePositions(item)}>{item}</Badge>
        )
    })

}
const FormPositions = (props) => {
        const employee = props.mitarbeiterdaten
        return(
            <>
                        {props.showPositionHinzufuegen ?
                        <InputString info={true} description={INFO_ORGANISATION_POSITIONS} label="Position" name="position"  placeholder="" onChange={(e) => props.handlePositionChange(e)}></InputString>
                        :
                        <InfoOverlay info={true} description={INFO_EMPLOYEE_POSITIONS} infotitle="Position"></InfoOverlay>
                        }
                        { props.employeeIsActive !== null ? 
                        props.employeeIsActive["position"].map((item, index) => {
                            return (
                                <Badge key={index} className="mr-2 mt-2" color="primary" onClick={() => props.handleRemovePositions(item)}>{item}</Badge>
                            )
                        })
                        :
                        <></>
                        }
                        { props.meta.schichten !== null ? 
                        props.meta.schichten.map((item, index) => (!props.employeeIsActive["position"].includes(item) ?
                                <Badge key={index} className="mr-2" color="light" onClick={() => props.handleSetPositions(item)}>{item}</Badge>
                        :
                        <></>
                        ))
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