import React from "react";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody
  } from "reactstrap";
import { planIdColor } from "../../../Application/functions/PlanIdColor";
import store from "../../../../store";

const SchichtplanImport = (props) => {
    const ID = (status, item) => {
      let hasStatus = !1
      let itemStatus =  item.id.split("#")[1]
        if (status === 1 && itemStatus === "Freigeben") {
          hasStatus = !0
        } else if (status === 2 && itemStatus === "Veröffentlicht") {
          hasStatus = !0
        }
        return hasStatus
    }
    const setCurrentShiftPlan = (id) => {
        store.dispatch({type: "setCurrentShiftPlan", payload: id})
        store.dispatch({type: "setShiftPlanIsActive"})
        store.dispatch({type: "setShiftPlanIsImported"})
    }

        return(
          <>
              <Card className="mb-1 mt-0">
              <CardBody className="p-1">
              <Row className="text-center">
                  <Col xs={3}>
                      <p className="mt-3 font-weight-bold">Name</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 font-weight-bold">Zeitraum</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 font-weight-bold">Status</p>
                  </Col>
                  <Col xs={3}>
                      <p className="mt-3 font-weight-bold">Auswählen</p>
                  </Col>
                  </Row>
              </CardBody>
          </Card>
          {props.plaene.map((item, index) => { 
            if (ID(props.status, item)) {
            return (<Card className="mb-1 mt-0" key={item.id} id={index}>
              <CardBody className="p-1">
                <Row className="text-center">
                    <Col xs={3}>
                        <p className="mt-3">{item.name}</p>
                    </Col>
                    <Col xs={3}>
                        <p className="mt-3"><i className="fas fa-calendar mr-2"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}</p>
                    </Col>
                    <Col xs={3}>
                        {planIdColor(item.id)}
                    </Col>
                    <Col xs={3}>
                      <Button className="mt-2" name={item.label} outline color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                    </Col>
                    </Row>
              </CardBody>
            </Card>)}
          return null
          })}
        </>
        )
    }
export default SchichtplanImport