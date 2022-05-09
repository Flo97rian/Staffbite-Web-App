import React from "react";
import {
    Button,
    Label,
    ModalBody
} from "reactstrap"
import store from "../store";
import PropTypes from 'prop-types';


const ButtonEmployeesRoles = () => {
    return (
            <Button name="showErstellen" className="float-right mt-4 ml-2 mr-0 button_mitartbeitereinladen"  color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: "showEmployeesRoles"})}}><p className="m-0 text-white">Rollen festlegen</p></Button>
        )
}

export default ButtonEmployeesRoles