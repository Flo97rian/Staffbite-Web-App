import React from "react";
import InfoOverlayWithSwitch from "./InfoOverlayWithSwitch";
import {
    Input,
    FormGroup,
    Form
} from "reactstrap"
import _ from "lodash";
import { useSelector } from "react-redux";

function InputTimeWithSwitch (props) {
    const index = useSelector(state => state.shiftSlot.index);
    let shiftDetails;
    let ShiftEnd;
    let openEnd;
    if (_.isObject(props.shiftplan) && props.shiftSlot) {
        shiftDetails = props.shiftplan.plan[index].Wochentag;
        ShiftEnd = shiftDetails.ShiftEnd;
        let userInputEnde = props.userInput.ende;
        openEnd = isOpenEnd(userInputEnde, ShiftEnd)
    } else if (_.isObject(props.Schichtplan) && props.shiftSlot) {
        shiftDetails = props.Schichtplan.plan[index].Wochentag;
        ShiftEnd = shiftDetails.ShiftEnd;
        let userInputEnde = props.userInput.ende;
        openEnd = isOpenEnd(userInputEnde, ShiftEnd)
    }

    function isOpenEnd (userInputEnde, ShiftEnd) {
        let openEnd = !1;
        if (typeof ShiftEnd === "boolean" && ShiftEnd && typeof userInputEnde !== "boolean" && userInputEnde === "24:00") {
            openEnd = !0;
            }
        if (typeof userInputEnde === "boolean" && userInputEnde) {
            openEnd = !0
        }
        return openEnd;
    }
        return(
            <>
                {props.info ?
                <Form>
                    <FormGroup>
                        <InfoOverlayWithSwitch infotitle={props.label} description={props.description} checked={openEnd} {...props}/>
                        {openEnd ? 
                        null
                        : 
                        <Input type="time" className=" edit-event--description input-autosize form-control" name={props.name} value={props.value} defaultValue={props.placeholder} onChange={props.onChange}></Input>
                        }
                    </FormGroup>
                </Form>
                : 
                <Form>
                    <FormGroup>
                        <p className="mb-0">{props.label}</p>
                        <Input type="time" name={props.name} value={props.value} defaultValue={props.placeholder} onChange={props.onChange}></Input>
                    </FormGroup>
                </Form>
                }             
        </>
        )
    }
export default InputTimeWithSwitch;