import React, {useState, useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import 'moment/locale/de';
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
    Button,
  } from "reactstrap";

import NotificationAlert from "react-notification-alert";
import Joyride from 'react-joyride';
import shiftplanStates from "../constants/ShiftplanDefault"
import Nav from "./AdminShiftplanNav";
import { Spinner } from "reactstrap";
import OpenModal from "./OpenModal";
import { FetchOrg } from "../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
import NewShiftPlan from "../libs/NewShiftplan";
import ShiftPlan from "../libs/Shiftplan";
import { deleteShiftFromNewShiftPlan } from "../libs/handleDeleteShift"
import { FetchFromDB } from "../store/middleware/FetchPlansFromDB";
import { thunkUpdateShiftPlan } from "../store/middleware/UpdateShiftPlan";
import { user } from "../store/middleware/user";
import { thunkUploadShiftPlanToDB } from "../store/middleware/UploadShiftPlanToDB";
import { thunkDeleteShiftPlan } from "../store/middleware/DeleteShiftPlan";
import { thunkStartAlg } from "../store/middleware/StartAlg";
import { thunkReleaseForApplication } from "../store/middleware/ReleaseForApplication";
import SetTradeShift from "./CardTradeShift";
import SchichtplanImport from "./FormImportedShiftplans";
import store from "../store";
import { thunkPublishShiftPlan } from "../store/middleware/PublishShiftPlan";
import { FetchEmployees } from "../store/middleware/FetchEmployees";
import { WARNING_MISSING_SHIFT_DETAILS, WARNING_MISSING_SHIFT_POSITION } from "../constants/Alerts";
import ImportSchichtplanTabelle from "./ShiftplansTable";
import ShiftplansTable from "./ShiftplansTable";
import NeuerSchichtplanTabelle from "./NewShiftplan";
import InfoSidebar from "./Sidebar/InfoSidebar";
import { ONBOARDING_SHIFTPLAN_VORLAGE_ERSTELLEN, ONBOARDING_SHIFTPLAN_VORLAGE, ONBOARDING_SHIFTPLAN_EINTRAGEN, ONBOARDING_SHIFTPLAN_UEBERPRUEFUNG, ONBOARDING_SHIFTPLAN_VEROEFFENTLICHUNG } from "../constants/OnBoardingTexts"
import ReloadView from "./ReloadView";
import CalendarView from "./CalenderView";
import _ from "lodash";
import { resettingUserInput, settingCompanyPositions, settingShiftStart } from "../reducers/userInput";
import { deletingCalendarShift, resettingShiftplan, settingShiftplan} from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { settingNewShiftplan } from "../reducers/NewShiftPlan";
import { resettingShiftplanChanged, settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { resettingShiftSlot } from "../reducers/ShiftSlot";

const ShiftplanContainer = () => {
  const dispatch = useDispatch();
  const [isReloading, setIsReloading] = useState(false);
  const [navIndex, setNavIndex] = useState(1);
  const [ShiftEmployees, setShiftEmployees] = useState(null);
  const [ShiftSwitch, setShiftSwitch] = useState(!1);
  const [changeNotice, setChangeNotice] = useState(!1);
  const [ErrMsng, setErrMsng] = useState({MissingShiftDetails: !1, MissingShiftPosition: !1, ShiftDetailsNotUpToDate: !1});
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.button_vorlage_erstellen',
        locale: { 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          next: <strong aria-label="skip">Nächster Schritt</strong>
         },
        content: ONBOARDING_SHIFTPLAN_VORLAGE_ERSTELLEN,
        title: "Dein Schichtplan"
      },
      {
        target: '.nav_vorlage',
        content: ONBOARDING_SHIFTPLAN_VORLAGE,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Dein Schichtplan"
      },
      {
        target: '.nav_eintragen',
        content: ONBOARDING_SHIFTPLAN_EINTRAGEN,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Dein Schichtplan"
      },
      {
        target: '.nav_ueberpruefen',
        content: ONBOARDING_SHIFTPLAN_UEBERPRUEFUNG,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Dein Schichtplan"
      },
      {
        target: '.nav_veroeffentlichen',
        content: ONBOARDING_SHIFTPLAN_VEROEFFENTLICHUNG,
        locale: { 
          back: <strong aria-label="skip">Zurück</strong>,
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>
         },
        title: "Dein Schichtplan"
      }
    ]
  });
  let notificationAlert = useRef(null)
  const location = useLocation();
  const mainContent = useRef()
  const DragAndDropRef = useRef()
  const { run, steps } = state;

  const selectMeta = state => state.Meta;
  const selectEmployees = state => state.DB.employees;
  const selectDate = state => state.date;
  const selectShiftplan = state => state.Shiftplan;
  const selectNewDate = state => state.date.start;
  const selectCurrentShiftPlan = state => state.currentShiftPlan;
  const selectPlans = state => state.DB.plans;
  const selectShiftSlot = state => state.shiftSlot;
  const selectNewShiftplan = state => state.newShiftPlan;
  const selectModal = state => state.modal;
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged.shiftplanChanged;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Employees = useSelector(selectEmployees);
  const Date = useSelector(selectDate);
  const NewDate = useSelector(selectNewDate);
  const Shiftplan = useSelector(selectShiftplan);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);
  const Plans = useSelector(selectPlans);
  const ShiftSlot = useSelector(selectShiftSlot);
  const NewShiftplan = useSelector(selectNewShiftplan);
  const Modal = useSelector(selectModal);
  const FetchingPlans = useSelector(state => state.DB.plansStatus === "loading");
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const DisplayNewShiftplan = useSelector(state => state.display.DisplayNewShiftplan);
  const index = useSelector(state => state.shiftSlot.index);
  const day = useSelector(state => state.shiftSlot.day);
  const getCurrentShift = useSelector(state => state?.shiftDtails?.shift);
  const userInput = useSelector(state => state.userInput);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingShiftplan());
    dispatch(resettingDisplayShiftplan());
    dispatch(resettingShiftplanChanged())
    store.dispatch(FetchFromDB);
    store.dispatch(FetchOrg);
    store.dispatch(user);
    store.dispatch(FetchEmployees);
    }, []);

  useEffect(() => {
    if(Employees) {
      //const employees = refractorEmployees(Employees, Plans[currentShiftPlan].plan);
      setShiftEmployees({...Employees});
    }
  }, [Employees]);

  useEffect(() => {
  }, [currentShiftPlan]);

  useEffect(() => {
    console.log(Shiftplan);
  }, [Shiftplan]);

  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
  }, [isReloading]);

  useEffect(() => {
    if (_.isObject(Meta)) {
      dispatch(settingCompanyPositions([...Meta.schichten]))
      let showShfitplan = Meta.onboarding.shiftplan
      setState({...state, run: showShfitplan})
    }
  }, [Meta]);

  useEffect(() => {
  }, [navIndex]);


  useEffect(() => {
    console.log('Location changed');
  }, [location]);

  const handleNavChange = (index) => {
    setNavIndex(index);
  };

  const handleOnboarding = () => {
    let meta = store.getState().Meta;
    if(_.isObject(meta)) {
      meta.onboarding.shiftplan = !1;
      store.dispatch(thunkUpdateProfile(meta));
    }
  }

  const shiftChange = (plan) => {
    setShiftSwitch([...plan]);
  };

  // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
  const stateSwitch = (value, event) => {
    if (value !== "on") return value;
      let state = handleInputSwitch(event);
      return state;
  };

  // Diese Funktion ändert den Wert eines Switches, je nach userinput
  const handleInputSwitch = (event) => {
    if (event.target.checked !== !0) return !1;
      return !0;
  };

  const handleChangeNotice = () => {
    setChangeNotice(!changeNotice)
  }

  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
    const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
    const modalfilter = modals.filter((modal) => typeof modal === "string");
    const modal = modalfilter[0];
    return modal;
  };
  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value;});
    let truemodal = modals.includes(true);
    return truemodal;
  };

  const handleUpdateProfile = () => {
    store.dispatch(thunkUpdateProfile(Meta));
  };
  // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
  const handleNewShiftPlanSave = (modal) => {
    let newShiftplan = new NewShiftPlan();
    newShiftplan.configure(userInput, NewDate);
    let shiftplan = newShiftplan.getAllPlanDetails();
    dispatch(settingNewShiftplan(shiftplan))
    dispatch(resettingModal())
  };

  const handleSelectPrio = (qualifikation) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if(isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      copyPlan.setPrio(ShiftSlot, qualifikation);
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingNewShiftplan(shiftplan))
    } else {
    let copyPlan = new ShiftPlan({...Shiftplan})
    copyPlan.setPrio(ShiftSlot, qualifikation);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    }
    }

  const handleSetApplicant = (modal, updateApplicant) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.changeNotice(userInput, ShiftSlot)
    copyPlan.adminSetApplicant(updateApplicant.current, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingModal())
    setChangeNotice(!1);
    dispatch(settingShiftplanChanged())
  };

  function Notify (type, title, err) {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
          </span>
          <span data-notify="message">
            {title}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
    setErrMsng({...ErrMsng, [err]: !1})

  };

  const handleSetTenantInShift = () => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setTenantInShift(ShiftSlot, Meta);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingUserInput())
    dispatch(resettingModal())
  }

  const handleRemoveTenantFromShift = () => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.removeTenantFromShift(ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingUserInput())
    dispatch(resettingModal())
  }
  // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter)
  const handleEditShiftDetails = () => {
    if (DisplayShiftplan) {
      let copyPlan = new ShiftPlan({...Shiftplan})
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          dispatch(resettingModal())
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } else {
        copyPlan.updateShiftDescription(index, {...userInput, position: Meta.schichten[0]});
        }
      } else {
        if(Meta.schichten.length === 0) {
          dispatch(resettingModal())
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } 
        copyPlan.updateShiftDescription(index, userInput);
      }
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingShiftplan(shiftplan))
      dispatch(resettingUserInput())
    } else {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          dispatch(resettingModal())
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } else {
          copyPlan.updateShiftDescription(index, {...userInput, position: Meta.schichten[0]});
        }
      } else {
        copyPlan.updateShiftDescription(index, userInput);
      }
      copyPlan.updateShiftDescription(index, userInput);
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingNewShiftplan(shiftplan))
    }
    dispatch(resettingUserInput())
    dispatch(settingShiftplanChanged())
    dispatch(resettingModal())
  };

  const handleActiveShift = () => {
    let copyPlan = new ShiftPlan({...NewShiftplan});
    copyPlan.shiftIsActive(ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    dispatch(settingShiftplanChanged())
    }

  const handleActiveInactiveShift = (index) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if(isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      copyPlan.shiftIsActive(ShiftSlot);
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingNewShiftplan(shiftplan))
      dispatch(resettingModal())
    } else {
    let copyPlan = new ShiftPlan({...Shiftplan})
    copyPlan.shiftIsActive(ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails()
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingModal())
    dispatch(settingShiftplanChanged())
    }
    }



  //Dise Funktion sorgt für das Hinzufügen einer neuen Schicht zum jeweiligen Schichtplan
  const handleAddShift = (index) => {
    if (DisplayShiftplan) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          dispatch(resettingModal())
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } else {
          copyPlan.addNewShiftToPlan({...userInput, position: Meta.schichten[0]});
        }
      } else {
        copyPlan.addNewShiftToPlan(userInput);
      }
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingShiftplan(shiftplan))
      dispatch(resettingUserInput())
    } else {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.addNewShiftToPlan(userInput);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingNewShiftplan(shiftplan))
      dispatch(resettingUserInput())
    }
    dispatch(resettingUserInput())
    dispatch(resettingModal())
    dispatch(settingShiftplanChanged())
  };

  //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
  const handlePrioShiftToDB = (modal) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if (isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.changeNotice(userInput, ShiftSlot);
      copyPlan.getAllPlanDetails();
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingNewShiftplan(shiftplan))
    } else {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.changeNotice(userInput, ShiftSlot);
      copyPlan.getAllPlanDetails();
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingShiftplan(shiftplan))
      dispatch(settingShiftplanChanged())
    }
    dispatch(resettingShiftSlot())
    dispatch(resettingUserInput())
    dispatch(resettingModal())
  };

  function handleResetShiftNotice(modal) {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if (isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.resetNotice(ShiftSlot);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingNewShiftplan(shiftplan))
    } else {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.resetNotice(ShiftSlot);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      dispatch(settingShiftplan(shiftplan))
      dispatch(settingShiftplanChanged())
    }
    dispatch(resettingUserInput())
  }

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let isVorlage = Shiftplan.id.split("#").includes("Entwurf")
      if (isVorlage) {
        copyShiftplan.changeShiftsOrder(ShiftSwitch);
        let shiftplan = copyShiftplan.getAllPlanDetails();
        store.dispatch(thunkUpdateShiftPlan(shiftplan));
      } else {
        let shiftplan = copyShiftplan.getAllPlanDetails();
        store.dispatch(thunkUpdateShiftPlan(shiftplan, !0));
      }
      dispatch(resettingModal())
  };

  function onClickBack () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingDisplayShiftplan());
    } else {
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplan())
        dispatch(resettingShiftSlot())
        dispatch(resettingShiftplanChanged())
        dispatch(resettingDisplayShiftplan());
    }
  }

  function onClickFreigeben (modal) {
    if (ShiftplanChanged) {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let shiftplan = copyShiftplan.getAllPlanDetails();
      store.dispatch({type: "isFetchPlansFromDB"});
      store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
      dispatch(settingModal(modal))
      dispatch(resettingShiftplanChanged())
    } else {
      dispatch(settingModal(modal))
    }
  }

  function onClickStartAlg (modal) {
    if (ShiftplanChanged) {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let shiftplan = copyShiftplan.getAllPlanDetails();
      store.dispatch({type: "isFetchPlansFromDB"});
      store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
      dispatch(settingModal(modal))
      dispatch(resettingShiftplanChanged())
    } else {
      dispatch(settingModal(modal))
    }
  }
  //Diese Funktion fürgt einen neu erstelten Schichtplan der Datenbank hinzu
  const handleUploadShiftPlanToDB = () => {
    let copyNewPlan = new ShiftPlan(NewShiftplan);
    let shiftplan = copyNewPlan.getAllPlanDetails()
    store.dispatch({type: "startFetchingSafe"});
    store.dispatch(thunkUploadShiftPlanToDB(shiftplan));
    dispatch(resettingUserInput())
  };

  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  function handleDeleteShiftPlan(index) {
    store.dispatch(thunkDeleteShiftPlan({ index, Plans }));
  }

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleShiftTradeToDB = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setAcceptTradeShift(userInput, index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
    dispatch(settingShiftplan(shiftplan))
  };
  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleCancelShiftTradeToDB = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setDeclineShiftTrade(index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
    dispatch(settingShiftplan(shiftplan))
  };
  //Diese Funktion löscht eine ausgewählte Schicht innerhalb eines ausgewählten Schichtplans
  const handleDeleteShift = (index) => {
    if (DisplayShiftplan) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.deleteShift(index)
      let shiftplan = copyPlan.getAllPlanDetails();
      dispatch(settingShiftplan(shiftplan))
      dispatch(settingShiftplanChanged())
    } else {
      deleteShiftFromNewShiftPlan({index, NewShiftplan});
    }
    dispatch(resettingModal())
  };
  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingShiftplanChanged())
    } else {
      store.dispatch({type: "startFetchingPublish"});
      store.dispatch(thunkPublishShiftPlan(Plans[currentShiftPlan]));
      setNavIndex(4);
    }
  };

  const handleReleaseForApplication = (modal) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    let shiftplan = copyPlan.getAllPlanDetails();
    let detailsFilled = copyPlan.checkShiftHasDetails()
    let hasDate = NewDate.startDate !== undefined;
    if (detailsFilled && hasDate) {
      store.dispatch({type: "startFetchingRelease"})
      store.dispatch(thunkReleaseForApplication(shiftplan, NewDate, userInput))
      setNavIndex(2);
    } else {
      setErrMsng({...ErrMsng, MissingShiftDetails: !0});
    }
    dispatch(resettingModal())
    dispatch(resettingUserInput())
  };

  const handleCalendarShiftChanges = () => {
    const copyShiftplan = new ShiftPlan({...Shiftplan});
    copyShiftplan.updateCalendarShift(userInput, ShiftSlot, DragAndDropRef);
    const shiftplan = copyShiftplan.getAllPlanDetails()
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingModal())
  }

  const updateCalendarShiftTime = (info) => {
    const copyShiftplan = new ShiftPlan({...Shiftplan});
    copyShiftplan.updateCalendarShiftTime(info);
    const shiftplan = copyShiftplan.getAllPlanDetails()
    dispatch(settingShiftplan(shiftplan))
  }

  const handleCalendarAddShift = () => {
    const copyShiftplan = new ShiftPlan({...Shiftplan});
    copyShiftplan.addCalendarShift(userInput, ShiftSlot);
    const shiftplan = copyShiftplan.getAllPlanDetails();
    dispatch(settingShiftplan(shiftplan))
    dispatch(resettingModal())
  }

  const handleCalendarDeleteShift = () => {
    dispatch(deletingCalendarShift({day: day, index: index}))
    dispatch(resettingModal())
  }

  const handleStartAlg = (modal) => {
      store.dispatch({type: "startFetchingAlg"});
      const id = Plans[currentShiftPlan].id;
      store.dispatch(thunkStartAlg(id));
      setNavIndex(3)
      dispatch(resettingModal())
  };

  const handleAddEventSetStart = (startTime) => {
    dispatch(settingShiftStart(startTime))
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  function showMain() {
    return (
      <>
      {_.isObject(Meta) ?
      <Joyride
        continuous={true}
        run={run}
        scrollOffset={200}
        top
        showProgress={true}
        showSkipButton={true}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      :
      <></>
      }
      { !Meta && !Employees && !Plans ?
      <Row className="text-center">
        <br/>
        <Col xs={12}>
          <Spinner animation="grow" variant="light"/>
        </Col>
      </Row>
      :
    <>
    { ErrMsng.MissingShiftDetails ? Notify("warning", WARNING_MISSING_SHIFT_DETAILS, "MissingShiftDetails") : null}
    { ErrMsng.ShiftDetailsNotUpToDate ? Notify("warning", WARNING_MISSING_SHIFT_DETAILS, "ShiftDetailsNotUpToDate") : null}
    { ErrMsng.MissingShiftPosition ? Notify("warning", WARNING_MISSING_SHIFT_POSITION, "MissingShiftPosition") : null}
      <Nav
        onNavChange={handleNavChange}
        navIndex={navIndex}
        ></Nav>
    <Row>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlert} />
      </div>
    <Col xs={2} className="mt-4">
    <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
    { FetchingPlans ? <Spinner color="success" /> : <></>}
    </Col>
    <Col xs={10} className="mt-2 mr-0">
    <Button 
      color="white"
      size="lg"
      hidden={(DisplayShiftplan && DisplayShiftplan) || !DisplayShiftplan} 
      className="float-right mt-2 ml-2 mr-0" 
      onClick={() => handleUploadShiftPlanToDB()}>
        <p className="m-0 text-muted">
          Speichern
        </p>
      </Button> 
    <Button 
      color={ShiftplanChanged ? "success" : "white"}
      hidden={!DisplayShiftplan}
      size="lg"
      className="float-right mt-2 ml-2 mr-0"
      onClick={() => handleUpdatedShiftPlanToDB()}>
        <p className={ShiftplanChanged ? "m-0 mb-0 text-white" : "m-0 mb-0 text-muted"}>
          Aktualisieren
        </p>
      </Button>
    <Button 
      className="float-right mt-2 ml-2 mr-0"
      hidden={!_.includes(_.get(Shiftplan, "id", "").split("#"), "Entwurf")}
      size="lg"
      color="primary"
      onClick={() => onClickFreigeben("showSchichtplanFreigeben")}
      >
        <p className="m-0 text-white">
          Schichtplan freigeben
        </p>
      </Button>
      <Button
      hidden={!_.includes(_.get(Shiftplan, "id", "").split("#"), "Entwurf")}
        className="float-right mt-2 ml-2 mr-0"
        size="lg"
        color="white"
        onClick={() => dispatch(settingModal("showSchichthinzufuegen"))}
        >
          <p className="m-0 text-muted">
            Schicht hinzufügen
          </p>
        </Button> 
          <Button
            hidden={!_.includes(_.get(Shiftplan, "id", "").split("#"), "Freigeben")}
            className="float-right mt-2 ml-2 mr-0"
            size="lg"
            color="primary"
            onClick={() => onClickStartAlg("showBefuellungStarten")}
            >
              <p className="m-0 text-white">
                Befüllung starten
              </p>
            </Button> 

          <Button
            size="lg"
            color="primary" className="float-right mt-2 ml-2 mr-0"
            hidden={!_.includes(_.get(Shiftplan, "id", "").split("#"), "Review")}
            onClick={() => handlePublishShiftPlan()}
            >
              <p className="m-0 text-white">
                Schichtplan veröffentlichen
              </p>
          </Button>
          <Button
            hidden={(DisplayShiftplan || navIndex !== 1)}
            size="lg"
            color="primary"
            className="float-right mt-2 button_vorlage_erstellen"
            onClick={() => dispatch(settingModal("showSchichtplanErstellen"))}
          >
            <p className="m-0 text-white">
              Vorlage erstellen
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
        <div className="col">
             {/*<ImportSchichtplanTabelle 
             shiftplan={Shiftplan}
             plans={Plans}
             employees={Employees}
             onSwitch={shiftChange}
             handleActive={handleActiveShift}
             Loading={LoadingFetchingPlans}
             Schichtplan={NewShiftplan}
             ></ImportSchichtplanTabelle>
            */}
             <NeuerSchichtplanTabelle 
             shiftplan={Shiftplan}
             plans={Plans}
             employees={Employees}
             onSwitch={shiftChange}
             Loading={FetchingPlans}
             handleActive={handleActiveShift}
             Schichtplan={NewShiftplan}
             ></NeuerSchichtplanTabelle> 
            <SchichtplanImport 
              status={navIndex}
              plaene={Plans}
              onSwitch={shiftChange}
              plan={currentShiftPlan}
              Schichtplan={NewShiftplan}
              onDelete={handleDeleteShiftPlan}
              onClick={handleUpdateProfile}
              org={Meta}></SchichtplanImport>
        </div>
      </Row>
      <CalendarView
        handleAddEventSetStart={handleAddEventSetStart}
        updateCalendarShiftTime={updateCalendarShiftTime}
      ></CalendarView>
      <SetTradeShift
      onTradeSubmit={handleShiftTradeToDB}
      onCancelSumbit={handleCancelShiftTradeToDB}
      employees={Employees}
      shiftplan={Shiftplan}
      />
      <OpenModal
          show={Modal}
          DragAndDropRef={DragAndDropRef}
          bewerber={ShiftSlot}
          shiftSlot={ShiftSlot}
          Schichtplan={NewShiftplan}
          shiftplan={Shiftplan}
          Meta={Meta}
          employees={ShiftEmployees}
          changeNotice={changeNotice}
          userInput={userInput} 
          checkTrue={getModalTrue}
          checkModalKey={getModalKey}
          handleSelectPrio={handleSelectPrio}
          startAlg = {handleStartAlg}
          handleCalendarAddShift={handleCalendarAddShift}
          onSave={handleNewShiftPlanSave}
          onHandleActiveInactiveShift={handleActiveInactiveShift}
          handlePrio={handlePrioShiftToDB}
          handleChangeNotice={handleChangeNotice}
          onDelete={handleDeleteShiftPlan}
          handleSetTenantInShift={handleSetTenantInShift}
          handleRemoveTenantFromShift={handleRemoveTenantFromShift}
          handleLoeschen={handleDeleteShift}
          handleCalendarDeleteShift={handleCalendarDeleteShift}
          handleCalendarShiftChanges={handleCalendarShiftChanges}
          onSaveHinzufuegen={handleAddShift}
          selectBewerber={handleSetApplicant}
          onUpdate={handleReleaseForApplication}
          onSaveBearbeiten={handleEditShiftDetails}
          handleUpdate={handleUpdatedShiftPlanToDB}
          handleSchichtBearbeiten={handleEditShiftDetails}
          handleResetShiftNotice={handleResetShiftNotice}
          ></OpenModal>
  </>
  }
    </>
    )
  };

  function show() {
    if(isReloading) return (<ReloadView/>)
    else return (showMain())
  }
        return(
          <>
            <div className="main-content mt-9 px-4" ref={mainContent}>
                  {show()}
            </div>
            <InfoSidebar
              sidebarInfo={SidebarInfo}/>
            </>
            );
        }
export default ShiftplanContainer;
