import React, {useEffect, useState, useRef} from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  Progress,
  Button,
  Badge,
  Tooltip,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import DemoInterface from "../DemoClass";

const BefuellungsView = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState({});
    const [tooltip, setTooltip] = useState(null);
    useEffect(() => {
            let demo = new DemoInterface();
            let applicants = demo.getEmployees();
            if(props.employees !== null) {
                applicants = props.employees;
            }
            let tooltipApplicants = {}
            applicants.forEach(applicant => {
                let shortName = applicant.name.split(' ')[0][0] + applicant.name.split(' ')[1][0];
                let currentApplicant = {
                    shortName: shortName,
                    longName: applicant.name,
                    SK: applicant.SK,
                    schichtenwoche: applicant.schichtenwoche,
                    schichten: applicant.schichten
                }
                tooltipApplicants[applicant.SK] = currentApplicant
            })
            setTooltip({...tooltipApplicants});
    }, [])

    useEffect(() => {}, [tooltip])

    useEffect(() => {
        let demo = new DemoInterface();
        let applicants = demo.getEmployees();
        if(props.employees !== null) {
            applicants = props.employees;
        }
        let tooltipApplicants = {}
        applicants.forEach(applicant => {
            let shortName = applicant.name.split(' ')[0][0] + applicant.name.split(' ')[1][0];
            let currentApplicant = {
                shortName: shortName,
                longName: applicant.name,
                SK: applicant.SK,
                schichtenwoche: applicant.schichtenwoche,
                schichten: applicant.schichten
            }
            tooltipApplicants[applicant.SK] = currentApplicant
        })
        setTooltip({...tooltipApplicants});
    }, [props.showFilled])

    if(props.schichtplan !== null && tooltip !== null) {
    const schichtplanLength = props.schichtplan.length - 1
    return (
        <table
        className="position-relative"
        width={1000}>
            <tbody>
                {props.schichtplan.map((row, index) => {
                    if (index === schichtplanLength) return null
                    else if (index === 0) {
                    return (
                        <tr className="card_wochentage">
                            <td
                            width={150}
                            draggable
                            >
                                {showWochentag(props.schichtplan[index].Wochentag, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Montag, index)}
                            </td>
                            <td
                            width={150}
                            height={90}>
                                {showWochentag(props.schichtplan[index].Dienstag, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Mittwoch, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Donnerstag, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Freitag, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Samstag, index)}
                            </td>
                            <td
                            width={150}>
                                {showWochentag(props.schichtplan[index].Sonntag, index)}
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
                        {showShichtTag(props.schichtplan[index].Wochentag, index, "Wochentag", props.schichtplan[index].Montag.anzahl)}
                        </td>
                        <td>
                           {showElement(props.schichtplan[index].Montag, index, "Montag")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Dienstag, index, "Dienstag")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Mittwoch, index, "Mittwoch")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Donnerstag, index, "Donnerstag")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Freitag, index, "Freitag")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Samstag, index, "Samstag")}
                        </td>
                        <td>
                            {showElement(props.schichtplan[index].Sonntag, index, "Sonntag")}
                        </td>
                    </tr>
                   ) 
                })}
                
            </tbody>

        </table>
    );
}

    function showElement(shift, index, day) {
        let hasApplicants = Object.keys(shift.applicants).length > 0;
        let hasSetApplicants = Object.keys(shift.setApplicants).length > 0;
        let applicantsLength = hasApplicants ? Object.keys(shift.applicants).length : 0;
        let setApplicantsLength = hasSetApplicants ? Object.keys(shift.setApplicants).length : 0;
        let hasPrio = shift.prio !== false || shift.notice !== "";
        let FirstApplicant = hasApplicants ? shift.applicants[Object.keys(shift.applicants)[0]] : false;
        if(props.showBewerber && tooltip !== null) {
            if(shift.frei === false) {
                return showClosed(shift, index, day)
            } else if (hasApplicants && hasPrio) {
                return showProgessApplicantsWithPrioEmpty(shift)
            } else if (hasApplicants) {
                return showProgessApplicantsWithoutPrioEmpty(shift, index, day)
            }
        } else if (props.showFilled) {
            if(shift.frei === false) {
                return showClosed(shift, index, day)
            } else if (setApplicantsLength && setApplicantsLength >= shift.anzahl && hasPrio) {
                return showProgessSetApplicantsWithPrioFilled(shift, index, day)
            } else if (setApplicantsLength && setApplicantsLength > 0 && hasPrio) {
                return showProgessSetApplicantsWithPrioNotFilled(shift, index, day)
            } else if (!setApplicantsLength && hasPrio) {
                return showProgessSetApplicantsWithPrioEmpty(shift, index, day)
            } else if (setApplicantsLength && setApplicantsLength >= shift.anzahl) {
                return showProgessSetApplicantsWithoutPrioFilled(shift, index, day)
            } else if (setApplicantsLength && setApplicantsLength > 0) {
                return showProgessSetApplicantsWithoutPrioNotFilled(shift, index, day)
            } else if (!setApplicantsLength) {
                return showProgessSetApplicantsWithoutPrioEmpty(shift, index, day)
            } else {
                return showDefault(shift, index, day)
            }
        } else {
            if(shift.frei === false) {
                return showClosed(shift, index, day)
            } else if (hasPrio) {
                return showProgessDefaultWithPrio()
            } else {
                return showProgessDefault()
            }
        }

    }

    function showClosed(shift, index, day) {
        return (
            <ListGroup>
                <ListGroupItem className="mb-0" style={{"color": "#091428", "backgroundColor": "rgba(52, 98, 175, 0.5)", "cursor": "pointer"}} onClick={() => props.handleShowModal("showSchichtBearbeiten", index, day)}><p className="m-0"><br/><br/></p></ListGroupItem>
            </ListGroup>
        )
    }

    function showDefaultWithPrio ( shift, index, day) {
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
    function showShichtTag(slot, index, day = !1, anzahl) {
        return (
            <ListGroup>
        <ListGroupItem className="m-0 p-0 background-staffbite-primary text-white text-center" style={{"cursor": "pointer"}} onClick={() => props.handleShowModal("showSchichtDetailsBearbeiten", index, day)}>
                <ListGroupItemHeading className="m-0 p-0" color="">
                    <i aria-hidden="true" className="float-right m-2 text-white font-weight-bold">{anzahl}</i>
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

    function showProgessDefault (index, col) {
        return (<ListGroup>
            <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
                <ListGroupItemHeading className="m-0 p-0" color="">
                <Progress max="100" value="0" color="" />
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-0 pt-2">
                    <br/>
                    <br/>
                </ListGroupItemText>
            </ListGroupItem>
        </ListGroup>
    )}

    function showProgessDefaultWithPrio (shift, index, day) {
        return (<ListGroup>
            <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="">
                <ListGroupItemHeading className="m-0 p-0" color="">
                <Progress max="100" value="0" color="mb-0" />
                <i className="fas fa-bookmark fa-lg text-success float-right mt--2 m-2" aria-hidden="true"/>
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-0 pt-2">
                    <br/>
                    <br/>
                </ListGroupItemText>
            </ListGroupItem>
        </ListGroup>
    )}

    function showProgessSetApplicantsWithPrioFilled (shift, index, day) {
        return (<ListGroup>
            <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)} >
                <ListGroupItemHeading className="m-0 p-0" color="">
                <Progress max="100" value="100" color="success" />
                    <i className="fas fa-bookmark fa-lg text-success float-right m-2 mt--2" aria-hidden="true"/>
                </ListGroupItemHeading>
                <ListGroupItemText className="m-0 p-0">
                {renderApplicantsCircle(shift.setApplicants, index, day, "setApplicants")}
                </ListGroupItemText>
            </ListGroupItem>
        </ListGroup>
    )}

function showProgessSetApplicantsWithPrioNotFilled ( shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="50" color="yellow" />
            <i className="fas fa-bookmark text-success fa-lg float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 pt-0">
                {renderApplicantsCircle(shift.setApplicants, index, day, "setApplicants")}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
function showProgessSetApplicantsWithPrioEmpty ( shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0 mt--1" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)}>
            <ListGroupItemHeading className="m-0 p-0">
            <Progress max="100" value="100" color="danger" className=""/>
            <i className="fas fa-bookmark fa-lg text-success float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3">
                <br/>
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
function showProgessApplicantsWithPrioEmpty ( shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" color="">
            <ListGroupItemHeading className="m-0 p-0">
            <Progress max="100" value="100" color="primary" className=""/>
            <i className="fas fa-bookmark fa-lg text-success float-right m-2 mt--2" aria-hidden="true"/>
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-0">
                {renderApplicantsCircle(shift.applicants, index, day, "applicants")}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

    function showProgessSetApplicantsWithoutPrioFilled (shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="success" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 pt-0">
                {renderApplicantsCircle(shift.setApplicants, index, day, "setApplicants")}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

    function showProgessSetApplicantsWithoutPrioNotFilled ( shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="50" color="yellow" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 pt-0">
                {renderApplicantsCircle(shift.setApplicants, index, day, "setApplicants")}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}
    function showProgessSetApplicantsWithoutPrioEmpty (shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" style={{"cursor": "pointer"}} color="" onClick={() => props.handleShowModal("showMitarbeiterBearbeiten", index, day)}>
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="danger" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 p-3">
                <br/>
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

function showProgessApplicantsWithoutPrioEmpty (shift, index, day) {
    return (<ListGroup>
        <ListGroupItem className="m-0 p-0" color="">
            <ListGroupItemHeading className="m-0 p-0" color="">
            <Progress max="100" value="100" color="" />
            </ListGroupItemHeading>
            <ListGroupItemText className="m-0 pt-0">
            {renderApplicantsCircle(shift.applicants, index, day, "applicants")}
            </ListGroupItemText>
        </ListGroupItem>
    </ListGroup>
)}

function renderApplicantsCircle(applicants, RowIndex, day, type) {
    if (Object.keys(applicants).length > 0) {
        let names = Object.keys(applicants);
        if(Object.keys(tooltip).length > 0) {
        return (
            <>
            { names.map((name, index) => {
                if (index === 0) {
                return (
                    <ToolTipItem key={String(RowIndex) + String(day) + String(index)} item={tooltip[name]} type={type} id={String(RowIndex) + String(day) + String(index)} {...props}></ToolTipItem>
                )};
                if(index > 2) {
                    return null;
                }
                if(index > 1) {
                    return (
                        <a className="my-3 p-0 ml-2">
                        + {names.length - 2}
                        </a>
                    )
                }
                return (
                    <ToolTipItem key={String(RowIndex) + String(day) + String(index)} item={tooltip[name]}  type={type} id={String(RowIndex) + String(day) + String(index)} margin={"ml--3"} {...props}></ToolTipItem>
                )
                }
            )}
            <br/>
            </>
        )
    }
    return null;
    }
    return (
        <>
        <br/>
        <br/>
        </>
    );

}

function ToolTipItem (details) {
    return (
        <>
        <a
            id={'Tooltip-' + details.id}
            className={"avatar avatar-sm background-staffbite-success rounded-circle ml-2 my-2  mb-3 p-0 border " + details.margin + (details.type === "applicants" ? " bg-primary" :" background-staffbite-success")}
        >
        <p className="pt-3">{details.item.shortName}</p>
        </a>
        <UncontrolledTooltip innerClassName="tooltip-inner" placement="top" target={'Tooltip-' + details.id} className="">
            <Row className="my-2 mx-2">
                <Col>
                    <Row className="text-center">
                        <Col>
                            <h4 className="display-4">{details.item.longName}</h4>
                        </Col>
                    </Row>
                    <Row className="text-dark">
                        <Col>
                            <p className="lead-text-bold">
                                {props.showFilled ? "Schichten diese Woche:" : "Schichten pro Woche:" }
                                
                            </p>
                        </Col>
                        <Col>
                            <p className="lead-text">
                                {props.showFilled ? String(details.item.schichten.length + "/" + details.item.schichtenwoche) : details.item.schichtenwoche}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-dark">
                        <Col>
                            <p className="lead-text-bold">
                                Status:
                            </p>
                        </Col>
                        <Col>
                            <p className="lead-text">
                                {props.showFilled ? "Eingetragen" : "Beworben" }
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
      </UncontrolledTooltip>
        </>
    )
}
return null;
}

export default BefuellungsView;