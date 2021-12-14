import React from "react";
import PropTypes from "prop-types";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import {
    Input,
    FormGroup,
    FormFeedback
} from "reactstrap"
import { FEEDBACK_VALID_EMPLOYEE_EMAIL, FEEDBACK_INVALID_EMPLOYEE_EMAIL } from "../../../../constants/FeedbackText";

function InputStringValid (props) {
    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        if(props.currentValue === "Max Mustermann" || props.currentValue === "max@mustermann.de") {
            return (   
            <FormGroup className="mb-0">
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )} else if(hasIsValid) {
            return (   
                <FormGroup className="mb-0">
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' valid={props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback valid>{props.valid}</FormFeedback>
                </FormGroup>
            )
        } else {
            return (   
            <FormGroup className="mb-0">
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className='bg-secondary' invalid={!props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback invalid>{props.invalid}</FormFeedback>
            </FormGroup>
        )}
    } else {
        return (
            <FormGroup className="mb-0">
                <p className="mb-0">{props.label}</p>
                <Input type="text" size="lg" className='bg-secondary' label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )
    }
}
export default InputStringValid;

InputStringValid.propTypes = {
    value: PropTypes.string
}