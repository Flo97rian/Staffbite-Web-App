import React from "react";
// core components
import {
    ListGroup,
    ListGroupItem,
    Badge,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap"

export const DateOrWeekDayRow = (obj) => {
    return (
    <ListGroup>
        <ListGroupItem className="mb-0" color="primary"><p className="m-0">{obj}</p></ListGroupItem>
    </ListGroup>
    )}

export const CompanyClosed = () => {
    return (
    <ListGroup>
        <ListGroupItem className="mb-0" color="light"><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ShiftDescription = (obj, anzahl) => {
    return (<ListGroup>
                <ListGroupItem className="m-0 p-0" color="primary">
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i aria-hidden="true" className="float-left m-2">{anzahl}</i>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
            <small className="mb-2">{obj.ShiftName}</small>
            <br/>
            {obj.ShiftStart} - {typeof obj.ShiftEnd === "boolean" && obj.ShiftEnd ? <>open End</> : <>{obj.ShiftEnd}</>}
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicants = (ApplicantsLength, FirstApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0"  style={{"cursor": "pointer"}} color="success"><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicant = (FirstApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success"><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const TwoApplicants = (FirstApplicant, SecondApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success"><p className="m-0">{FirstApplicant}<br/>{SecondApplicant}<br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithPrio = (ApplicantsLength, FirstApplicant, prio) => {
    return (
                <ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success">
                    <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                   <p className="mb-0 mt-0 pt-4 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength - 1 } weitere
                   </p>
       </ListGroupItem>
   </ListGroup>
)}

export const TwoApplicantsWithPrio = (FirstApplicant, SecondApplicant, prio) => {
    return (
        <ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success">
                    <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                   <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    {SecondApplicant}
                   </p>
       </ListGroupItem>
   </ListGroup>
)}

export const SingleApplicantWithPrio = (FirstApplicant, prio) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success">
                    <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                   <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-4 text-center">
                    {FirstApplicant}
                    <></>
                   </p>
       </ListGroupItem>
   </ListGroup>
)}

export const ShowMultipleApplicants = (FirstApplicant, ApplicantsLength) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0"  color="success"><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const ShowTwoApplicants = (FirstApplicant, SecondApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0"  color="success"><p className="m-0">{FirstApplicant}<br/>{SecondApplicant}</p></ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicant = (FirstApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success"><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ShowMultipleApplicantsWithPrio = (FirstApplicant, ApplicantsLength, prio) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success">
                <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                    +  {ApplicantsLength} weitere
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const ShowTwoApplicantsWithPrio = (FirstApplicant, SecondApplicant, prio) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success">
                <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                    {SecondApplicant}
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicantWithPrio = (FirstApplicant, prio) => {
    return (<ListGroup>
                         <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success">
                        <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                    <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-4 text-center">
                    {FirstApplicant}
                   </p>
                </ListGroupItem>
    </ListGroup>
)}

export const MultiSetApplicant = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const SingleSetApplicant = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const Default = () => {
    return (<ListGroup>
        <ListGroupItem tag="a" href="#" className="mb-0" color=""><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ApplicantDoesntMatchesPosition = () => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="light"><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ApplicantDoesntMatchesPrio= () => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="light"><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithUser = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithUser = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithOutUser = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}}  color="" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithOutUser = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const ShowMultipleApplicantsWithUser = (ApplicantName, ApplicantsLength) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success"><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const ShowTwoApplicantsWithUser = (ApplicantName, SecondApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success"><p className="m-0">{ApplicantName}<br/>{SecondApplicant}</p></ListGroupItem>
    </ListGroup>
)}

export const ShowTwoApplicantsWithOutUser = (FirstApplicant, SecondApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success"><p className="m-0">{FirstApplicant}<br/>{SecondApplicant}</p></ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicantWithUser = (ApplicantName) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success" ><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ShowMultipleApplicantsWithOutUser = (FirstApplicant, ApplicantsLength) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="warning"><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicantWithOutUser = (FirstApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="warning"><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const ZeroApplicants = (index, col, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ZeroApplicantsWithPrio = (index, col, Click, prio) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" onClick={(e, j) => Click(index, col)}><small className="float-right" ><Badge color="success">{prio}</Badge></small><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const editShiftDetails = (obj, index, anzahl, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="primary" onClick={() => Click(index)}>
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i aria-hidden="true" className="float-left m-2">{anzahl}</i>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
            <small className="mb-2">{obj.ShiftName}</small>
            <br/>
            {obj.ShiftStart} - {typeof obj.ShiftEnd === "boolean" && obj.ShiftEnd ? <>open End</> : <>{obj.ShiftEnd}</>}
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const setShiftDetails = (index, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="warning" onClick={() => Click(index)}><p className="m-0">Schichtdetails<br/>eintragen<br/></p></ListGroupItem>
    </ListGroup>
)}

export const setShiftDetailsErr = () => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="warning"><p className="m-0">Schichtdetails<br/>eintragen<br/></p></ListGroupItem>
    </ListGroup>
)}

export const shiftHasPrio = (index, col, Click, prio) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i className="fa fa-heart fa-lg text-success float-right m-2" aria-hidden="true" onClick={() => Click(index, col, prio)}/>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
                <br/>
                <br/>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const shiftSetPrio = (index, col, Click, prio) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
         <ListGroupItemHeading className="m-0 p-0" color="">
                    <i className="fa fa-heart fa-lg text-light float-right m-2" aria-hidden="true" onClick={() => Click(index, col, prio)}/>
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-3">
                <br/>
                <br/>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const DefaultWithPrio = (prio) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0"><small className="float-right" ><Badge color="success">{prio}</Badge></small><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithUserWithPrio = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => Click(index, col, !0)}><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithUserWithPrio = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => Click(index, col, !0)}><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithOutUserWithPrio = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => Click(index, col, !0)}><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithOutUserWithPrio = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => Click(index, col, !0)}><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ZeroApplicantsWithOutUserWithPrio = (index, col, Click) => {
    return (<ListGroup>
          <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}}  color="" onClick={() => Click(index, col, !0)}><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const CreateShiftPlanHasApplicants = () => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" color=""><small className="float-right" ><Badge color="success">Bewerber</Badge></small><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const CreateShiftPlanHasApplicantsWithPrio = (index, col, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="light" onClick={() => Click(index, col, !0)}><small className="float-right"><Badge color="success">Bewerber</Badge></small><small className="float-right" ><Badge color="warning">Expert</Badge></small><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
  </ListGroup>
)}

