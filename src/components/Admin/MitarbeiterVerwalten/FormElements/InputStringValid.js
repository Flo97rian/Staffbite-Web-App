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
            <FormGroup>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )} else if(hasIsValid) {
            return (   
                <FormGroup>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" valid={props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback valid>{props.valid}</FormFeedback>
                </FormGroup>
            )
        } else {
            return (   
            <FormGroup>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" invalid={!props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                <FormFeedback invalid>{props.invalid}</FormFeedback>
            </FormGroup>
        )}
    } else {
        return (
            <FormGroup>
                <p className="mb-0">{props.label}</p>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )
    }
}
export default InputStringValid;

InputStringValid.propTypes = {
    value: PropTypes.string
}