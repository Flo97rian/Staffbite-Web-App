import React, {useEffect} from "react";
import { FetchEmployeePlansFromDB } from "../../../store/middleware/FetchPlansForEmployees";
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
  } from "reactstrap";

import ApplicationsTable from "./Form/ApplicationsTable";
import OpenModal from "./Modal/OpenModal";
import store from "../../../store";
import ApplicationsImport from "./Form/SchichtplanImport";
import ShiftPlan from "../../Admin/Schichtplan/processing/Shiftplan";
import ButtonSave from "../Schichtplan/FormElements/ButtonSave";

const ApplicationsContainer = () => {

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectModal = state => state.modal;
  const selectShiftplan = state => state.Shiftplan;
  const selectCurrentShiftPlan = state => state.currentShiftPlan
  const selectUser = state => state.user
  const selectShiftSlot = state => state.shiftSlot;
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive;
  const selectLoadingFetchingPlans = state => state.loadings.isFetchingEmployeePlans;

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Modal = useSelector(selectModal);
  const User = useSelector(selectUser);
  const ShiftSlot = useSelector(selectShiftSlot);
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);
  const Shiftplan = useSelector(selectShiftplan);
  const LoadingFetchingEmployeePlans = useSelector(selectLoadingFetchingPlans);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch({ type: "ResetCurrentShiftPlan"})
    store.dispatch({ type: "stopShiftPlanIsImported"})
    store.dispatch({ type: "stopShiftPlanIsActive"})
    store.dispatch({ type: "resetShiftplan"})
    store.dispatch(FetchEmployeePlansFromDB)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
    if(Plans && Shiftplan && currentShiftPlan) {
    if (!LoadingFetchingEmployeePlans) {
      let copyPlan = new ShiftPlan({...Plans[currentShiftPlan]});
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({type: "setShiftplan", payload: shiftplan});
    }
  }
  }, [Plans]);

  useEffect(() => {
  }, [User]);

  useEffect(() => {
  }, [LoadingFetchingEmployeePlans]);

  useEffect(() => {
  }, [currentShiftPlan]);

  useEffect(() => {
  }, [Shiftplan]);

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
  const handleUploadApplication = () => {
    store.dispatch({type: "startFetchingEmployeePlans"});
    store.dispatch(thunkUploadApplication(Shiftplan));
    if ("saveChanges" in Modal) {
      store.dispatch({type: "CLOSE", payload: "saveChanges"});
    }
  }

  function onClickBack () {
    if (Plans[currentShiftPlan] !== Shiftplan) {
      store.dispatch({type: "OPEN", payload: "saveChanges"});
    } else {
        store.dispatch({ type: "ResetCurrentShiftPlan"})
        store.dispatch({ type: "resetShiftplan"})
        store.dispatch({ type: "stopShiftPlanIsActive"})
        store.dispatch({ type: "stopShiftPlanIsImported"})
    }
  }

  const handleDeleteApplication = (modal) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.removeApplicant(User, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    store.dispatch({type: "CLOSE", payload: modal});
  }

  function handleSetApplication (modal) {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setApplicant(User, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    store.dispatch({type: "CLOSE", payload: modal});
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
        <Row className="mt-6">
        <Col xs={2} className="mt-4">
        <h3 className="float-left pt-4 font-weight-bold text-lg">Bewerbungen</h3>
        { LoadingFetchingEmployeePlans ? <Spinner color="success" /> : <></>}
        </Col>
        <Col xs={10} className="mt-2">
          {ShiftPlanIsActive ?
        <ButtonSave
          titel="Speichern"
          handleUpload={handleUploadApplication}
          ></ButtonSave>
          :
          <></>
        }
        <ButtonZurueck
          titel="Zurück zur Auswahl"
          onClickVal={onClickBack}
          true={ShiftPlanIsActive}
          ></ButtonZurueck>
        </Col>
        </Row>
        <Row>
        { Plans && User ?
            <div className="col">
              <>
                { !ShiftPlanIsActive ? 
                <ApplicationsImport 
                  bearbeiten={ShiftPlanIsActive}
                  plaene={Plans}
                  plan={currentShiftPlan}
                  ></ApplicationsImport>
                  :
                  <></>
                }
                </>
                <>
              {ShiftPlanIsActive ?
                  <ApplicationsTable
                  bearbeiten={ShiftPlanIsActive}
                  shiftplan={Shiftplan}
                  currentUser={User}
                ></ApplicationsTable>
                :
                <></>
              }
              </>
            </div>
            :
            <></>
            }
          </Row>
        <OpenModal
            show={Modal}
            plaene={Plans}
            onDelete={handleDeleteApplication}
            onBewerben={handleSetApplication}
            shiftslot={ShiftSlot}
            plan={currentShiftPlan}
            shiftplan={Shiftplan}
            bearbeiten={ShiftPlanIsActive}
            handleUpdate={handleUploadApplication}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            ></OpenModal>
      </>
      }
      </>
            );
        }
export default ApplicationsContainer;