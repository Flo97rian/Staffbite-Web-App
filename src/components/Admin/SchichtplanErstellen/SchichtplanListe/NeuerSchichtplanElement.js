import React from "react";
// core components
import {
    ListGroup,
    ListGroupItem,
    Badge
} from "reactstrap"
import store from "../../../../store";

export const NeuerSchichtplanElement = (props) => {

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
        let isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return (<ListGroup>
                            <ListGroupItem color="primary"><p style={{"margin": "0"}}>{obj}</p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: index})}}><p style={{"margin": "0"}}><small>{obj.ShiftName}</small><br/>{obj.ShiftStart} - {obj.ShiftEnd}</p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && !isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem color="light"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && isPrio && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"margin": "0", "padding": "0"}} color="" onClick={() => setPrio(index, col, !0)}><small style={{"float": "right"}} ><Badge color="warning">prio</Badge></small><p style={{"padding": "16px", "marginBottom": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: index})}}><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="" onClick={() => setPrio(index, col, !1)}><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>   
        )}
    }
        return (
        <>
            {dataModal(props.Schichtplan)}
        </>
        );
    }