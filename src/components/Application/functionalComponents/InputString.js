import React from "react";
import PropTypes from "prop-types";
import InfoOverlay from "./InfoOverlay";
import InfoLabel from "./InfoLabel";
import {
    FormGroup,
    Input,
} from "reactstrap"

function InputString (props) {
    let hasInfo = props.info;
    if (hasInfo) {
        let hasIsValid = props.isValid
        if(hasIsValid) {
            return (   
                <FormGroup>
                    <InfoLabel title={props.label} description={props.description}></InfoLabel>
                    <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" valid={props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
                </FormGroup>
            )
        } else {
            return (   
            <FormGroup>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" invalid={!props.isValid} label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )}
    } else {
        return (
            <FormGroup>
                <InfoLabel title={props.label} description={props.description}></InfoLabel>
                <Input type="text" size="lg" className="form-control-alternative edit-event--description input-autosize form-control" label={props.label} name={props.name} value={props.value} defaultValue={props.placeholder} placeholder={props.placeholder} onChange={props.onChange}></Input>
            </FormGroup>
        )
    }
}
export default InputString;

InputString.propTypes = {
    value: PropTypes.string
}