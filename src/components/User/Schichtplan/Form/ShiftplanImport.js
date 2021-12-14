import React from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody
  } from "reactstrap";
import store from "../../../../store";

const ShiftplanImport = (props) => {
    const setCurrentShiftPlan = (id) => {
        store.dispatch({type: "setCurrentShiftPlan", payload: id})
        store.dispatch({type: "setShiftplan", payload: props.plaene[id]});
        store.dispatch({type: "setShiftPlanIsActive"})
        store.dispatch({type: "setShiftPlanIsImported"})
    }

        return(
          <>
              <Card className="mb-1 mt-0 card_shiftplan">
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
          {props.plaene.map((item, index) => { 
            if (item.id.split("#")[1] === "Veröffentlicht") {
            return (<Card className="mb-1 mt-0" key={item.id} id={index}>
              <CardBody className="p-1">
                <Row className="text-center">
                    <Col xs={3}>
                        <p className="mt-3 ml-3 float-left">{item.name}</p>
                    </Col>
                    <Col xs={3}>
                        <p className="mt-3 ml-3 float-left"><i className="fas fa-calendar mr-2"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}</p>
                    </Col>
                    <Col xs={3}>
                      <p className="mt-3 ml-3 float-left" style={{"color": "#2dce89"}}>Schichtplan veröffentlicht</p>
                    </Col>
                    <Col xs={3}>
                      <Button className="mt-2 ml-3 float-left" name={item.label} outline color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                    </Col>
                    </Row>
              </CardBody>
            </Card>)}
          return null
          })}
        </>
        )
    }
export default ShiftplanImport