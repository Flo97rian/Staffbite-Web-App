import React, {useEffect, useState} from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const SchichtplanView = (props) => {
    const schichtplan = props.schichtplan;
    console.log("moin")
    
    if(schichtplan !== null) {
    const schichtplanLength = schichtplan.length - 1
    return (
        <table
        width={1200}>
            <tbody>
                {schichtplan.map((row, index) => {
                    if (index === schichtplanLength) return null
                    else if (index === 0) {
                    return (
                        <tr className="card_wochentage">
                            <td
                            width={150}
                            draggable
                            >
                                {showWochentag(schichtplan[index].Wochentag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Montag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Dienstag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Mittwoch)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Donnerstag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Freitag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Samstag)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(schichtplan[index].Sonntag)}
                            </td>
                        </tr>
                    )
                   }
                   return (
                    <tr>
                        <td
                        className="card_schichtenname"
                        draggable
                        >
                        {showShichtTag(schichtplan[index].Wochentag)}
                        </td>
                        <td>
                           {showDefault(schichtplan[index].Montag)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Dienstag)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Mittwoch)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Donnerstag)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Freitag)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Samstag)}
                        </td>
                        <td>
                            {showDefault(schichtplan[index].Sonntag)}
                        </td>
                    </tr>
                   ) 
                })}
                
            </tbody>

        </table>
    );

    function showWochentag(slot) {
        return (
            <ListGroup>
                <ListGroupItem className="background-staffbite-primary text-white text-center lead">
                  {slot}  
                </ListGroupItem>
            </ListGroup>
        )
    }
    function showShichtTag(slot) {
        return (
            <ListGroup>
        <ListGroupItem className="m-0 p-0 background-staffbite-primary text-white text-center" style={{"cursor": "pointer"}}>
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i aria-hidden="true" className="float-left m-2">{slot.anzahl}</i>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
            <small className="mb-2">{slot.ShiftName}</small>
            <br/>
            {slot.ShiftStart} - {typeof slot.ShiftEnd === "boolean" && slot.ShiftEnd ? <>open End</> : <>{slot.ShiftEnd}</>}
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
        )
    }

    function showDefault(slot) {
        return (
            <ListGroup>
                <ListGroupItem style={{"cursor": "pointer"}} className="mb-0" color="" onClick={() => props.handleShowModal("showSchichtBearbeiten")}><p className="m-0"><br/><br/></p></ListGroupItem>
            </ListGroup>
        )
    }
}
return null;
}

export default SchichtplanView;