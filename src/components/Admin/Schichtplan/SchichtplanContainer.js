import React, {useState, useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import 'moment/locale/de';
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
  } from "reactstrap";

import NotificationAlert from "react-notification-alert";
import Joyride from 'react-joyride';
import shiftplanStates from "../../Application/defaults/ShiftplanDefault";
import Nav from "./Nav/Nav";
import { Spinner } from "reactstrap";
import OpenModal from "./Modal/OpenModal";
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import NewShiftPlan from "./processing/NewShiftplan";
import ShiftPlan from "./processing/Shiftplan";
import { deleteShiftFromNewShiftPlan } from "./processing/handleDeleteShift";
import { setPrioShift, setNewPrioShift } from "./processing/handlePrio";
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan";
import { user } from "../../../store/middleware/user";
import { thunkUploadShiftPlanToDB } from "../../../store/middleware/UploadShiftPlanToDB";
import { thunkDeleteShiftPlan } from "../../../store/middleware/DeleteShiftPlan";
import { refractorEmployees } from "./processing/GetShiftCount";
import { thunkStartAlg } from "../../../store/middleware/StartAlg";
//import { thunkReleaseForApplication } from "../../../store/middleware/ReleaseForApplication";
import { setApplicantsInShiftPlan } from "./processing/handleUpdateSetApplicants";
import { checkShiftHasDetails, handleApplication } from "./processing/handleReleaseForApplication";
import ModalOpenButton from "./FormElements/ModalOpenButton";
import ButtonSaveUpdate from "./FormElements/ButtonSaveUpdate";
import ButtonZurueck from "./FormElements/ButtonZurueck";
import NeuerSchichtplanButton from "./FormElements/NeuerSchichtplanButton";
import ButtonUpdateShiftPlan from "./FormElements/ButtonUpdateShiftPlan";
import SetTradeShift from "../../Application/functionalComponents/setTradeShift";
import SchichtplanImport from "./Form/SchichtplanImport";
import store from "../../../store";
import { thunkPublishShiftPlan } from "../../../store/middleware/PublishShiftPlan";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import { WARNING_MISSING_SHIFT_DETAILS, WARNING_MISSING_SHIFT_POSITION } from "../../../constants/Alerts";
import ImportSchichtplanTabelle from "./Schichtplan/ImportSchichtplanTabelle";
import NeuerSchichtplanTabelle from "./Schichtplan/NeuerSchichtplanTabelle";
import { thunkReleaseForApplication } from "../../../store/middleware/ReleaseForApplication";
import InfoSidebar from "../../Sidebar/InfoSidebar";
import ModalFreigebenButton from "./FormElements/ModalFreigebenButton";
import ModalAlgButton from "./FormElements/ModalAlgButton";
import { ONBOARDING_SHIFTPLAN_VORLAGE_ERSTELLEN, ONBOARDING_SHIFTPLAN_VORLAGE, ONBOARDING_SHIFTPLAN_EINTRAGEN, ONBOARDING_SHIFTPLAN_UEBERPRUEFUNG, ONBOARDING_SHIFTPLAN_VEROEFFENTLICHUNG } from "../../../constants/OnBoardingTexts"
const SchichtplanContainer = () => {
  const [userInput, setUserInput] = useState();
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
        title: "Einleitung"
      },
      {
        target: '.nav_vorlage',
        content: ONBOARDING_SHIFTPLAN_VORLAGE,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Einleitung"
      },
      {
        target: '.nav_eintragen',
        content: ONBOARDING_SHIFTPLAN_EINTRAGEN,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Einleitung"
      },
      {
        target: '.nav_ueberpruefen',
        content: ONBOARDING_SHIFTPLAN_UEBERPRUEFUNG,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Einleitung"
      },
      {
        target: '.nav_veroeffentlichen',
        content: ONBOARDING_SHIFTPLAN_VEROEFFENTLICHUNG,
        locale: { 
          next: <strong aria-label="skip">Nächster Schritt</strong>,
          back: <strong aria-label="skip">Zurück</strong>,
          last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>
         },
        title: "Einleitung"
      }
    ]
  });
  let notificationAlert = useRef(null)
  const location = useLocation();
  const { run, steps } = state;

  const selectMeta = state => state.Meta;
  const selectEmployees = state => state.DB.employees;
  const selectDate = state => state.date;
  const selectShiftplan = state => state.Shiftplan;
  const selectNewDate = state => state.date.start;
  const selectCurrentShiftPlan = state => state.currentShiftPlan;
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive;
  const selectShiftPlanIsImported = state => state.visibility.ShiftPlanIsImported;
  const selectPlans = state => state.DB.plans;
  const selectShiftSlot = state => state.shiftSlot;
  const selectNewShiftplan = state => state.newShiftPlan;
  const selectModal = state => state.modal;
  const selectLoadingAlg = state => state.loadings.isFetchingAlg;
  const selectLoadingPublish = state => state.loadings.isFetchingPublish;
  const selectLoadingFetchingPlans = state => state.loadings.isFetchingPlansFromDB;
  const selectLoadingFetchingSafe = state => state.loadings.isFetchingSafe;
  const selectLoadingFetchingRelease = state => state.loadings.isFetchingRelease;
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Employees = useSelector(selectEmployees);
  const Date = useSelector(selectDate);
  const NewDate = useSelector(selectNewDate);
  const Shiftplan = useSelector(selectShiftplan);
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive);
  const currentShiftPlan = useSelector(selectCurrentShiftPlan);
  const ShiftPlanIsImported = useSelector(selectShiftPlanIsImported);
  const Plans = useSelector(selectPlans);
  const ShiftSlot = useSelector(selectShiftSlot);
  const NewShiftplan = useSelector(selectNewShiftplan);
  const Modal = useSelector(selectModal);
  const LoadingAlg = useSelector(selectLoadingAlg);
  const LoadingPublish = useSelector(selectLoadingPublish);
  const LoadingFetchingPlans = useSelector(selectLoadingFetchingPlans);
  const LoadingFetchingSafe = useSelector(selectLoadingFetchingSafe);
  const LoadingFetchingRelease = useSelector(selectLoadingFetchingRelease);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);

  useEffect(() => {
    store.dispatch({ type: "ResetCurrentShiftPlan"});
    store.dispatch({ type: "resetShiftplan"});
    store.dispatch({ type: "stopShiftPlanIsImported"});
    store.dispatch({ type: "stopShiftPlanIsActive"})
    store.dispatch({type: "resetShiftplanChanged"})
    store.dispatch(FetchFromDB);
    store.dispatch(FetchOrg);
    store.dispatch(user);
    store.dispatch(FetchEmployees);
    }, []);

  useEffect(() => {
    if(currentShiftPlan && Employees && Plans) {
      const employees = refractorEmployees(Employees, Plans[currentShiftPlan].plan);
      setShiftEmployees(employees);
    }
  }, [Employees, Plans, currentShiftPlan]);

  useEffect(() => {
  }, [currentShiftPlan]);

  useEffect(() => {
  }, [Shiftplan]);

  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
    if (Meta) {
    setUserInput({...shiftplanStates, position: Meta.schichten[0]})
      let showShfitplan = Meta.onboarding.shiftplan
      setState({...state, run: showShfitplan})
    }
  }, [Meta]);

  useEffect(() => {
  }, [userInput]);


  useEffect(() => {
  }, [navIndex]);


  useEffect(() => {
    console.log('Location changed');
  }, [location]);

  const handleNavChange = (index) => {
    setNavIndex(index);
  };

  const handleOnboarding = () => {
    let shiftplan = Meta.onboarding.shiftplan;
    let meta = Meta;
    meta.onboarding.shiftplan = !shiftplan;
    store.dispatch(thunkUpdateProfile(meta));
  }

  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setUserInput({...userInput, [key]: val });
  };

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
    store.dispatch({ type: "setNewShiftplan", payload: shiftplan });
    store.dispatch({ type: "setShiftPlanIsActive" });
    store.dispatch({ type: "stopShiftPlanIsImported" });
    store.dispatch({type: "CLOSE", payload: modal});
  };

  const handleCompanyIsClosed = (day) => {
    if (userInput === null) {
    setUserInput({...userInput, [day]: !0 });
    } else if (userInput[day] === undefined ) {
      setUserInput({...userInput, [day]: !0 });
    } else if ( userInput[day] ) {
      delete userInput[day]
      setUserInput({...userInput});
    }
  }

  const handleSelectPrio = (qualifikation) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if(isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      copyPlan.setPrio(ShiftSlot, qualifikation);
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({type: "setNewShiftplan", payload: shiftplan});
    } else {
    let copyPlan = new ShiftPlan({...Shiftplan})
    copyPlan.setPrio(ShiftSlot, qualifikation);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    }
    }

  const handleSetApplicant = (modal, updateApplicant) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.changeNotice(userInput, ShiftSlot)
    copyPlan.adminSetApplicant(updateApplicant.current, ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    store.dispatch({type: "CLOSE", payload: modal});
    setChangeNotice(!1);
    store.dispatch({type: "setShiftplanChanged"})
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
  // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter)
  const handleEditShiftDetails = (index) => {
    if (ShiftPlanIsImported) {
      let copyPlan = new ShiftPlan({...Shiftplan})
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          store.dispatch({type: "CLOSE", payload: index});
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } else {
        copyPlan.updateShiftDescription(index, {...userInput, position: Meta.schichten[0]});
        }
      } else {
        if(Meta.schichten.length === 0) {
          store.dispatch({type: "CLOSE", payload: index});
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } 
        copyPlan.updateShiftDescription(index, userInput);
      }
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({type: "setShiftplan", payload: shiftplan});
      setUserInput({...shiftplanStates})
    } else {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          store.dispatch({type: "CLOSE", payload: index});
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        }
      } else {
        copyPlan.updateShiftDescription(index, userInput);
      }
      copyPlan.updateShiftDescription(index, userInput);
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({type: "setNewShiftplan", payload: shiftplan});
    }
    setUserInput(shiftplanStates);
    store.dispatch({type: "CLOSE", payload: index});
  };

  const handleActiveShift = () => {
    let copyPlan = new ShiftPlan({...NewShiftplan});
    copyPlan.shiftIsActive(ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    store.dispatch({type: "setShiftplanChanged"});
    }

  const handleActiveInactiveShift = (index) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if(isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      copyPlan.shiftIsActive(ShiftSlot);
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({type: "setNewShiftplan", payload: shiftplan});
      store.dispatch({type: "CLOSE", payload: index});
    } else {
    let copyPlan = new ShiftPlan({...Shiftplan})
    copyPlan.shiftIsActive(ShiftSlot);
    let shiftplan = copyPlan.getAllPlanDetails()
    store.dispatch({type: "setShiftplan", payload: shiftplan});
    store.dispatch({type: "CLOSE", payload: index});
    store.dispatch({type: "setShiftplanChanged"});
    }
    }



  //Dise Funktion sorgt für das Hinzufügen einer neuen Schicht zum jeweiligen Schichtplan
  const handleAddShift = (index) => {
    if (ShiftPlanIsImported) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {
          store.dispatch({type: "CLOSE", payload: index});
          setErrMsng({...ErrMsng, MissingShiftPosition: !0});
        } else {
          copyPlan.addNewShiftToPlan({...userInput, position: Meta.schichten[0]});
        }
      } else {
        copyPlan.addNewShiftToPlan(userInput);
      }
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({ type: "setShiftplan", payload: shiftplan });
      setUserInput(shiftplanStates)
    } else {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.addNewShiftToPlan(userInput);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({ type: "setNewShiftplan", payload: shiftplan });
      setUserInput(shiftplanStates)
    }
    setUserInput(shiftplanStates)
    store.dispatch({type: "CLOSE", payload: index});
    store.dispatch({type: "setShiftplanChanged"});
  };

  //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
  const handlePrioShiftToDB = (modal) => {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if (isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.changeNotice(userInput, ShiftSlot);
      copyPlan.getAllPlanDetails();
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({ type: "setNewShiftplan", payload: shiftplan });
    } else {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.changeNotice(userInput, ShiftSlot);
      copyPlan.getAllPlanDetails();
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({ type: "setShiftplan", payload: shiftplan });
      store.dispatch({type: "setShiftplanChanged"});
    }
    store.dispatch({type: "ResetShiftSlot"});
    setUserInput(shiftplanStates);
    store.dispatch({type: "CLOSE", payload: modal});
  };

  function handleResetShiftNotice(modal) {
    let isNewShiftplan = typeof NewShiftplan === "object";
    if (isNewShiftplan) {
      let copyPlan = new ShiftPlan({...NewShiftplan});
      copyPlan.resetNotice(ShiftSlot);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({ type: "setNewShiftplan", payload: shiftplan });
    } else {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.resetNotice(ShiftSlot);
      copyPlan.getAllPlanDetails()
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({ type: "setShiftplan", payload: shiftplan });
      store.dispatch({type: "setShiftplanChanged"});
    }
    setUserInput(shiftplanStates);
  }

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let isVorlage = Shiftplan.id.split("#").includes("Entwurf")
      if (isVorlage) {
        copyShiftplan.changeShiftsOrder(ShiftSwitch);
        let shiftplan = copyShiftplan.getAllPlanDetails();
        store.dispatch({type: "isFetchPlansFromDB"});
        store.dispatch(thunkUpdateShiftPlan(shiftplan, !0));
      } else {
        let shiftplan = copyShiftplan.getAllPlanDetails();
        store.dispatch({type: "isFetchPlansFromDB"});
        store.dispatch(thunkUpdateShiftPlan(shiftplan, !0));
      }
      store.dispatch({type: "CLOSE"});
  };

  function onClickBack () {
    if (ShiftplanChanged) {
      store.dispatch({type: "OPEN", payload: "saveChanges"});
    } else {
        store.dispatch({ type: "ResetCurrentShiftPlan"})
        store.dispatch({ type: "resetShiftplan"})
        store.dispatch({ type: "ResetShiftSlot"})
        store.dispatch({ type: "resetShiftplanChanged"})
        store.dispatch({ type: "stopShiftPlanIsActive"})
        store.dispatch({ type: "stopShiftPlanIsImported"})
    }
  }

  function onClickFreigeben (modal) {
    if (ShiftplanChanged) {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let shiftplan = copyShiftplan.getAllPlanDetails();
      store.dispatch({type: "isFetchPlansFromDB"});
      store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
      store.dispatch({type: "OPEN", payload: modal})
      store.dispatch({type: "resetShiftplanChanged"})
    } else {
      store.dispatch({type: "OPEN", payload: modal})
    }
  }

  function onClickStartAlg (modal) {
    if (ShiftplanChanged) {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      let shiftplan = copyShiftplan.getAllPlanDetails();
      store.dispatch({type: "isFetchPlansFromDB"});
      store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
      store.dispatch({type: "OPEN", payload: modal})
      store.dispatch({type: "resetShiftplanChanged"})
    } else {
      store.dispatch({type: "OPEN", payload: modal})
    }
  }
  //Diese Funktion fürgt einen neu erstelten Schichtplan der Datenbank hinzu
  const handleUploadShiftPlanToDB = () => {
    let copyNewPlan = new ShiftPlan(NewShiftplan);
    let shiftplan = copyNewPlan.getAllPlanDetails()
    store.dispatch({type: "startFetchingSafe"});
    store.dispatch(thunkUploadShiftPlanToDB(shiftplan));
    setUserInput(shiftplanStates);
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
  };
  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleCancelShiftTradeToDB = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setDeclineShiftTrade(index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateShiftPlan(shiftplan, !1));
  };
  //Diese Funktion löscht eine ausgewählte Schicht innerhalb eines ausgewählten Schichtplans
  const handleDeleteShift = (index) => {
    if (ShiftPlanIsImported) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.deleteShift(index)
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({ type: "setShiftplan", payload: shiftplan });
      store.dispatch({type: "setShiftplanChanged"})
    } else {
      deleteShiftFromNewShiftPlan({index, NewShiftplan});
    }
      store.dispatch({type: "CLOSE", payload: index});
  };
  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    if (ShiftplanChanged) {
      store.dispatch({type: "OPEN", payload: "saveChanges"});
      store.dispatch({type: "resetShiftplanChanged"})
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
    if (detailsFilled) {
      store.dispatch({type: "startFetchingRelease"})
      store.dispatch(thunkReleaseForApplication(shiftplan, NewDate, userInput))
      setNavIndex(2);
    } else {
      setErrMsng({...ErrMsng, MissingShiftDetails: !0});
    }
    store.dispatch({type: "CLOSE", payload: modal});
    setUserInput(shiftplanStates);
  };

  const handleStartAlg = (modal) => {
      store.dispatch({type: "startFetchingAlg"});
      const id = Plans[currentShiftPlan].id;
      store.dispatch(thunkStartAlg(id));
      setNavIndex(3)
      store.dispatch({type: "CLOSE", payload: modal});
  };

        return(
        <>
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
          bearbeiten={ShiftPlanIsActive}
          onNavChange={handleNavChange}
          navIndex={navIndex}
          ></Nav>
      <Row className="mt-6">
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>
      <Col xs={2} className="mt-4">
      <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
      { LoadingAlg ? <Spinner color="success" /> : <></>}
      { LoadingPublish ? <Spinner color="success" /> : <></>}
      { LoadingFetchingPlans ? <Spinner color="success" /> : <></>}
      { LoadingFetchingSafe ? <Spinner color="success" /> : <></>}
      { LoadingFetchingRelease ? <Spinner color="success" /> : <></>}
      </Col>
      <Col xs={10} className="mt-2 mr-0">
      <ButtonSaveUpdate
          ShiftplanChanged={ShiftplanChanged}
          handleUpdate={handleUpdatedShiftPlanToDB}
          handleUpload={handleUploadShiftPlanToDB}
          trigger={ShiftPlanIsActive}
          import={ShiftPlanIsImported}/>
          <ModalFreigebenButton
            shiftplan={Shiftplan}
            title="Schichtplan freigeben"
            trigger={"Entwurf"}
            onClick={onClickFreigeben}
            modal="showSchichtplanFreigeben"/>
          <ModalOpenButton
            shiftplan={Shiftplan}
            title="Schicht hinzufügen"
            trigger={"Entwurf"}
            modal="showSchichthinzufuegen"/>
          <ModalAlgButton
            shiftplan={Shiftplan}
            title="Befüllung starten"
            trigger={"Freigeben"}
            onClick={onClickStartAlg}
            modal="showBefuellungStarten"/>
          <ButtonUpdateShiftPlan
            shiftplan={Shiftplan}
            title="Schichtplan veröffentlichen"
            trigger={"Review"}
            onClick={handlePublishShiftPlan}
            />
      <NeuerSchichtplanButton
          title="Vorlage erstellen"
          modal="showSchichtplanErstellen"
          navIndex={navIndex}
          trigger={!ShiftPlanIsActive}>
          </NeuerSchichtplanButton>
      <ButtonZurueck
        titel="Zurück zur Auswahl"
        onClickVal={onClickBack}
        true={ShiftPlanIsActive}
        ></ButtonZurueck>
      </Col>
      </Row>
      <Row>
          <div className="col">
               <ImportSchichtplanTabelle 
               bearbeiten={ShiftPlanIsActive}
               shiftplan={Shiftplan}
               plans={Plans}
               employees={Employees}
               onSwitch={shiftChange}
               handleActive={handleActiveShift}
               Loading={LoadingFetchingPlans}
               import={ShiftPlanIsImported}
               Schichtplan={NewShiftplan}
               ></ImportSchichtplanTabelle>
               <NeuerSchichtplanTabelle 
               bearbeiten={ShiftPlanIsActive}
               shiftplan={Shiftplan}
               plans={Plans}
               employees={Employees}
               onSwitch={shiftChange}
               Loading={LoadingFetchingPlans}
               import={ShiftPlanIsImported}
               handleActive={handleActiveShift}
               Schichtplan={NewShiftplan}
               ></NeuerSchichtplanTabelle> 
              <SchichtplanImport 
                status={navIndex}
                bearbeiten={ShiftPlanIsActive}
                plaene={Plans}
                onSwitch={shiftChange}
                plan={currentShiftPlan}
                import={ShiftPlanIsImported}
                Schichtplan={NewShiftplan}
                onDelete={handleDeleteShiftPlan}
                onChange={handleInputChange}
                onClick={handleUpdateProfile}
                org={Meta}></SchichtplanImport>
          </div>
        </Row>
        <SetTradeShift
        onTradeSubmit={handleShiftTradeToDB}
        onCancelSumbit={handleCancelShiftTradeToDB}
        onChange={handleInputChange}
        bearbeiten={ShiftPlanIsActive}
        employees={Employees}
        shiftplan={Shiftplan}
        />
        <OpenModal
            show={Modal}
            bewerber={ShiftSlot}
            shiftSlot={ShiftSlot}
            Schichtplan={NewShiftplan}
            shiftplan={Shiftplan}
            Meta={Meta}
            employees={ShiftEmployees}
            changeNotice={changeNotice}
            import={ShiftPlanIsImported}
            userInput={userInput} 
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            handleSelectPrio={handleSelectPrio}
            startAlg = {handleStartAlg}
            onCompanyClosed={handleCompanyIsClosed}
            onChange={handleInputChange}
            onSave={handleNewShiftPlanSave}
            onHandleActiveInactiveShift={handleActiveInactiveShift}
            handlePrio={handlePrioShiftToDB}
            handleChangeNotice={handleChangeNotice}
            onDelete={handleDeleteShiftPlan}
            handleLoeschen={handleDeleteShift}
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
      <InfoSidebar
      sidebarInfo={SidebarInfo}/>
    </>
            );
        }
export default SchichtplanContainer;
