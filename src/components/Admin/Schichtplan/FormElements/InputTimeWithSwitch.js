import React from "react";
import InfoOverlayWithSwitch from "./InfoOverlayWithSwitch";
import {
    Input,
    FormGroup,
    Form
} from "reactstrap"

function InputTimeWithSwitch (props) {
    let shiftDetails;
    let row;
    let ShiftEnd;
    let openEnd;
    if (props.shiftplan && props.shiftSlot) {
        row = Number(props.shiftSlot.row);
        shiftDetails = props.shiftplan.plan[row].Wochentag;
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
                        <Input type="time" size="lg" name={props.name} value={props.value} onChange={props.onChange}></Input>
                        }
                    </FormGroup>
                </Form>
                : 
                <Form>
                    <FormGroup>
                        <p className="mb-0">{props.label}</p>
                        <Input type="time" size="lg" name={props.name} value={props.value} defaultValue={props.placeholder} onChange={props.onChange}></Input>
                    </FormGroup>
                </Form>
                }             
        </>
        )
    }
export default InputTimeWithSwitch;