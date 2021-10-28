import React, {useState, useEffect, useRef} from "react";
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
import SchichtplanAuswahl from "./Schichtplan/SchichtplanAuswahl";
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
import { WARNING_MISSING_SHIFT_DETAILS } from "../../../constants/Alerts";

const SchichtplanContainer = () => {
  const [userInput, setUserInput] = useState();
  const [navIndex, setNavIndex] = useState(1);
  const [ShiftEmployees, setShiftEmployees] = useState(null);
  const [ShiftSwitch, setShiftSwitch] = useState(!1);
  const [ErrMsng, setErrMsng] = useState({MissingShiftDetails: !1});
  let notificationAlert = useRef(null)

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

  useEffect(() => {
    store.dispatch({ type: "ResetCurrentShiftPlan"});
    store.dispatch({ type: "resetShiftplan"});
    store.dispatch({ type: "stopShiftPlanIsImported"});
    store.dispatch({ type: "stopShiftPlanIsActive"})
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
    if (Meta)
    setUserInput({...shiftplanStates, position: Meta.schichten[0]})
  }, [Meta]);

  useEffect(() => {
  }, [userInput]);


  useEffect(() => {
  }, [navIndex]);

  const handleNavChange = (index) => {
    setNavIndex(index);
  };

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
    let hasuserInput = userInput !== null
    let hasQualifikation = hasuserInput && userInput.qualifikation !== null ? !0 : !1;
    if (hasQualifikation && userInput.qualifikation === qualifikation) {
      delete userInput.qualifikation
      setUserInput({...userInput})
    } else {
      setUserInput({...userInput, qualifikation: qualifikation });
    }
  }

  const handleSetApplicant = (modal, updateApplicant) => {
    console.log("try set")
    setApplicantsInShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal});
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

        } else {
        copyPlan.updateShiftDescription(index, {...userInput, position: Meta.schichten[0]});
        }
      } else {
        copyPlan.updateShiftDescription(index, userInput);
      }
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({type: "setShiftplan", payload: shiftplan});
      setUserInput(shiftplanStates)
    } else {
      let copyPlan = new ShiftPlan({...NewShiftplan})
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {

        } else {
        copyPlan.updateShiftDescription(index, {...userInput, position: Meta.schichten[0]});
        }
      } else {
        copyPlan.updateShiftDescription(index, userInput);
      }
      copyPlan.updateShiftDescription(index, userInput);
      let shiftplan = copyPlan.getAllPlanDetails()
      store.dispatch({type: "setNewShiftplan", payload: shiftplan});
    }
    store.dispatch({type: "CLOSE", payload: index});
  };

  //Dise Funktion sorgt für das Hinzufügen einer neuen Schicht zum jeweiligen Schichtplan
  const handleAddShift = (index) => {
    if (ShiftPlanIsImported) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      if(!("position" in userInput)) {
        if(Meta.schichten.length === 0) {

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
    store.dispatch({type: "CLOSE", payload: index});
  };

  //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
  const handlePrioShiftToDB = (modal) => {
    if (NewShiftplan) {
      setNewPrioShift({NewShiftplan, ShiftSlot, userInput});
    } else {
      setPrioShift({Plans, ShiftSlot, currentShiftPlan, userInput});
    }
    store.dispatch(thunkUpdateShiftPlan);
    store.dispatch({type: "ResetShiftSlot"})
    setUserInput(null);
    store.dispatch({type: "CLOSE", payload: modal});
  };

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
      let copyShiftplan = new ShiftPlan({...Shiftplan});
      if (ShiftSwitch !== !1) {
        copyShiftplan.changeShiftsOrder(ShiftSwitch);
        let shiftplan = copyShiftplan.getAllPlanDetails();
        store.dispatch({type: "isFetchPlansFromDB"});
        store.dispatch(thunkUpdateShiftPlan(shiftplan));
      } else {
        store.dispatch(thunkUpdateShiftPlan(Shiftplan));
      }
      if ("saveChanges" in Modal) {
        store.dispatch({type: "CLOSE", payload: "saveChanges"});
      }
  };

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
  //Diese Funktion fürgt einen neu erstelten Schichtplan der Datenbank hinzu
  const handleUploadShiftPlanToDB = () => {
    let copyNewPlan = new ShiftPlan(NewShiftplan);
    let shiftplan = copyNewPlan.getAllPlanDetails()
    store.dispatch({type: "startFetchingSafe"});
    store.dispatch(thunkUploadShiftPlanToDB(shiftplan));
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
    store.dispatch(thunkUpdateShiftPlan(shiftplan));
  };
  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleCancelShiftTradeToDB = (index) => {
    let copyPlan = new ShiftPlan({...Shiftplan});
    copyPlan.setDeclineShiftTrade(index);
    let shiftplan = copyPlan.getAllPlanDetails();
    store.dispatch(thunkUpdateShiftPlan(shiftplan));
  };
  //Diese Funktion löscht eine ausgewählte Schicht innerhalb eines ausgewählten Schichtplans
  const handleDeleteShift = (index) => {
    if (ShiftPlanIsImported) {
      let copyPlan = new ShiftPlan({...Shiftplan});
      copyPlan.deleteShift(index)
      let shiftplan = copyPlan.getAllPlanDetails();
      store.dispatch({ type: "setShiftplan", payload: shiftplan });
    } else {
      deleteShiftFromNewShiftPlan({index, NewShiftplan});
    }
      store.dispatch({type: "CLOSE", payload: index});
  };
  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    store.dispatch({type: "startFetchingPublish"});
    store.dispatch(thunkPublishShiftPlan(Plans[currentShiftPlan]));
    setNavIndex(4);
  };

  const handleReleaseForApplication = (modal) => {
    let shiftDetailsFilled = checkShiftHasDetails(Plans, currentShiftPlan)
    if (shiftDetailsFilled) {
    store.dispatch({type: "startFetchingRelease"})
    handleApplication(Plans, currentShiftPlan, NewDate);
    setNavIndex(2);
    } else {
      setErrMsng({...ErrMsng, MissingShiftDetails: !0});
    }

    store.dispatch({type: "CLOSE", payload: modal});
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
      { !ShiftPlanIsActive ?
        <Nav
          onNavChange={handleNavChange}
          navIndex={navIndex}
          ></Nav>
        :
        <></>
      }
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
      <Col xs={10} className="mt-2">
      <ButtonSaveUpdate
          handleUpdate={handleUpdatedShiftPlanToDB}
          handleUpload={handleUploadShiftPlanToDB}
          trigger={ShiftPlanIsActive}
          import={ShiftPlanIsImported}/>
      {Shiftplan ?
        <>
          <ModalOpenButton
            title="Schichtplan freigeben"
            trigger={Shiftplan.id.split("#").includes("Entwurf")}
            modal="showSchichtplanFreigeben"/>
          <ModalOpenButton
            title="Schicht hinzufügen"
            trigger={Shiftplan.id.split("#").includes("Entwurf")}
            modal="showSchichthinzufuegen"/>
          <ModalOpenButton
            title="Befüllung starten"
            trigger={Shiftplan.id.split("#").includes("Freigeben")}
            modal="showBefuellungStarten"/>
          <ButtonUpdateShiftPlan
            title="Schichtplan veröffentlichen"
            trigger={Shiftplan.id.split("#").includes("Review")}
            onClick={handlePublishShiftPlan}
            />
        </>
        :
        <></>
        }
      <NeuerSchichtplanButton
          title="neuen Schichtplan erstellen"
          modal="showSchichtplanErstellen"
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
        {Plans && Employees ?
          <div className="col">
              {ShiftPlanIsActive ? 
                <SchichtplanAuswahl
                  bearbeiten={ShiftPlanIsActive}
                  shiftplan={Shiftplan}
                  employees={Employees}
                  onSwitch={shiftChange}
                  Loading={LoadingFetchingPlans}
                  import={ShiftPlanIsImported}
                  Schichtplan={NewShiftplan}
                 />
                 :
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
              }
          </div>
          :
          <></>
            }
        </Row>
        {ShiftPlanIsActive && Shiftplan !== !1 && Shiftplan.tauschanfrage.length > 0 ?
        <Row className="mt-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Tauschanfragen</h3>
              </CardHeader>
              <CardBody>
                <SetTradeShift
                onTradeSubmit={handleShiftTradeToDB}
                onCancelSumbit={handleCancelShiftTradeToDB}
                onChange={handleInputChange}
                employees={Employees}
                shiftplan={Shiftplan}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
        :
        <></>
        }
        <OpenModal
            show={Modal}
            bewerber={ShiftSlot}
            shiftSlot={ShiftSlot}
            Schichtplan={NewShiftplan}
            shiftplan={Shiftplan}
            Meta={Meta}
            employees={ShiftEmployees}
            import={ShiftPlanIsImported}
            userInput={userInput} 
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            handleSelectPrio={handleSelectPrio}
            startAlg = {handleStartAlg}
            onCompanyClosed={handleCompanyIsClosed}
            onChange={handleInputChange}
            onSave={handleNewShiftPlanSave}
            handlePrio={handlePrioShiftToDB}
            onDelete={handleDeleteShiftPlan}
            handleLoeschen={handleDeleteShift}
            onSaveHinzufuegen={handleAddShift}
            selectBewerber={handleSetApplicant}
            onUpdate={handleReleaseForApplication}
            onSaveBearbeiten={handleEditShiftDetails}
            handleUpdate={handleUpdatedShiftPlanToDB}
            handleSchichtBearbeiten={handleEditShiftDetails}
            ></OpenModal>
    </>
    }
    </>
            );
        }
export default SchichtplanContainer;
