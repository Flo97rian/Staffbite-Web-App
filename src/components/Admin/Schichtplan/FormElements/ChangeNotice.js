import React from "react";
import {
    Col,
    Row,
    Button,
    Input,
    FormGroup
} from "reactstrap"
const ChangeNotice = (props) => {
    const day = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day];
    let notice = shift.notice;
        function noticeIsValid() {
            let isValid = !1;
            let notice = props.userInput.notice;
            let noticeLength = notice.length;
            if(noticeLength > 80) {
                isValid = !0;
            }
            return isValid;
        }
        function hasShiftNotice() {
            let value = !1;
            let slot = props.shiftSlot;
                let keys = Object.keys(props.shiftplan.plan[slot.row][slot.col])
                if(keys.includes("notice")) {
                    let notice = props.shiftplan.plan[slot.row][slot.col].notice
                    if(notice !== "") {
                        value = !0;
                    }
                }
            return value;
        }
        function getShiftNotice() {
            let value = "Trage hier deine Notiz ein.";
            let slot = props.shiftSlot;
                let keys = Object.keys(props.shiftplan.plan[slot.row][slot.col])
                if(keys.includes("notice")) {
                    if(props.shiftplan.plan[slot.row][slot.col].notice !== "") {
                        value = props.shiftplan.plan[slot.row][slot.col].notice
                    }
                }
            return value;
        }
        if(props.changeNotice) {
            return(
                <FormGroup className="mb-3">
                    <Input
                    className="mb-2"
                    name="notice"
                    type="textarea"
                    invalid={noticeIsValid()}
                    placeholder={getShiftNotice()}
                    onChange={(e) => props.onChange(e)}
                    />
                     {hasShiftNotice() 
                    ? 
                    <Button classname="mt-0"color="warning" size="sm" onClick={() => props.handleResetShiftNotice(props.modalkey)}>Zurücksetzen</Button>
                    :
                    <></>
                    }   
                </FormGroup>
            )
        }
        return (
            <p>
                {notice}
                <i aria-hidden="true" className="fas fa-edit text-muted m-2" onClick={() => props.handleChangeNotice()}></i>
            </p>
        );
}

export default ChangeNotice;