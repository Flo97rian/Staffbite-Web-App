import React, {useEffect, useState} from "react";
import { FetchEmployeePlansFromDB } from "../store/middleware/FetchPlansForEmployees";
import { getUser } from "../store/middleware/FetchUser";
import { thunkUploadApplication } from "../store/middleware/UploadApplication";
import Spinner from 'react-bootstrap/Spinner'
import InfoSidebar from "./Sidebar/InfoSidebar";
import { useSelector, useDispatch } from "react-redux";
import Joyride from 'react-joyride';
import 'moment/locale/de';
import {
  Button,
    Col,
    Row,
  } from "reactstrap";
import ApplicationsTable from "./UserApplicationsTable";
import OpenModal from "./OpenModal";
import store from "../store";
import ApplicationsImport from "./UserApplicationsImport";
import ShiftPlan from "../libs/Shiftplan";
import ButtonSave from "./deprecated/ButtonSave";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_EINTRAGEN } from "../constants/OnBoardingTexts";
import { resettingShiftplan, settingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { settingDisplayShiftplan } from "../reducers/display";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";


const UserApplicationsContainer = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.card_eintragen',
        locale: { 
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
         },
        content: ONBOARDING_EMPLOYEE_EINTRAGEN,
        title: "Schichtplan"
      }
    ]
  })
  const { run, steps } = state;

  //REDUX-Filter für UI-Data
  const selectPlans = state => state.DB.plans;
  const selectModal = state => state.modal;
  const selectShiftplan = state => state.Shiftplan;
  const selectCurrentShiftPlan = state => state.currentShiftPlan
  const selectUser = state => state.user
  const selectShiftSlot = state => state.shiftSlot;
  const selectLoadingFetchingPlans = state => state.loadings.isFetchingEmployeePlans;
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged.shiftplanChanged;

  //REDUX-Listener für UI-Data
  const Plans = useSelector(selectPlans);
  const Modal = useSelector(selectModal);
  const User = useSelector(selectUser);
  const ShiftSlot = useSelector(selectShiftSlot);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);
  const Shiftplan = useSelector(selectShiftplan);
  const LoadingFetchingEmployeePlans = useSelector(selectLoadingFetchingPlans);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(settingDisplayShiftplan())
    dispatch(resettingShiftplan())
    store.dispatch(FetchEmployeePlansFromDB)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
    if(Plans && Shiftplan && currentShiftPlan) {
    if (!LoadingFetchingEmployeePlans) {
      let copyPlan = new ShiftPlan({...Plans[currentShiftPlan]});
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingShiftplan(shiftplan));
    }
  }
  }, [Plans]);

  useEffect(() => {
    if(User) {
      let showEintragen = User.onboarding.eintragen
      setState({...state, run: showEintragen})
    }
  }, [User]);

  useEffect(() => {
  }, [LoadingFetchingEmployeePlans]);

  useEffect(() => {
  }, [currentShiftPlan]);

  useEffect(() => {
  }, [Shiftplan]);

  const handleOnboarding = () => {
    let user = store.getState().user;
    if(User) {
      user.onboarding.eintragen = !1;
      store.dispatch(thunkUpdateEmployee(user));
    }
  }
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
    dispatch(resettingModal())
  }

  function onClickBack () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
    } else {
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplan())
        dispatch(settingDisplayShiftplan())
    }
  }

  const handleDeleteApplication = (modal) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.removeApplicant(User, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan));
    dispatch(resettingModal())
    dispatch(settingShiftplanChanged())
  }

  function handleSetApplication (modal) {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setApplicant(User, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan));
    dispatch(resettingModal())
    dispatch(settingShiftplanChanged())
  }

  return(
          <div className="pt-6">
          <Joyride
          continuous={true}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
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
        <h3 className="float-left pt-4 font-weight-bold text-lg">Eintragen</h3>
        { LoadingFetchingEmployeePlans ? <Spinner color="success" /> : <></>}
        </Col>
        <Col xs={10} className="mt-2">
        <Button 
        hidden={!DisplayShiftplan}
          color={ShiftplanChanged ? "success" : "white"}
          size="lg"
          className="float-right mt-2 ml-2 mr-0"
          onClick={() => handleUploadApplication()}>
            <p className={ShiftplanChanged ? "m-0 text-white" : "m-0 text-muted"}>
              Speichern
            </p>
          </Button> 
        <Button 
          color="white"
          hidden={!DisplayShiftplan}
          size="lg"
          className="float-right mt-2 ml-2 mr-0"
          onClick={() => onClickBack()}>
            <p className="m-0 text-muted">
              Zurück zur Auswahl
            </p>
        </Button> 
        </Col>
        </Row>
        <Row>
        { Plans && User ?
            <div className="col">
              <>
                { !DisplayShiftplan ? 
                <ApplicationsImport 
                  plaene={Plans}
                  plan={currentShiftPlan}
                  ></ApplicationsImport>
                  :
                  <></>
                }
                </>
                <>
              {DisplayShiftplan ?
                  <ApplicationsTable
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
            User={User}
            onDelete={handleDeleteApplication}
            onBewerben={handleSetApplication}
            shiftslot={ShiftSlot}
            plan={currentShiftPlan}
            shiftplan={Shiftplan}
            handleUpdate={handleUploadApplication}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            ></OpenModal>
      </>
      }
       <InfoSidebar
      sidebarInfo={SidebarInfo}/>
      </div>
            );
        }
export default UserApplicationsContainer;