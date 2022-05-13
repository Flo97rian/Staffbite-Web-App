import React from "react";
import {
    Button
} from "reactstrap"
import { isValidShiftplan } from "../ValidFunctions";

function ButtonUpdateShiftPlan (props) {
    if (isValidShiftplan(props.shiftplan) && props.shiftplan.id.split("#").includes(props.trigger)) {
        return (
            <Button color="primary" className="float-right mt-2 ml-2 mr-0" size="lg" onClick={() => props.onClick()}><p className="m-0 text-white">{props.title}</p></Button> 
        );
    } else {
        return null
    };
}
export default ButtonUpdateShiftPlan;