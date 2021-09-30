import React, {useState, useEffect} from "react";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import { getUser } from "../../../store/middleware/FetchUser";
import { thunkUploadApplication } from "../../../store/middleware/UploadApplication";
import { ButtonZurueck } from "../../Admin/SchichtplanVerwalten/FormElements/ButtonZurueck";
import { thunkDeleteApplication } from "../../../store/middleware/DeleteApplication";
import { useSelector } from "react-redux";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";

import AuswahlShow from "./FormElements/AuswahlShow";
import OpenModal from "./Modal/OpenModal";
import store from "../../../store";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan";
import { thunkUpdateTradeShift } from "../../../store/middleware/UpdateTradeShift";
import { handleSetTrade, handleDeleteShiftTrade } from "./processing.js/handleSetTrade";
import ApplyTradeShift from "./FormElements/applyShiftTrade";
import { handleSetApplicantTradeShift, handleCancelSetApplicantTradeShift } from "./processing.js/handleApplyForShiftTrade";

const TableContainer = () => {
  const [ActivePlan, setActivePlan] = useState(null);
  const [ActivePlanIndex, setActivePlanIndex] = useState({left: !1, right: !1});

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectModal = state => state.modal;
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan
  const selectUser = state => state.DB.user
  const selectEmployees = state => state.DB.employees;
  const selectShiftSlot = state => state.shiftSlot;
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive;

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Modal = useSelector(selectModal);
  const User = useSelector(selectUser);
  const ShiftSlot = useSelector(selectShiftSlot);
  const Employees = useSelector(selectEmployees);
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchEmployeePlansFromDB)
    store.dispatch(FetchEmployees)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
    if(Plans) {
    let NoLeftNextShiftPlan = currentShiftPlan - 1 < 0 ? !0 : !1 
    let NoRightNextShiftPlan = currentShiftPlan + 1 >= Plans.length ? !0 : !1 
    setActivePlanIndex({...ActivePlanIndex, left: NoLeftNextShiftPlan, right: NoRightNextShiftPlan})
    console.log(ActivePlanIndex)
    }
  }, [currentShiftPlan]);

  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
  }, [Plans]);
  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  }
  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value})
    let truemodal = modals.includes(true)
    return truemodal
  }
  // Diese Funktion ist der handler, wenn sich auf eine Schicht beworben wird. Sie schließt das Modal und leitet einen API Call ein.
  const handleUploadApplication = (modal) => {
    store.dispatch(thunkUploadApplication({ShiftSlot, Plans, currentShiftPlan}));
    store.dispatch({type: "CLOSE", payload: modal});
  }

  const handleDeleteApplication = (modal) => {
    store.dispatch(thunkDeleteApplication(Plans, ShiftSlot, currentShiftPlan, User));
    store.dispatch({type: "CLOSE", payload: modal});
  }

  const handleTradeShift = (modal) => {
    let plan = handleSetTrade(Plans, currentShiftPlan, ShiftSlot, User)
    store.dispatch(thunkUpdateTradeShift(plan));
    store.dispatch({type: "CLOSE", payload: modal});
  }

  const handleApplyTradeShift = (index) => {
    let plan = handleSetApplicantTradeShift(Plans, currentShiftPlan, ShiftSlot, User, index)
    store.dispatch(thunkUpdateTradeShift(plan));
  }
  const handleCancelApplyTradeShift = (index) => {
    let plan = handleCancelSetApplicantTradeShift(Plans, currentShiftPlan, ShiftSlot, User, index)
    store.dispatch(thunkUpdateTradeShift(plan));
  }

  const handleDeleteSetTradeShift = (index) => {
    let plan = handleDeleteShiftTrade(Plans, currentShiftPlan, index)
    store.dispatch(thunkUpdateTradeShift(plan));
  }
        return(
      <>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Für Schichten bewerben</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? (ActivePlanIndex.left ? <span className="ni ni-bold-left text-light"></span> : <span className="ni ni-bold-left" onClick={() => {store.dispatch({ type: "SwitchLeftcurrentShiftPlan"})}}></span>) : <></>}
                  </Col>
                  <Col xs={3} className="text-center">
                  <ButtonZurueck
                  titel="Zuück zur Auswahl"
                  onClickVal=""
                  true={ShiftPlanIsActive}
                  ></ButtonZurueck>
                  </Col>
                  <Col xs={7} className="text-center">
                  </Col>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? (ActivePlanIndex.right ? <span className="ni ni-bold-right text-light"></span> : <span className="ni ni-bold-right" onClick={() => {store.dispatch({ type: "SwitchRightcurrentShiftPlan", payload: Plans.length})}}></span>) : <></>}
                  </Col>
                </Row>
                <br />
                <AuswahlShow 
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  currentUser={User}
                  plan={currentShiftPlan}
                 />
              </CardBody>
            </Card>
          </div>
        </Row>
        {currentShiftPlan && Plans[currentShiftPlan].tauschanfrage.length > 0 ?
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Tauschanfragen</h3>
              </CardHeader>
              <CardBody>
                <ApplyTradeShift
                onTradeAppy={handleApplyTradeShift}
                onTradeCancel={handleCancelApplyTradeShift}
                onDeleteTrade={handleDeleteSetTradeShift}
                employees={Employees}
                plan={Plans}
                currentUser={User}
                current={currentShiftPlan}/>
              </CardBody>
            </Card>
          </div>
        </Row>
        : 
        <></>
        }
        <OpenModal
            show={Modal}
            plaene={Plans}
            onDelete={handleDeleteApplication}
            onTrade={handleTradeShift}
            onBewerben={handleUploadApplication}
            shiftslot={ShiftSlot}
            plan={currentShiftPlan}
            bearbeiten={ShiftPlanIsActive}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            ></OpenModal>
    </>
            );
        }
export default TableContainer;