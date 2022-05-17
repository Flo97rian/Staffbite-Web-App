import React, { useEffect, useState} from "react";
import { FetchEmployeePlansFromDB } from "../store/middleware/FetchPlansForEmployees";
import { getUser } from "../store/middleware/FetchUser";
import { thunkUploadApplication } from "../store/middleware/UploadApplication";
import Spinner from 'react-bootstrap/Spinner'
import { useSelector, useDispatch } from "react-redux";
import InfoSidebar from "./Sidebar/InfoSidebar";
import Joyride from 'react-joyride';
import 'moment/locale/de';
import {
    Col,
    Row,
    Card,
    CardBody,
    CardHeader
  } from "reactstrap";
import ShiftplanTable from "./UserShiftplanTable";
import OpenModal from "./OpenModal";
import store from "../store";
import SchichtplanImport from "./ShiftplanImport";
import { thunkUpdateTradeShift } from "../store/middleware/UpdateTradeShift";
import ApplyTradeShift from "./FormApplyForShiftTrade";
import ShiftPlan from "../libs/Shiftplan";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_SCHICHTPLAN } from "../constants/OnBoardingTexts";
import { resettingShiftplan, settingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftplanChanged, settingShiftplanChanged } from "../reducers/shiftplanChanged";

const UserShiftplanContainer = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.card_shiftplan',
        locale: { 
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>,
         },
        content: ONBOARDING_EMPLOYEE_SCHICHTPLAN,
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
  const selectLoadingFetchingSafe = state => state.loadings.isFetchingPlansFromDB;
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
  const LoadingFetchingSafe = useSelector(selectLoadingFetchingSafe);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingDisplayShiftplan())
    dispatch(resettingShiftplan());
    store.dispatch(FetchEmployeePlansFromDB)
    store.dispatch(getUser)
  }, []);

  useEffect(() => {
    if(Plans && Shiftplan && currentShiftPlan) {
    if (!LoadingFetchingSafe) {
      let copyPlan = new ShiftPlan({...Plans[currentShiftPlan]});
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingShiftplan(shiftplan));
    }
  }
  }, [Plans]);

  useEffect(() => {
    if(User) {
      let showShiftplan = User.onboarding.shiftplan
      setState({...state, run: showShiftplan})
    }
  }, [User]);

  useEffect(() => {
  }, [currentShiftPlan]);


  useEffect(() => {
  }, [Shiftplan]);

  const handleOnboarding = () => {
    let user = store.getState().user;
    if(User) {
      user.onboarding.shiftplan = !1;
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
    store.dispatch({type: "isFetchPlansFromDB"});
    store.dispatch(thunkUploadApplication(Shiftplan));
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingDisplayShiftplan())
    dispatch(resettingShiftplan());
    dispatch(resettingShiftplanChanged())
    dispatch(resettingModal())
  }

  function onClickBack () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
    } else {
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplan());
        dispatch(resettingShiftplanChanged())
        dispatch(resettingDisplayShiftplan())
    }
  }

  const handleTradeShift = (modal) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setTradeShift(User, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateTradeShift(shiftplan));
    dispatch(settingShiftplan(shiftplan));
    dispatch(resettingModal())
    dispatch(settingShiftplanChanged())
  }

  const handleApplyTradeShift = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setApplyForTradeShift(User, index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateTradeShift(shiftplan));
    dispatch(settingShiftplan(shiftplan));
    dispatch(settingShiftplanChanged())
  }
  const handleCancelApplyTradeShift = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.removeApplyForShift(User, index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateTradeShift(shiftplan));
    dispatch(settingShiftplan(shiftplan));
    dispatch(settingShiftplanChanged())
  }

  const handleDeleteSetTradeShift = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.removeTradeShift(index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateTradeShift(shiftplan));
    dispatch(settingShiftplan(shiftplan));
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
        <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
        { LoadingFetchingSafe ? <Spinner color="success" /> : <></>}
        </Col>
        <Col xs={10} className="mt-2">
        </Col>
        </Row>
        <Row>
        { Plans && User ?
            <div className="col">
              <>
                { !DisplayShiftplan ? 
                <SchichtplanImport 
                  plaene={Plans}
                  plan={currentShiftPlan}
                  ></SchichtplanImport>
                  :
                  <></>
                }
                </>
                <>
              {DisplayShiftplan ?
                  <ShiftplanTable 
                  shiftplan={Shiftplan}
                  currentUser={User}
                ></ShiftplanTable>
                :
                <></>
              }
              </>
            </div>
            :
            <></>
            }
          </Row>
            {DisplayShiftplan && Plans !== undefined &&  User !== undefined && Shiftplan !== !1 && Shiftplan.tauschanfrage.length > 0 ?
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
                      shiftplan={Shiftplan}
                      currentUser={User}/>
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
            User={User}
            onTrade={handleTradeShift}
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
export default UserShiftplanContainer;