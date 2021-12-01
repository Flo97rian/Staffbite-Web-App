import React from "react";
import PropTypes from "prop-types";
import InfoOverlay from "./InfoOverlay";
import InfoLabel from "./InfoLabel";
import {
    Input,
} from "reactstrap"

function InputString (props) {
    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        if(hasIsValid) {
            return (   
                <>
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className='bg-secondary' valid={props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </>
            )
        } else {
            return (   
            <>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' invalid={!props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </>
        )}
    } else {
        return (
            <>
                <p className="mb-0">{props.label}</p>
                <Input type="text" size="lg" className='bg-secondary' label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </>
        )
    }
}
export default InputString;

InputString.propTypes = {
    value: PropTypes.string
}