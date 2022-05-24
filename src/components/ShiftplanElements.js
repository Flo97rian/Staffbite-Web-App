import React from "react";
// core components
import {
    ListGroup,
    ListGroupItem,
    Badge,
    ListGroupItemHeading,
    ListGroupItemText,
    Button,
    Progress
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
        <ListGroupItem className="mb-0" style={{"color": "#091428", "backgroundColor": "rgba(52, 98, 175, 0.5)"}}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const CompanyClosedEntwurf = (index, col, clickActive) => {
    return (
        <ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer", "color": "#091428", "backgroundColor": "rgba(52, 98, 175, 0.5"}} onClick={() => clickActive(index, col)}>
                <ListGroupItemHeading className="m-0 p-0" color="">
               </ListGroupItemHeading>
               <ListGroupItemText className="m-0 p-3">
               <br/>
               <br/>
       </ListGroupItemText>
       </ListGroupItem>
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

export const MultipleApplicants = (ApplicantsLength, FirstApplicant, index, col, clickPrio) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0"  style={{"cursor": "pointer"}} color="success" onClick={() => clickPrio(index, col)}><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicant = (FirstApplicant, index, col, clickPrio) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={() => clickPrio(index, col)}><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const TwoApplicants = (FirstApplicant, SecondApplicant, index, col, clickPrio) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={() => clickPrio(index, col)}><p className="m-0">{FirstApplicant}<br/>{SecondApplicant}<br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithPrio = (ApplicantsLength, FirstApplicant, index, col, clickActive) => {
    return (
                <ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => clickActive(index, col)}>
                    <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                   <p className="mb-0 mt-0 pt-4 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength - 1 } weitere
                   </p>
       </ListGroupItem>
   </ListGroup>
)}

export const TwoApplicantsWithPrio = (FirstApplicant, SecondApplicant, index, col, clickActive) => {
    return (
        <ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => clickActive(index, col)}>
                    <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                   <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    {SecondApplicant}
                   </p>
       </ListGroupItem>
   </ListGroup>
)}

export const SingleApplicantWithPrio = (FirstApplicant, index, col, clickActive) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0 p-0 pt-2" style={{"cursor": "pointer"}} color="success" onClick={() => clickActive(index, col)}>
        <i className="fas fa-bookmark text-success align-top float-right mr-2 mt-1" aria-hidden="true"/>
                   <p className="m-0 pt-4 pr-2 pl-2 pb-4 text-center">
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
                <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
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
         <ListGroupItem className="m-1 p-0" style={{"cursor": "pointer"}} color="success">
                <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                    {SecondApplicant}
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicantWithPrio = (FirstApplicant) => {
    return (<ListGroup>
                    <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success">
                    <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                    <p className="mb-2 mt-1 pt-4 pr-2 pl-2 pb-4 text-center">
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
export const Default = (index, col, clickPrio) => {
    return (<ListGroup>
        <ListGroupItem style={{"cursor": "pointer"}} className="mb-0" color="" onClick={() => clickPrio(index, col)}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const UserDefault = () => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="" ><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ShowDefault = () => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="" ><p className="m-0"><br/><br/></p></ListGroupItem>
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
export const MultipleApplicantsWithUserWithNotice = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right" aria-hidden="true"/><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithUser = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const SingleApplicantWithUserWithNotice = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right" aria-hidden="true"/><p className="m-0">{ApplicantName}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithOutUser = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}}  color="" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const MultipleApplicantsWithOutUserWithNotice = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}}  color="" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right" aria-hidden="true"/><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithOutUser = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const SingleApplicantWithOutUserWithNotice = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const ShowMultipleApplicantsWithUser = (ApplicantName, ApplicantsLength) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color="success"><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const ShowMultipleApplicantsWithUserWithNotice = (ApplicantName, ApplicantsLength) => {
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
        <ListGroupItem className="mb-0" color=""><p className="m-0">{FirstApplicant}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const ShowSingleApplicantWithOutUser = (FirstApplicant) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0" color=""><p className="m-0">{FirstApplicant}<br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const ZeroApplicants = (index, col, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="white" onClick={(e, j) => Click(index, col)}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}