export const Available = (lable, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="primary" onClick={(e, j) => Click(lable)}><p className="m-0">{lable}<br/><br/></p></ListGroupItem>
  </ListGroup>
)}

export const MultipleSetApplicantsWithUser = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleSetApplicantWithUser = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleSetApplicantsWithOutUser = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="light" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleSetApplicantWithOutUser = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="light" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ZeroSetApplicants = (index, col, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const TradeShiftSingleSetApplicant = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const TradeShiftMultiSetApplicant = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleSetApplicantWithPrio = (index, col, FirstApplicant, Click, prio) => {
    return (<ListGroup>
                <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                        <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                    <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-4 text-center">
                    {FirstApplicant}
                   </p>
                </ListGroupItem>
            </ListGroup>
)}

export const SingleSetApplicantWithoutPrio = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
                <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                    <ListGroupItemHeading className="m-0 p-0" color="">
                    </ListGroupItemHeading>
                    <ListGroupItemText className="m-0 p-3">
                        {FirstApplicant}
                        <br/>
                        <br/>
                    </ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
)}
export const MultipleSetApplicantsWithPrio = (index, col, FirstApplicant, ApplicantsLength, Click, prio) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                    <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength} weitere
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const MultiSetApplicantsWithoutPrio = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                    <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength} weitere
                   </p>
        </ListGroupItem>
    </ListGroup>
)}
export const TwoSetApplicantsWithoutPrio = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3">
                {FirstApplicant}
                <br/>
                {SecondApplicant}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
export const TwoSetApplicantsWithPrio = (index, col, FirstApplicant, SecondApplicant, Click, prio) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                <small className="float-right" ><Badge color="success">{prio}</Badge></small>
                <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                    {SecondApplicant}
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

