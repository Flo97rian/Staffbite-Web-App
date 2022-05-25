import React, { useEffect, useRef } from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, Card, Badge, Button, UncontrolledCollapse, Input, Label, InputGroupAddon, InputGroupText, InputGroup, InputGroupButtonDropdown, FormFeedback } from "reactstrap"
import * as _ from "lodash";
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { settingNewPosition } from "../reducers/userInput";
import { addingNewPosition, deletingPosition, resettingAccessPosition, settingAccessPosition } from "../reducers/Meta";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
const accesses = [{
    id: "accessAdminView",
    name: "Schichten einsehen",
    description: "Darf ein Mitarbeiter mit dieser Position einsehen, welche Mitarbeiter in einer Schicht arbeiten?"
},
{
    id: "accessTradeWithoutAdmin",
    name: "Eigenständig tauschen",
    description: "Darf dieser Mitarbeiter eigenständig eine Schicht von einem Kollegen übernehmen?"
},
{
    id: "accessSetInShiftWithoutAdmin",
    name: "Eigenständig eintragen nach Veröffentlichung",
    description: "Dürfen Mitarbeiter mit dieser Position sich eigenständig eine Schicht eintragen? Dies ist nur bei bereits veröffentlichten Schichtplänen möglich."
}]

const FormEmployeesRoles = () => {
    const dispatch = useDispatch();
    const Meta = useSelector(state => state.Meta);
    const CompanyPositions = useSelector(state => state.Meta.schichten)
    const CompanyAccess = useSelector(state => state.Meta.accessPosition);
    const userInputPosition = useSelector(state => state.userInput.newPosition);
    const [currentSelectedPosition, setCurrentSelectedPosition] = useState(CompanyPositions[0])
    const [accessValues, setAccessValues] = useState(_.get(CompanyAccess, [currentSelectedPosition], []));
    const [warning, setWarning] = useState(!1);
    const [toggleAddPosition, setToggleAddPosition] = useState(false);
    
    function updatePositionAccess () {
        dispatch(thunkUpdateProfile({...Meta}))
        dispatch(resettingModal());
    }

    function addNewPosition (position) {
        const isNewPosition = !_.includes(CompanyPositions, position, 0);
        if(!isNewPosition) return; 
        dispatch(thunkUpdateProfile({...Meta, schichten: [...CompanyPositions, position]}));
      }
      
      function deletePosition (position) {
        const hasPosition = _.includes(CompanyPositions, position, 0);
        if(!hasPosition) return; 
        dispatch(thunkUpdateProfile({...Meta, schichten: CompanyPositions.filter(pos => pos !== position)}));
      }
    useEffect(() => {
    }, [accessValues])
    
    useEffect(() => {
    }, [toggleAddPosition])

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
                            invalid={userInputPosition.length >= 30 || CompanyPositions.includes(userInputPosition)}
                            onChange={(event) => dispatch(settingNewPosition(event.target.value))}
                            placeholder="Positionnamen wählen"
                            />
                                <InputGroupAddon addonType="append">
                                    <Button color="success" hidden={userInputPosition === ""} disabled={userInputPosition.length >= 30 || CompanyPositions.includes(userInputPosition)} id="collapsTogglerAddPosition"  
                                    onClick={
                                        () => {
                                        dispatch(addNewPosition(userInputPosition))
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
                                            dispatch(settingNewPosition(""))
                                        }
                                    }>X</Button>
                                </InputGroupAddon>
                                <FormFeedback invalid={userInputPosition.length >= 30}>
                                    {userInputPosition.length >= 30 ? "Dieser Name ist zu lang!" : ""}
                                    {CompanyPositions.includes(userInputPosition) ? "Diese Position ist bereits vorhanden": ""}
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
                            {CompanyPositions.map(position => {
                                if(currentSelectedPosition === position) {
                                    return (
                                        <>
                                        <Row className="my-2">
                                            <Col xs="6">
                                                <Badge color="primary" className="" 
                                                style={{"cursor": "pointer"}}
                                                onClick={
                                                    () => {  
                                                            setCurrentSelectedPosition("")
                                                            setAccessValues(_.get(CompanyAccess, [position], []));
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
                                                        setCurrentSelectedPosition(position)
                                                        setAccessValues(_.get(CompanyAccess, [position], []));
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
                                                <input type="checkbox" checked={_.includes(_.get(CompanyAccess, [currentSelectedPosition], []), access.id, 0)}/>
                                                <span className="custom-toggle-slider rounded-circle" data-label-off="Nein" data-label-on="Ja" 
                                                onClick={() => {
                                                    _.includes(_.get(CompanyAccess, [currentSelectedPosition], []), access.id, 0)
                                                    ?
                                                    dispatch(resettingAccessPosition({position: currentSelectedPosition, accessValue: access.id}))
                                                    :
                                                    dispatch(settingAccessPosition({position: currentSelectedPosition, accessValue: access.id}))
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
                                    setAccessValues(_.get(CompanyAccess, [currentSelectedPosition], []));
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
                    <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                    {(_.isEmpty(_.difference(_.get(CompanyAccess, [currentSelectedPosition], []), accessValues))) && 
                    (_.isEmpty(_.difference(accessValues, _.get(CompanyAccess, [currentSelectedPosition], []))))
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