import React from "react";
// core components
import {
    ListGroup,
    ListGroupItem
} from "reactstrap"
import store from "../../../../store";

const SchichtplanElement = (props) => {
    const setApplicant = (index, col) => {
        store.dispatch({type: "OPEN", payload: "applyIsActive"})
        store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}})
    }

    const dataModal = (e) => {
        const index = props.index;
        const col = props.col;
        const obj = e[index][col];
        const isFree = obj.frei;
        const hasApplicants =  Object.keys(obj).includes("applicants")
        const applicants = obj.applicants
        const isDiscribeWeekDay = (col === "Wochentag");
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return (<ListGroup>
                            <ListGroupItem style={{"marginBottom": "0"}}  color="primary"><p style={{"margin": "0"}}>{obj}</p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="primary"><p style={{"margin": "0"}}><small>{obj.ShiftName}</small><br/>{obj.ShiftStart} - {obj.ShiftEnd}</p></ListGroupItem>
                    </ListGroup>
        )}else if (!isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="primary"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && Object.keys(applicants).length > 1 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="success" onClick={(e, j) => setApplicant(index, col)}><p style={{"margin": "0"}}>{applicants[Object.keys(applicants)[0]]}<br/>+ {Object.keys(applicants).length - 1} weitere</p></ListGroupItem>
                    </ListGroup>
        )}else if (!isFree && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="light"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="success" onClick={(e, j) => setApplicant(index, col)}><p style={{"margin": "0"}}>{applicants[Object.keys(obj.applicants)[0]]}<br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color=""><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )}

    }
        return (
        <>
            {dataModal(props.plaene[props.plan].plan)}
        </>
        );
    }
export default SchichtplanElement;