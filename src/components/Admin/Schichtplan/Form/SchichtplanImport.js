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
        if (status === 1 && itemStatus === "Entwurf") {
          hasStatus = !0
        } else if (status === 2 && itemStatus === "Freigeben") {
          hasStatus = !0
        } else if (status === 3 && itemStatus === "Review") {
          hasStatus = !0
        } else if (status === 4 && itemStatus === "Veröffentlicht") {
          hasStatus = !0
        }
        return hasStatus
    }
    const setCurrentShiftPlan = (id) => {
        store.dispatch({type: "SetCurrentShiftPlan", payload: id})
        store.dispatch({type: "setShiftPlanIsActive"})
        store.dispatch({type: "setShiftPlanIsImported"})
    }

        return(
          <>
          {props.bearbeiten ? <></> :
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
                  <Col xs={2}>
                      <p className="mt-3 font-weight-bold">Status</p>
                  </Col>
                  <Col xs={2}>
                      <p className="mt-3 font-weight-bold">Auswählen</p>
                  </Col>
                  <Col xs={2}>
                      <p className="mt-3 font-weight-bold">Löschen</p>
                  </Col>
                  </Row>
              </CardBody>
          </Card>
          {props.plaene ? props.plaene.map((item, index) => ID(props.status, item) ? 
            (<Card className="mb-1 mt-0">
              <CardBody className="p-1">
                <Row className="text-center">
                    <Col xs={3}>
                        <p className="mt-3">{item.name}</p>
                    </Col>
                    <Col xs={3}>
                        <p className="mt-3"> <i class="fa fa-calendar mr-2" aria-hidden="true"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}</p>
                    </Col>
                    <Col xs={2}>
                        <p className="mt-3">{planIdColor(item.id)}</p>
                    </Col>
                    <Col xs={2}>
                      <Button className="mt-2" name={item.label} outline color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                    </Col>
                    <Col xs={2}>
                    <i className="fa fa-trash fa-2x text-danger mt-3" aria-hidden="true" onClick={() => props.onDelete(index)}></i>
                    </Col>
                    </Row>
              </CardBody>
            </Card>
          )
          :
          (<></>)
          ) 
          : 
          <></>
          }
          </>
        }
        </>
        )
    }
export default SchichtplanImport