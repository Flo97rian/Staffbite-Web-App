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

function InputString (props) {
    InputString.propTypes = {
        value: PropTypes.string
    }
    
    InputString.defaultProps = {
        disabled: false
    }
    const [edit, setEdit] = useState(false);
    function getEditAppends () {
        if(props.disabled) return null
        if(edit) {
            return (
                <>
                    <InputGroupAddon addonType="append">
                        <Button 
                        color="success" 
                        onClick={() => setEdit(!edit)}
                        >
                            <i className="fas fa-check text-white"></i>
                        </Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button 
                        color="danger" 
                        onClick={
                            () => {
                                setEdit(!edit)

                            }}
                        >
                            <i className="fas fa-ban text-white"></i>
                        </Button>
                </InputGroupAddon>  
            </>
            )
        } else {
            return (
                <InputGroupAddon addonType="append" className="border-rounded">
                    <Button 
                    color="success" 
                    onClick={() => setEdit(!edit)}
                    >
                        <i className="fas fa-pen text-white"></i>
                    </Button>
                </InputGroupAddon>  
            )
        }
    }
    return (   
        <FormGroup>
            <InfoLabel title={props.label} description={props.description}></InfoLabel>
            <InputGroup>
            <Input 
                type="text"
                invalid={((props.value === props.placeholder && props.placeholder === "Max Mustermann") || _.isEmpty(props.value) || props.value.length >= 30)}
                label={props.label}
                name={props.name}
                disabled={props.disabled}
                defaultValue={props.placeholder}
                placeholder={props.placeholder}
                onChange={edit ? props.onChange : null}>
                </Input>
                    {getEditAppends()}
            </InputGroup>
            <small className="text-danger" invalid={((props.value === props.placeholder && props.placeholder === "Max Mustermann") || _.isEmpty(props.value) || props.value.length >= 30)}>
                        {(props.value === props.placeholder && props.placeholder === "Max Mustermann") ? "Wähle bitte einen anderen Namen." : ""}
                        {_.isEmpty(props.value) ? "Wähle bitte einen Namen." : ""}
                        { props.value.length >= 30 ? "Wähle bitte einen kürzeren Namen." : ""}
                    </small>
        </FormGroup>
    )
}
export default InputString;
