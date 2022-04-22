import React, {useEffect, useState} from "react";
import { isMobile } from "react-device-detect";
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
    
    if(schichtplan !== null) {
    const schichtplanLength = schichtplan.length - 1
    return (
        <table
        width={isMobile ? 600 : 1000}>
            <tbody>
                {schichtplan.map((row, index) => {
                    if (index === schichtplanLength) return null
                    else if (index === 0) {
                    return (
                        <tr>
                            <td
                            width={125}
                            draggable
                            >
                                {showWochentag(schichtplan[index].Wochentag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Montag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Dienstag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Mittwoch, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Donnerstag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Freitag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Samstag, index)}
                            </td>
                            <td
                            width={125}>
                                {showWochentag(schichtplan[index].Sonntag, index)}
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
                        {showShichtTag(schichtplan[index].Wochentag, index, "Wochentag")}
                        </td>
                        <td>
                           {showElement(schichtplan[index].Montag, index, "Montag")}
                        </td>
                        <td>
                            {showElement(schichtplan[index].Dienstag, index, "Dienstag")}
                        </td>
                        <td  className="card_shift">
                            {showElement(schichtplan[index].Mittwoch, index, "Mittwoch")}
                        </td>
                        <td>
                            {showElement(schichtplan[index].Donnerstag, index, "Donnerstag")}
                        </td>
                        <td>
                            {showElement(schichtplan[index].Freitag, index, "Freitag")}
                        </td>
                        <td>
                            {showElement(schichtplan[index].Samstag, index, "Samstag")}
                        </td>
                        <td>
                            {showElement(schichtplan[index].Sonntag, index, "Sonntag")}
                        </td>
                    </tr>
                   ) 
                })}
                
            </tbody>

        </table>
    );

    function showElement(shift, index, day) {
        if(shift.frei === false) {
            return showClosed(shift, index, day)
        } else if (shift.prio !== false || shift.notice !== "") {
            return shotDefaultWithPrio(shift, index, day)
        } else {
            return showDefault(shift, index, day)
        }

    }

    function showClosed(shift, index, day) {
        return (
            <ListGroup>
                <ListGroupItem className="mb-0" style={{"color": "#091428", "backgroundColor": "rgba(52, 98, 175, 0.5)", "cursor": "pointer"}} onClick={() => props.handleShowModal("showSchichtBearbeiten", index, day)}><p className="m-0"><br/><br/></p></ListGroupItem>
            </ListGroup>
        )
    }

    function shotDefaultWithPrio ( shift, index, day) {
        return (<ListGroup onClick={() => props.handleShowModal("showSchichtBearbeiten", index, day)}>
             <ListGroupItem style={{"cursor": "pointer"}} className="m-0 p-0"><i className="fas fa-bookmark fa-lg text-success float-right m-2" aria-hidden="true"/><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
        </ListGroup>
    )}

    function showWochentag(slot) {
        return (
            <ListGroup>
                <ListGroupItem className="background-staffbite-primary text-white text-center lead">
                  {slot}  
                </ListGroupItem>
            </ListGroup>
        )
    }
    function showShichtTag(slot, index, day = !1) {
        return (
            <ListGroup>
        <ListGroupItem className="m-0 p-0 background-staffbite-primary text-white text-center" style={{"cursor": "pointer"}} onClick={() => props.handleShowModal("showSchichtDetailsBearbeiten", index, day)}>
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i aria-hidden="true" className="float-left m-2">{slot.anzahl}</i>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
            <p className="m-0 p-0">
            {slot.ShiftName}
            <br/>
            {slot.ShiftStart} - {typeof slot.ShiftEnd === "boolean" && slot.ShiftEnd ? <>Ende</> : <>{slot.ShiftEnd}</>}
            </p>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
        )
    }

    function showDefault(slot, index, day) {
        return (
            <ListGroup>
                <ListGroupItem style={{"cursor": "pointer"}} className="mb-0" color="" onClick={() => props.handleShowModal("showSchichtBearbeiten", index, day)}><p className="m-0"><br/><br/></p></ListGroupItem>
            </ListGroup>
        )
    }
}
return null;
}

export default SchichtplanView;