import React, {useState, useEffect} from "react";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import { getUser } from "../../../store/middleware/FetchUser";
import { thunkUploadApplication } from "../../../store/middleware/UploadApplication";
import Spinner from 'react-bootstrap/Spinner'
import ButtonZurueck from "../../Admin/Schichtplan/FormElements/ButtonZurueck"
import { thunkDeleteApplication } from "../../../store/middleware/DeleteApplication";
import { useSelector } from "react-redux";
import 'moment/locale/de';
import {
    Col,
    Row,
    Card,
    CardBody,
    CardHeader
  } from "reactstrap";

import AuswahlShow from "./FormElements/AuswahlShow";
import OpenModal from "./Modal/OpenModal";
import store from "../../../store";
import UserSchichtplanTabs from "./Nav/Nav";
import SchichtplanImport from "./Form/SchichtplanImport";
import { thunkUpdateTradeShift } from "../../../store/middleware/UpdateTradeShift";
import { handleSetTrade, handleDeleteShiftTrade } from "./processing.js/handleSetTrade";
import ApplyTradeShift from "./FormElements/applyShiftTrade";
import { handleSetApplicantTradeShift, handleCancelSetApplicantTradeShift } from "./processing.js/handleApplyForShiftTrade";

const TableContainer = () => {
  const [ActivePlan, setActivePlan] = useState(null);
  const [navIndex, setNavIndex] = useState(1);

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectModal = state => state.modal;
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan
  const selectUser = state => state.DB.user
  const selectShiftSlot = state => state.shiftSlot;
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive;

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Modal = useSelector(selectModal);
  const User = useSelector(selectUser);
  const ShiftSlot = useSelector(selectShiftSlot);
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch({ type: "ResetCurrentShiftPlan"})
    store.dispatch({ type: "stopShiftPlanIsActive"})
    store.dispatch({ type: "stopShiftPlanIsImported"})
    store.dispatch(FetchEmployeePlansFromDB)
    //store.dispatch(FetchEmployees)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
  console.log(navIndex)
  }, [navIndex]);
  
  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  }

  const handleNavChange = (index) => {
    setNavIndex(index)
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
    store.dispatch(thunkDeleteApplication({ShiftSlot, Plans, currentShiftPlan}));
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
          { !User && !Plans?
          <Row className="text-center">
            <br/>
            <Col xs={12}>
              <Spinner animation="grow" variant="light"/>
            </Col>
          </Row>
          :
        <>
      { !ShiftPlanIsActive ?
        <UserSchichtplanTabs
          onNavChange={handleNavChange}
          navIndex={navIndex}
          ></UserSchichtplanTabs>
        :
        <></>
      }
        <Row className="mt-6">
        <Col xs={2} className="mt-4">
        <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
        </Col>
        <Col xs={10} className="mt-2">
        <ButtonZurueck
          titel="Zurück zur Auswahl"
          onClickVal=""
          true={ShiftPlanIsActive}
          ></ButtonZurueck>
        </Col>
        </Row>
        <Row>
            <div className="col">
                {Plans && !ShiftPlanIsActive ? 
                <SchichtplanImport 
                  status={navIndex}
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  plan={currentShiftPlan}
                  ></SchichtplanImport>
                  :
                  <></>
                  }
                    {ShiftPlanIsActive ? 
                  <AuswahlShow 
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  currentUser={User}
                  plan={currentShiftPlan}
                />
                   :
                   <></>
                  }
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
      }
      </>
            );
        }
export default TableContainer;