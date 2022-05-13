import React from "react";
import {
    Button,
} from "reactstrap";
import store from "../../store";
import { isValidShiftplan } from "../ValidFunctions"

const ModalAlgButton = (props) => {
    if (isValidShiftplan(props.shiftplan) && props.shiftplan.id.split("#").includes(props.trigger)) {
        return (
        <Button className="float-right mt-2 ml-2 mr-0" size="lg" color="primary" onClick={() => props.onClick(props.modal)}><p className="m-0 text-white">{props.title}</p></Button> 
        )
    } else {
        return null
    }

    }
export default ModalAlgButton;