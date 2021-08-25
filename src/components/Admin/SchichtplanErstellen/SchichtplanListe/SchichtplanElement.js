import React from "react";
// core components
import {
    Badge,
    ListGroup,
    ListGroupItem,
} from "reactstrap"
import store from "../../../../store";

export const SchichtplanElement = (props) => {

    const setPrio = (index, col, bool) => {
        store.dispatch({type: "OPEN", payload: "prioIsActive"})
        store.dispatch({type: "setShiftSlot", payload: { row: index, col: col, prio: bool}})
    }

    const dataModal = (e) => {
        let index = props.index;
        let col = props.col;
        let obj = e[index][col];
        let isFree = obj.frei;
        let isPrio = obj.prio;
        let hasApplicants =  Object.keys(obj).includes("applicants")
        let isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return (<ListGroup>
                            <ListGroupItem style={{"marginBottom": "0"}} color="primary"><p style={{"margin": "0"}}>{obj}</p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: index})}}><p style={{"margin": "0"}}><small>{obj.ShiftName}</small><br/>{obj.ShiftStart} - {obj.ShiftEnd}</p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: index})}}><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && hasApplicants && Object.keys(obj).length > 4 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="success"><p style={{"margin": "0"}}>{obj.applicants[Object.keys(obj.applicants)[0]]}<br/>+ {Object.keys(obj.applicants).length - 1} weitere</p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && hasApplicants && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="success"><p style={{"margin": "0"}}>{obj.applicants[Object.keys(obj.applicants)[0]]}<br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && isPrio && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"margin": "0", "padding": "0"}} color="" onClick={() => setPrio(index, col, !0)}><small style={{"float": "right"}} ><Badge color="warning">Expert</Badge></small><p style={{"padding": "16px", "marginBottom": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="light"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroupItem tag="p" style={{"marginBottom": "0"}} color="" onClick={() => setPrio(index, col, !1)}><br/><br/></ListGroupItem>
                    </ListGroup>
        )}

    }
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }