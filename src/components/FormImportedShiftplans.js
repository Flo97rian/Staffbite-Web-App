import {
    Row,
    Col,
    Button,
    Card,
    CardBody,
  } from "reactstrap";
import { planIdColor } from "./PlanIdColor";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftplan } from "../reducers/Shiftplan";
import { settingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { settingDisplayShiftplan } from "../reducers/display";
import { createInitialDummyshifts } from "../reducers/DB";
import { settingDeleteShiftplanID } from "../reducers/temporary";

const FormImportedShiftplans = (props) => {
  const displayTable = useSelector(state => state.display.displayShiftplan === false && state.display.displayNewShiftplan === false);
  const Plans = useSelector(state => state.DB.plans);
  const Onboarding = useSelector(state => state.Meta.onboarding);
  const dispatch = useDispatch();


  const deleteShiftplan = (index) => {
    dispatch(settingDeleteShiftplanID(Plans[index].id))
  }
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

    function getHeaders(status) {
      let isVorlage = !1
      if(status === 1) {
        isVorlage = !0;
      }
      return isVorlage;
    }

    function getBodys(status, item) {
      let isVorlage = !1
      let itemStatus =  item.id.split("#")[1]
      if(status === 1 && itemStatus === "Entwurf") {
        isVorlage = !0;
      }
      return isVorlage;
    }

    const setCurrentShiftPlan = (id) => {
      dispatch(settingCurrentShiftplanIndex(id));
      dispatch(settingShiftplan(Plans[id]))
      dispatch(createInitialDummyshifts(id))
      dispatch(settingDisplayShiftplan());
    }

    if (displayTable && Plans && Onboarding) {
      if(getHeaders(props.status)) {
        return(
          <Row>
            <Col className="m-0 p-0" xs={4} md={12} lg={12}>
                <Card className="mb-1 mt-0" xs={6} md={12} lg={12}>
                <CardBody className="p-1">
                <Row className="text-left ml-2">
                    <Col xs={12} md={4} lg={4}>
                        <p className="mt-3 font-weight-bold">Name</p>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <p className="mt-3 font-weight-bold">Status</p>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                        <p className="mt-3 font-weight-bold">Auswählen</p>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                        <p className="mt-3 font-weight-bold">Löschen</p>
                    </Col>
                    </Row>
                </CardBody>
            </Card>
            </Col>
           {Plans.map((item, index) => { 
              if(getBodys(props.status, item)) {
                return (
                  <Col key={index} className="m-0 p-0" xs={4} md={12} lg={12}>
                <Card className="mb-1 mt-0" key={item.id} id={index} xs={6} md={12} lg={12}>
                  <CardBody className="p-1">
                    <Row className="text-left ml-2">
                        <Col xs={12} md={4} lg={4}>
                            <p className="mt-3">{item.name}</p>
                        </Col>
                        <Col xs={12} md={4} lg={4}>
                            {planIdColor(item.id)}
                        </Col>
                        <Col xs={12} md={2} lg={2}>
                          <Button className="mt-2" name={item.label} outline disabled={Onboarding.shiftplan} color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                        </Col>
                        <Col xs={12} md={2} lg={2}>
                        <i className="fa fa-trash fa-2x text-danger mt-3 ml-4" aria-hidden="true" onClick={() => deleteShiftplan(index)}></i>
                        </Col>
                        </Row>
                  </CardBody>
                </Card>
                </Col>
                )
              }
        })}
        </Row>
      )}
      else if(props.status === 2 || props.status === 3 || props.status === 4) {
      return(
        <Row>
        <Col className="m-0 p-0" xs={4} md={12} lg={12}>
            <Card className="mb-1 mt-0" xs={6} md={12} lg={12}>
            <CardBody className="p-1">
            <Row className="text-left ml-2">
                <Col xs={12} md={3} lg={3}>
                    <p className="mt-3 font-weight-bold">Name</p>
                </Col>
                <Col xs={12} md={3} lg={3}>
                    <p className="mt-3 font-weight-bold">Zeitraum</p>
                </Col>
                <Col xs={12} md={2} lg={2}>
                    <p className="mt-3 font-weight-bold">Status</p>
                </Col>
                <Col xs={12} md={2} lg={2}>
                    <p className="mt-3 font-weight-bold">Auswählen</p>
                </Col>
                <Col xs={12} md={2} lg={2}>
                    <p className="mt-3 font-weight-bold">Löschen</p>
                </Col>
                </Row>
            </CardBody>
        </Card>
        </Col>
        {Plans.map((item, index) => { 
          if (ID(props.status, item)) {
            return (
              <Col key={index} className="m-0 p-0" xs={4} md={12} lg={12}>
            <Card className="mb-1 mt-0" key={item.id} id={index} xs={6} md={12} lg={12}>
              <CardBody className="p-1">
                <Row className="text-left ml-2">
                    <Col xs={12} md={3} lg={3}>
                        <p className="mt-3">{item.name}</p>
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                        <p className="mt-3">
                          <i className="fas fa-calendar mr-2"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}
                        </p>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                        {planIdColor(item.id)}
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                      <Button className="mt-2" name={item.label} outline disabled={Onboarding.shiftplan} color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                    <i className="fa fa-trash fa-2x text-danger mt-3 ml-4" aria-hidden="true" onClick={() => deleteShiftplan(index)}></i>
                    </Col>
                    </Row>
              </CardBody>
            </Card>
            </Col>
            )}
        })}
      </Row>
      )
    }}
    return null 
}
export default FormImportedShiftplans