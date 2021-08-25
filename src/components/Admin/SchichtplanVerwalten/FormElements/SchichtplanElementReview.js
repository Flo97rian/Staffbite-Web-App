import React from "react";
// core components
import {
    ListGroup,
    ListGroupItem
} from "reactstrap"
import store from "../../../../store";

const SchichtplanElementReview = (props) => {

    const setApplicant = (index, col) => {
        store.dispatch({type: "OPEN", payload: "applyIsActive"})
        store.dispatch({type: "setApplicantSlot", payload: { row: index, col: col}})
    }
    const dataModal = (e) => {
        let index = props.index;
        let col = props.col;
        let obj = e[index][col];
        let isFree = obj.frei;
        let hasApplicants =  Object.keys(obj).includes("setApplicants")
        let isDiscribeWeekDay = (col === "Wochentag");
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
        )} else if (isFree && hasApplicants && Object.keys(obj.setApplicants).length > 1 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="success" onClick={(e, j) => setApplicant(index, col)}><p style={{"margin": "0"}}>{obj.setApplicants[Object.keys(obj.setApplicants)[0]]}<br/>+ {Object.keys(obj.setApplicants).length - 1} weitere</p></ListGroupItem>
                    </ListGroup>
        )}else if (!isFree && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="light"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && Object.keys(obj.setApplicants).length == 1 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}}  color="success" onClick={(e, j) => setApplicant(index, col)}><p style={{"margin": "0"}}>{obj.setApplicants[Object.keys(obj.setApplicants)[0]]}<br/><br/></p></ListGroupItem>
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
export default SchichtplanElementReview;