import React from "react";
import PropTypes from "prop-types";
import InfoLabel from "./InfoLabel";
import {
    Input,
    FormGroup,
    FormFeedback
} from "reactstrap"
import { shiftplanNameIsPlaceholder } from "./ValidInputs";
import { FEEDBACK_INVALID_SHIFTPLAN_NAME, FEEDBACK_VALID_SHIFTPLAN_NAME } from "../../../constants/FeedbackText";

function InputString (props) {

    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        let isPlaceholder = shiftplanNameIsPlaceholder(props.currentValue)

        if (isPlaceholder) {
            return (
                <FormGroup className="mb-0">
                    <p className="mb-0">{props.label}</p>
                    <Input type="text" size="lg" className='bg-secondary' label={props.label} name={props.name} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </FormGroup>
            )
        } else if(hasIsValid) {
            return (   
                <FormGroup className="mb-0">
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className='bg-secondary' valid={props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                    <FormFeedback valid>{FEEDBACK_VALID_SHIFTPLAN_NAME}</FormFeedback>
                </FormGroup>
            )
        } else {
            return (   
            <FormGroup className="mb-0">
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' invalid={!props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback>{FEEDBACK_INVALID_SHIFTPLAN_NAME}</FormFeedback>
            </FormGroup>
        )}
    }
    return null;
}
export default InputString;

InputString.propTypes = {
    value: PropTypes.string
}