import React from "react";
// core components
import {
    Badge,
    ListGroup,
    ListGroupItem
} from "reactstrap"

export default class SchichtplanElement extends React.PureComponent {
    dataModal(e) {
        let index = this.props.index;
        let col = this.props.col;
        let obj = e[index][col];
        let isFree = obj.frei;
        let hasPrio = Object.keys(obj).includes("prio")
        let hasApplicants =  Object.keys(obj).includes("applicants")
        let isDiscribeWeekDay = (col === "Wochentag");
        let role = this.props.applicantrole;
        if (index === 0 || index === 1 || index === e.length - 1 ) {
            return (<ListGroup>
                            <ListGroupItem style={{"marginBottom": "0"}} color="primary"><p style={{"margin": "0"}}>{obj}</p></ListGroupItem>
                    </ListGroup>
        )}else if (!isFree && (!isDiscribeWeekDay || !role.position["S"].includes(e[index]["Wochentag"].ShiftName)) && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="light"><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (!isFree && isDiscribeWeekDay){
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="primary"><p style={{"margin": "0"}}><small>{obj.ShiftName}</small><br/>{obj.ShiftStart} - {obj.ShiftEnd}</p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && Object.keys(obj.applicants).includes(role.SK["S"]) && Object.keys(obj.applicants).length > 1 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="success" onClick={(e, j) => this.props.onClick(index, col)}><p style={{"margin": "0"}}>{role.name["S"]}<br/>+ {Object.keys(obj.applicants).length - 1} weitere</p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && Object.keys(obj.applicants).includes(role.SK["S"]) && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="success" onClick={(e, j) => this.props.onClick(index, col)}><p style={{"margin": "0"}}>{obj.applicants[role.SK["S"]].split(" ")[0]}<br/><br/></p></ListGroupItem>
                    </ListGroup>
        )} else if (isFree && hasApplicants && !Object.keys(obj.applicants).includes(role.SK["S"]) && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="warning" onClick={(e, j) => this.props.onClick(index, col)}><p style={{"margin": "0"}}>{obj.applicants[Object.keys(obj.applicants)[0]]}<br/><br/></p></ListGroupItem>
                    </ListGroup>
        )}else if (isFree && hasApplicants && !Object.keys(obj.applicants).includes(role.SK["S"]) && Object.keys(obj.applicants).length > 1 && !isDiscribeWeekDay) {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="warning" onClick={(e, j) => this.props.onClick(index, col)}><p style={{"margin": "0"}}>{obj.applicants[Object.keys(obj.applicants)[0]]}<br/>+ {Object.keys(obj.applicants).length - 1} weitere</p></ListGroupItem>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroupItem style={{"marginBottom": "0"}} color="" onClick={(e, j) => this.props.onClick(index, col)}><p style={{"margin": "0"}}><br/><br/></p></ListGroupItem>
                    </ListGroup>
        )}

    }
    render() {
        return (
        <>
            {this.dataModal(this.props.plaene[this.props.plan].plan)}
        </>
        );
    }
}