export const ZeroApplicantsWithNotice = (index, col, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right" aria-hidden="true"/><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}
export const ZeroApplicantsWithPrio = (index, col, Click) => {
    return (<ListGroup>
        <ListGroupItem style={{"cursor": "pointer"}} className="m-0 p-0" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
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

export const shiftHasPrio = (index, col, prio, clickPrio, clickActive) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i className="fas fa-bookmark fa-lg text-success float-right m-2" aria-hidden="true" onClick={() => clickPrio(index, col, prio)}/>
                </ListGroupItemHeading>
        <ListGroupItemText className="m-0 p-3">
                <br/>
                <br/>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const shiftSetPrio = (index, col, prio, clickPrio, clickActive) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
         <ListGroupItemHeading className="m-0 p-0" color="">
                    <i className="fas fa-bookmark fa-lg text-light float-right m-2" aria-hidden="true" onClick={() => clickPrio(index, col, prio)}/>
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-3">
                <br/>
                <br/>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const shiftIsInactive = (index, col, clickActive) => {
    return (<ListGroup>
         <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="default">
         <ListGroupItemHeading className="m-0 p-0" color="">
                    <i className="fas fa-times text-white float-left m-2" aria-hidden="true" onClick={() => clickActive(index, col)}/>
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-3">
                <br/>
                <br/>
        </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const DefaultWithPrio = ( index, col, clickPrio) => {
    return (<ListGroup onClick={() => clickPrio(index, col)}>
         <ListGroupItem style={{"cursor": "pointer"}} className="m-0 p-0"><i className="fas fa-bookmark fa-lg text-success float-right m-2" aria-hidden="true"/><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
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

export const TradeShiftSingleSetApplicantWithPrio = (index, col, ApplicantName, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => Click(index, col)}>
                <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                   <p className="mb-0 mt-2 pt-4 pr-2 pl-2 pb-4 text-center">
                    {ApplicantName}
                    <></>
                   </p>
       </ListGroupItem>
    </ListGroup>
)}

export const TradeShiftMultiSetApplicant = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}><p className="m-0">{ApplicantName}<br/>+ {ApplicantsLength - 1} weitere</p></ListGroupItem>
    </ListGroup>
)}

export const TradeShiftMultiSetApplicantWithPrio = (index, col, ApplicantName, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={() => Click(index, col)}>
                    <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                   <p className="mb-0 mt-0 pt-4 pr-2 pl-2 pb-2 text-center">
                    {ApplicantName}
                    <br/>
                     + {ApplicantsLength - 1 } weitere
                   </p>
       </ListGroupItem>
    </ListGroup>
)}

export const SingleSetApplicantWithPrio = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
                <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
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
export const MultipleSetApplicantsWithPrio = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="mb-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                    <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
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
export const TwoSetApplicantsWithPrio = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="success" onClick={(e, j) => Click(index, col)}>
                <i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/>
                <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                    {SecondApplicant}
                   </p>
        </ListGroupItem>
    </ListGroup>
)}


//VERSIONS TESTING

