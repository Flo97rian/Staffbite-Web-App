import React from "react";
import PropTypes from "prop-types";
import InfoLabel from "./InfoLabel";
import {
    Input,
} from "reactstrap"
import { shiftplanNameIsPlaceholder } from "./ValidInputs";

function InputString (props) {

    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        let isPlaceholder = shiftplanNameIsPlaceholder(props.currentValue)

        if (isPlaceholder) {
            return (
                <>
                    <p className="mb-0">{props.label}</p>
                    <Input type="text" size="lg" className='bg-secondary' label={props.label} name={props.name} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </>
            )
        } else if(hasIsValid) {
            return (   
                <>
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className='bg-secondary' valid={props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </>
            )
        } else {
            return (   
            <>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' invalid={!props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </>
        )}
    }
    return null;
}
export default InputString;

InputString.propTypes = {
    value: PropTypes.string
}