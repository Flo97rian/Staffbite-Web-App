import React, { useEffect, useRef } from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, Card, Badge, Button, UncontrolledCollapse, Input, Label, InputGroupAddon, InputGroupText, InputGroup, InputGroupButtonDropdown, FormFeedback } from "reactstrap"
import * as _ from "lodash";
import store from "../store";


const FormEmployeesRoles = ({positions, accesses, accessPosition, addNewPosition, deletePosition, updatePositionAccess}) => {
    const [currentSelectedPosition, setCurrentSelectedPosition] = useState(positions[0])
    const [accessValues, setAccessValues] = useState(_.get(accessPosition, [currentSelectedPosition], []));
    const [warning, setWarning] = useState(!1);
    const [toggleAddPosition, setToggleAddPosition] = useState(false);
    const [positionInput, setPositionInput] = useState("");
    
    useEffect(() => {
    }, [accessValues])
    
    useEffect(() => {
        console.log(positionInput)
    }, [positionInput])
    useEffect(() => {
        console.log(toggleAddPosition)
    }, [toggleAddPosition])

    FormEmployeesRoles.propTypes= {
        positions: PropTypes.arrayOf(PropTypes.string.isRequired),
        accesses: PropTypes.arrayOf( PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })),
        accessPosition: PropTypes.object.isRequired,
        addNewPosition: PropTypes.func.isRequired,
        deletePosition: PropTypes.func.isRequired,
        updatePositionAccess: PropTypes.func.isRequired
    }
    
    FormEmployeesRoles.defaultProps = {
        positions: [],
        accesses: [],
        accessPosition: {}
    }
    return (
        <>
        <Row>
            <Col>
                <h3 className="text-center mb-3">Positionen & Rollen festlegen</h3>
            </Col>
        </Row>
        <Row className="text-center mb-5">
                    <Col>
                        <UncontrolledCollapse className="my-2" toggler={"#collapsTogglerAddPosition"}>
                            <Row>
                                <Col xs="2"></Col>
                                <Col xs="8">
                            <InputGroup>
                            <Input
                            invalid={positionInput.length >= 30 || _.includes(positions, positionInput)}
                            onChange={(event) => setPositionInput(event.target.value)}
                            placeholder="Positionnamen wählen"
                            />
                                <InputGroupAddon addonType="append">
                                    <Button color="success" hidden={positionInput === ""} disabled={positionInput.length >= 30 || _.includes(positions, positionInput)} id="collapsTogglerAddPosition"  
                                    onClick={
                                        () => {
                                        addNewPosition(positionInput)
                                        setToggleAddPosition(false)
                                        }
                                    }
                                    >Erstellen</Button>
                                </InputGroupAddon>
                                <InputGroupAddon addonType="append">
                                    <Button color="danger" id="collapsTogglerAddPosition" 
                                    onClick={
                                        () => {
                                            setToggleAddPosition(false)
                                            setPositionInput("")
                                        }
                                    }>X</Button>
                                </InputGroupAddon>
                                <FormFeedback invalid={positionInput.length >= 30}>
                                    {positionInput.length >= 30 ? "Dieser Name ist zu lang!" : ""}
                                    {_.includes(positions, positionInput) ? "Diese Position ist bereits vorhanden": ""}
                                </FormFeedback>
                            </InputGroup>
                            </Col>
                            <Col xs="2"></Col>
                            </Row>
                        </UncontrolledCollapse>
                            <Button color="primary" hidden={toggleAddPosition} id="collapsTogglerAddPosition" size="sm" onClick={() => setToggleAddPosition(true)}>Neue Position erstellen</Button>
                    </Col>
                </Row>
        <Row>
            <Col xs="5">
                <h4>Deine Positionen:</h4>
            </Col>
            <Col xs="2">
            </Col>
            <Col xs="5" className="">
                <Row className="">
                <h4>
                    Berechtigungen für Position:

                </h4>
                <h4 className="text-primary ml-2">
                    {currentSelectedPosition}
                </h4>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col xs="5">
                <Card className="card-secondary border mb-1">
                    <Row>
                        <Col  className="mx-2">
                            {positions.map(position => {
                                if(currentSelectedPosition === position) {
                                    return (
                                        <>
                                        <Row className="my-2">
                                            <Col xs="6">
                                                <Badge color="primary" className="" 
                                                style={{"cursor": "pointer"}}
                                                onClick={
                                                    () => {
                                                        if(!_.isEmpty(_.difference(_.get(accessPosition, [currentSelectedPosition], []), accessValues))) {
                                                            setWarning(true)    
                                                        } else {
                                                            setCurrentSelectedPosition("")
                                                            setAccessValues([]);    
                                                        }
                                                    }} >{position}</Badge>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <i className="fas fa-trash text-danger" style={{"cursor": "pointer"}} id="collapsTogglerDeletePosition"></i>
                                            </Col>
                                        </Row>
                                        <UncontrolledCollapse toggler={"#collapsTogglerDeletePosition"}>
                                            <Row>
                                                <Col xs="8">
                                                    <small>{currentSelectedPosition} wirklich löschen? </small>
                                                </Col>
                                                <Col className="text-right">
                                                    <Button size="sm" color="" className="m-0" onClick={() => deletePosition(currentSelectedPosition)}>
                                                        <i className="fas fa-check text-success"  id="collapsTogglerDeletePosition"></i>
                                                    </Button>
                                                    <Button size="sm" color="" className="m-0">
                                                        <i className="fas fa-ban text-danger"  id="collapsTogglerDeletePosition"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </UncontrolledCollapse>
                                    </>
                                    )
                                }
                                return (
                                    <Row className="my-2">
                                        <Col>
                                            <Badge color="light" className="" 
                                            style={{"cursor": "pointer"}}
                                            onClick={
                                                () => {
                                                    if(!_.isEmpty(_.difference(_.get(accessPosition, [currentSelectedPosition], []), accessValues))) {
                                                        setWarning(true)    
                                                    } else {
                                                        setCurrentSelectedPosition(position)
                                                        setAccessValues(_.get(accessPosition, [position], []));
                                                    }
                                                }} >{position}</Badge>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xs="2" className="justify-content-center">
                <i className="fas fa-arrow-right-long color-dark"></i>
            </Col>
            <Col xs="5">
                    <Row>
                        <Col  className="">
                            {accesses.map(access => {
                                return (
                                    <>
                                    
                                    <Row className="mt-3">
                                        <Col xs="9" className="px-0"> 
                                            <p className="mb-0 text-primary" style={{"cursor": "pointer"}} id={"collapsTogglerOff" + String(access.id)}>
                                                {access.name}
                                                <i className="fas fa-angle-down fas-sm ml-2 text-primary text-right"/>
                                            </p>
                                        </Col>
                                        <Col xs="3" className="">
                                            <label className="custom-toggle">
                                                <input type="checkbox" checked={_.includes(accessValues, access.id, 0)}/>
                                                <span className="custom-toggle-slider rounded-circle" data-label-off="Nein" data-label-on="Ja" 
                                                onClick={() => {
                                                    _.includes(accessValues, access.id, 0)
                                                    ?
                                                    setAccessValues((accessValues.filter(acc => acc !== access.id)))
                                                    :
                                                    setAccessValues([...accessValues, access.id])
                                                }}/>
                                            </label>
                                        </Col>
                                    </Row>
                                    <UncontrolledCollapse toggler={"#collapsTogglerOff" + String(access.id)}>
                                        <Row>
                                            <Col className="mx-2">
                                                <small>
                                                    {access.description}
                                                </small>
                                            </Col>
                                        </Row>
                                    </UncontrolledCollapse>
                                </>
                                )
                            })}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            {warning 
                            ? 
                            <small> Deine Änderungen sind nicht gespeichert diese Position verloren.{' '}
                                <Button color="warning" size="sm" 
                                onClick={() => {
                                    setWarning(false);
                                    setAccessValues(_.get(accessPosition, [currentSelectedPosition], []));
                                }}>
                                Änderungen verwerfen</Button> 
                            </small>
                            :
                            <></>
                            }
                        </Col>
                    </Row>
            </Col>
        </Row>
        <Row className="mt-6">
            <Col xs="6">

            </Col>
            <Col xs="6">
                    <Button color="link" onClick={() => store.dispatch({type: "CLOSE"})}>Schließen</Button>
                    {(_.isEmpty(_.difference(_.get(accessPosition, [currentSelectedPosition], []), accessValues))) && 
                    (_.isEmpty(_.difference(accessValues, _.get(accessPosition, [currentSelectedPosition], []))))
                    ?
                    <Button color="light" onClick={() => updatePositionAccess(currentSelectedPosition, accessValues)}>Änderungen speichern</Button>
                    :
                    <Button color="success" onClick={() => updatePositionAccess(currentSelectedPosition, accessValues)}>Änderungen speichern</Button>
                    }
            </Col>
        </Row>
        </>
    )
}

export default FormEmployeesRoles