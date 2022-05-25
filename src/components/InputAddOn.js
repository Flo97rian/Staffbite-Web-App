import React, { useState } from "react";
import PropTypes from "prop-types";
import InfoOverlay from "./InfoOverlay";
import InfoLabel from "./InfoLabel";
import * as _ from 'lodash'
import {
    FormFeedback,
    FormGroup,
    Input,
    InputGroupAddon,
    Button,
    InputGroup
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux";

function InputAddOn (props) {
    const dispatch = useDispatch();
    if(props.editable) {
        return (
            <>
                <InputGroupAddon addonType="append">
                    <Button 
                    color="success" 
                    onClick={() => {
                        props.setEditable(!props.editable)
                        }}
                    >
                        <i className="fas fa-check text-white"></i>
                    </Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                    <Button 
                    color="danger" 
                    onClick={
                        () => {
                            props.setEditable(!props.editable)
                            dispatch(props.declineChanges())

                        }}
                    >
                        <i className="fas fa-ban text-white"></i>
                    </Button>
            </InputGroupAddon>  
        </>
        )
    }
    return (
        <InputGroupAddon addonType="append" className="border-rounded">
            <Button 
            color="success" 
            onClick={() => props.setEditable(!props.editable)}
            >
                <i className="fas fa-pen text-white"></i>
            </Button>
        </InputGroupAddon>  
    )
}
export default InputAddOn;
