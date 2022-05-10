// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
import {
    Button
} from "reactstrap"
const ButtonBack = (props) => {
        return (
        <>
            {props.true
            ? 
            <Button color="white" size="lg" className="float-right mt-2 ml-2 mr-0" onClick={() => props.onClickVal()}><p className="m-0 text-muted">{props.titel}</p></Button> 
            : 
            <></>
            }
        </>
        );
    }

export default ButtonBack;