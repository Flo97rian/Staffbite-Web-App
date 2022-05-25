import React from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody
  } from "reactstrap";
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftplan } from "../reducers/Shiftplan";
import { settingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { settingDisplayShiftplan } from "../reducers/display";

const UserApplicationsImport = () => {
    const dispatch = useDispatch()
    const Plans = useSelector(state => state.DB.plans);
    const displayShiftplan = useSelector(state => state.display.displayShiftplan);
    const setCurrentShiftPlan = (id) => {
        dispatch(settingCurrentShiftplanIndex(id))
        dispatch(settingShiftplan(Plans[id]));
        dispatch(settingDisplayShiftplan());
    }

    function DisplayShiftplans() {
        if(!displayShiftplan) {
            return (
                <>
                    {Plans.map((item, index) => { 
                        if (item.id.split("#")[1] === "Freigeben") {
                            return (
                                <Card className="mb-1 mt-0" key={item.id} id={index}>
                                    <CardBody className="p-1">
                                        <Row className="text-center">
                                            <Col xs={3}>
                                                <p className="mt-3 ml-3 float-left">{item.name}</p>
                                            </Col>
                                            <Col xs={3}>
                                                <p className="mt-3 ml-3 float-left"><i className="fas fa-calendar mr-2"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}</p>
                                            </Col>
                                            <Col xs={3}>
                                                <p className="mt-3 ml-3 float-left" style={{"color": "#5e72e4"}}>Bereit zum eintragen</p>
                                            </Col>
                                            <Col xs={3}>
                                            <Button className="mt-2 ml-3 float-left" name={item.label} outline color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                                            </Col>
                                            </Row>
                                    </CardBody>
                                </Card>
                            )}
                    return null
                })}
                </>
            )
        }
    }
    if(!displayShiftplan) {
        return(
          <>
              <Card className="mb-1 mt-0 card_eintragen">
              <CardBody className="p-1">
              <Row className="text-center">
                  <Col xs={3}>
                      <p className="mt-3 ml-3 float-left font-weight-bold">Name</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 ml-3 float-left font-weight-bold">Zeitraum</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 ml-3 float-left font-weight-bold">Status</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 ml-3 float-left font-weight-bold">Auswählen</p>
                  </Col>
                  </Row>
              </CardBody>
          </Card>
          <DisplayShiftplans/>
        </>
        )
    }
    return null;
    }
export default UserApplicationsImport