// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
import {
    Button
} from "reactstrap"
import store from "../../../../store";
export const ButtonZurueck = (props) => {
    const ResetCurrentShiftPlan = () => {
        store.dispatch({ type: "ResetCurrentShiftPlan"})
        store.dispatch({ type: "stopShiftPlanIsActive"})
        store.dispatch({ type: "stopShiftPlanIsImported"})
    }
        return (
        <>
            {props.true
            ? 
            <Button color="secondary" onClick={() => ResetCurrentShiftPlan()}>{props.titel}</Button> 
            : 
            <></>
            }
        </>
        );
    }