export const ZeroApplicantsRed = (index, col, Click) => {
    return (<ListGroup>
       <ListGroupItem className="mb-0" style={{"cursor": "pointer"}} color="danger" onClick={(e, j) => Click(index, col)}><p className="m-0"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const ZeroApplicantsWithPrioRed = (index, col, Click) => {
    return (<ListGroup>
        <ListGroupItem style={{"cursor": "pointer"}} className="m-0 p-0" color="danger" onClick={(e, j) => Click(index, col)}><i className="fas fa-bookmark text-success float-right m-2" aria-hidden="true"/><p className="mb-0 p-3"><br/><br/></p></ListGroupItem>
    </ListGroup>
)}

export const TwoSetApplicantsWithoutPrioNotFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
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

export const TwoSetApplicantsWithoutPrioFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
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

export const SingleSetApplicantWithoutPrioNotFilled = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
                <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
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

export const SingleSetApplicantWithoutPrioFilled = (index, col, FirstApplicant, Click) => {
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

export const MultiSetApplicantsWithoutPrioNotFilled = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
                    <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength} weitere
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const MultiSetApplicantsWithoutPrioFilled = (index, col, FirstApplicant, ApplicantsLength, Click) => {
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

export const TwoSetApplicantsWithPrioNotFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
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

export const SingleSetApplicantWithPrioNotFilled = (index, col, FirstApplicant, Click) => {
    return (<ListGroup>
                <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
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

export const MultiSetApplicantsWithPrioNotFilled = (index, col, FirstApplicant, ApplicantsLength, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="warning" onClick={(e, j) => Click(index, col)}>
                    <p className="mb-0 mt-2 pt-3 pr-2 pl-2 pb-2 text-center">
                    {FirstApplicant}
                    <br/>
                     + {ApplicantsLength} weitere
                   </p>
        </ListGroupItem>
    </ListGroup>
)}

export const MultiSetApplicantsWithPrioFilled = (index, col, FirstApplicant, ApplicantsLength, Click) => {
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

export const SingleSetApplicantWithPrioFilled = (index, col, FirstApplicant, Click) => {
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

export const TwoSetApplicantsWithPrioFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
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

export const ProgessSetApplicantsWithPrioFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="success" />
            <i className="fas fa-bookmark text-success float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-0 pt-2">
            {FirstApplicant}
                <br/>
                {SecondApplicant}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const ProgessSetApplicantsWithPrioNotFilled = (index, col, FirstApplicant, SecondApplicant, Click, progress) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="50" color="yellow" />
            <i className="fas fa-bookmark text-success float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3 pt-2">
            {FirstApplicant}
                <br/>
                {SecondApplicant}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
export const ProgessSetApplicantsWithPrioEmpty = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="warning" />
            <i className="fas fa-bookmark text-success float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-4">
            {FirstApplicant}
                <br/>
                {SecondApplicant}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const ProgessSetApplicantsWithoutPrioFilled = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="success" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3">
            {FirstApplicant}
                <br/>
                {typeof SecondApplicant === "string" ? SecondApplicant : <br/>}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

export const ProgessSetApplicantsWithoutPrioNotFilled = (index, col, FirstApplicant, SecondApplicant, Click, progress) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="50" color="yellow" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3">
            {FirstApplicant}
                <br/>
                {SecondApplicant}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
export const ProgessSetApplicantsWithoutPrioEmpty = (index, col, FirstApplicant, SecondApplicant, Click) => {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={(e, j) => Click(index, col)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="warning" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 pt-2">
            <br/>
            <br/>
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

const renderCircle = (FirstApplicant = !1, SecondApplicant = !1, ApplicantsLength = !1) => {
    if(FirstApplicant !== !1 && SecondApplicant === !1 && ApplicantsLength === !1) {
        let splitFirstApplicant = FirstApplicant.split(" ")
        return (
            <a
            className="avatar rounded-circle bg-info"
            >
            {splitFirstApplicant[0][0]}{splitFirstApplicant[1][0]}
          </a>
        )
    } else if (FirstApplicant !== !1 && SecondApplicant !== !1 && typeof SecondApplicant !==  "number" && ApplicantsLength === !1) {
        let splitFirstApplicant = FirstApplicant.split(" ");
        let splitSecondApplicant = SecondApplicant.split(" ");
        return (
            <>
            <a
            className="avatar rounded-circle bg-info"
            >
            {splitFirstApplicant[0][0]}{splitFirstApplicant[1][0]}
            </a>
            <a
            className="avatar rounded-circle ml--2 bg-info"
            >
            {splitSecondApplicant[0][0]}{splitSecondApplicant[1][0]}
            </a>
            
          </>
        )
    }
    else if(FirstApplicant !== !1 && SecondApplicant !== !1 && typeof SecondApplicant !==  "number" && ApplicantsLength !== !1) {
        let splitFirstApplicant = FirstApplicant.split(" ")
        let splitSecondApplicant = SecondApplicant.split(" ")
        return (
            <>
            <a
            className="avatar rounded-circle"
            >
            {splitFirstApplicant[0][0]}{splitFirstApplicant[1][0]}
            </a>
            <a
            className="avatar rounded-circle ml--2"
            >
            {splitSecondApplicant[0][0]}{splitSecondApplicant[1][0]}
            </a>
            
          </>
        )
    } else {
        return null;
    }
}