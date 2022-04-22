import React from "react";
import PropTypes from "prop-types";
import InfoLabel from "./InfoLabel";
import {
    Input,
    FormGroup,
    FormFeedback
} from "reactstrap"
import { shiftNameIsPlaceholder } from "./ValidInputs";
import { FEEDBACK_INVALID_SHIFT_NAME, FEEDBACK_VALID_SHIFT_NAME } from "../../../constants/FeedbackText";

function InputString (props) {

    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        let isPlaceholder = shiftNameIsPlaceholder(props.currentValue, props.placeholder)
        if (isPlaceholder) {
            return (
                <FormGroup className="mb-0 mt-0">
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" label={props.label} name={props.name} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </FormGroup>
            )
        } else if(hasIsValid) {
            return (   
                <FormGroup className="mb-0 mt-0">
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" valid={props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                    <FormFeedback valid>{FEEDBACK_VALID_SHIFT_NAME}</FormFeedback>
                </FormGroup>
            )
        } else {
            return (   
            <FormGroup className="mb-0  mt-0 ">
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" invalid={!props.isValid} label={props.label} name={props.name} value={props.currentValue} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback invalid>{FEEDBACK_INVALID_SHIFT_NAME}</FormFeedback>
            </FormGroup>
        )}
    }
    return null;
}
export default InputString;

InputString.propTypes = {
    value: PropTypes.string
}