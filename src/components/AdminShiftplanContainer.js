import React, {useState, useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import 'moment/locale/de';
import {
    Row,
    Col,
    Button,
  } from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import NotificationAlert from "react-notification-alert";
import Joyride from 'react-joyride';
import Nav from "./AdminShiftplanNav";
import { Spinner } from "reactstrap";
import OpenModal from "./OpenModal";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
import { thunkUpdateShiftPlan } from "../store/middleware/UpdateShiftPlan";
import { user } from "../store/middleware/user";
import { thunkUploadShiftPlanToDB } from "../store/middleware/UploadShiftPlanToDB";
import SetTradeShift from "./CardTradeShift";
import SchichtplanImport from "./FormImportedShiftplans";
import store from "../store";
import { thunkPublishShiftPlan } from "../store/middleware/PublishShiftPlan";
import { thunkFetchEmployees } from "../store/middleware/FetchEmployees";
import { SUCCESS_FILLING_DONE, SUCCESS_RELEASE_DONE, WARNING_MISSING_SHIFT_DETAILS, WARNING_MISSING_SHIFT_POSITION } from "../constants/Alerts";
import ImportSchichtplanTabelle from "./ShiftplansTable";
import NeuerSchichtplanTabelle from "./NewShiftplan";
import InfoSidebar from "./Sidebar/InfoSidebar";
import { ONBOARDING_SHIFTPLAN_VORLAGE_ERSTELLEN, ONBOARDING_SHIFTPLAN_VORLAGE, ONBOARDING_SHIFTPLAN_EINTRAGEN, ONBOARDING_SHIFTPLAN_UEBERPRUEFUNG, ONBOARDING_SHIFTPLAN_VEROEFFENTLICHUNG } from "../constants/OnBoardingTexts"
import CalendarView from "./CalenderView";
import _ from "lodash";
import { resettingUserInput, settingCompanyPositions } from "../reducers/userInput";
import { resettingShiftplan, settingShiftplan} from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingBasicLayout, resettingCalendarLayout, resettingDisplayNewShiftplan, resettingDisplayShiftplan, settingBasicLayout, settingCalendarLayout, settingDisplayShiftplan } from "../reducers/display";
import { resettingShiftplanChanged } from "../reducers/shiftplanChanged";
import { resettingShiftSlot } from "../reducers/ShiftSlot";
import { resettingEmployeesDummyshifts } from "../reducers/DB";
import { settingOnboardingShiftplan } from "../reducers/Meta";
import { resettingSuccessMessages } from "../reducers/SuccessMessages";
import { thunkFetchAllShiftplans } from "../store/middleware/FetchPlansFromDB";
import { thunkDeleteShiftPlan } from "../store/middleware/DeleteShiftPlan";
import { resettingDeleteShiftplanID, resettingRemindShiftplanID } from "../reducers/temporary";

const ShiftplanContainer = () => {
  const dispatch = useDispatch();
  const [navIndex, setNavIndex] = useState(1);
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
  const { run, steps } = state;

  const selectMeta = state => state.Meta;
  const selectShiftplan = state => state.Shiftplan;
  const selectNewShiftplan = state => state.newShiftPlan;
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged.shiftplanChanged;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const Shiftplan = useSelector(selectShiftplan);
  const NewShiftplan = useSelector(selectNewShiftplan);
  const FetchingPlans = useSelector(state => state.DB.plansStatus === "loading");
  const SidebarInfo = useSelector(selectInfoSidebar);
  const Plans = useSelector(state => state.DB.plans);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);
  const OnboardingShiftplan = useSelector(state => state.Meta.onboarding.shiftplan);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const DisplayNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
  const DisplayBasicLayout = useSelector(state => state.display.displayBasicLayout);
  const DisplayCalendarLayout = useSelector(state => state.display.displayCalendarLayout);
  const SuccessMessagesKey = useSelector(state => Object.keys(state.successMessage).find(key => state.successMessage[key] === true));
  const SuccessMessageShow = useSelector(state => Object.values(state.successMessage).includes(true));
  const ProcessingKeyRejected = useSelector(state => Object.keys(state.processing).find(key => state.processing[key] === "rejected"));
  const ProcessingKeyLoading = useSelector(state => Object.keys(state.processing).find(key => state.processing[key] === "loading"));
  const ProcessingShowRejected = useSelector(state => Object.values(state.processing).includes("rejected"));
  const ProcessingShowLoading = useSelector(state => Object.values(state.processing).includes("loading"));
  const TemporaryDeleteShiftplanId = useSelector(state => state.temporary.deleteShiftplanId);
  const TemporaryRemindedShiftplanId = useSelector(state => state.temporary.shiftplanId);

  const AltertSuccessMessages = {
    reportInProgress: false,
    employeeCreated: false,
    emailSend: false,
    shiftplanReleased: SUCCESS_RELEASE_DONE,
    shiftplanPublished: false,
    shiftplanFilled: SUCCESS_FILLING_DONE,
    employeeChanged: false,
  }
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    }, []);


  useEffect(() => {
    if (_.isObject(Meta)) {
      dispatch(settingCompanyPositions([...Meta.schichten]))
      setState({...state, run: OnboardingShiftplan})
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
    dispatch(
      thunkUpdateProfile(
        {
          ...Meta,
          onboarding: {
            ...Meta.onboarding,
            shiftplan: false
          }
        }
      )
    );
  }

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
    dispatch(resettingSuccessMessages());
    setErrMsng({...ErrMsng, [err]: !1})

  };

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
      dispatch(resettingEmployeesDummyshifts())
      dispatch(thunkUpdateShiftPlan(Shiftplan));
      dispatch(resettingModal())
  };

  function onClickBack () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingDisplayShiftplan());
      dispatch(resettingDisplayNewShiftplan());
    } 
    if(!ShiftplanChanged) {
      dispatch(resettingCurrentShiftplanIndex())
      dispatch(resettingShiftplan())
      dispatch(resettingShiftSlot())
      dispatch(resettingEmployeesDummyshifts())
      dispatch(resettingShiftplanChanged())
      dispatch(resettingDisplayShiftplan());
      dispatch(resettingDisplayNewShiftplan());
    }
  }

  function onClickFreigeben () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingShiftplanChanged())
    } 

    if(!ShiftplanChanged) {
      dispatch(settingModal("showSchichtplanFreigeben"))
      dispatch(resettingShiftplanChanged())
    }
  }

  function onClickStartAlg () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingShiftplanChanged())
    } 

    if(!ShiftplanChanged) {
      dispatch(settingModal("showBefuellungStarten"))
      dispatch(resettingShiftplanChanged())
    }
  }
  //Diese Funktion fürgt einen neu erstelten Schichtplan der Datenbank hinzu
  const handleUploadShiftPlanToDB = () => {
    dispatch(thunkUploadShiftPlanToDB(NewShiftplan));
    dispatch(resettingUserInput())
  };

  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
      dispatch(resettingShiftplanChanged())
    }

    if(!ShiftplanChanged) {
      dispatch(thunkPublishShiftPlan(Shiftplan));
      setNavIndex(4);
    }
  };


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  function showMain() {
    return (
      <>
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
    { ErrMsng.MissingShiftDetails ? Notify("warning", WARNING_MISSING_SHIFT_DETAILS, "MissingShiftDetails") : null}
    { ErrMsng.ShiftDetailsNotUpToDate ? Notify("warning", WARNING_MISSING_SHIFT_DETAILS, "ShiftDetailsNotUpToDate") : null}
    { ErrMsng.MissingShiftPosition ? Notify("warning", WARNING_MISSING_SHIFT_POSITION, "MissingShiftPosition") : null}
     <ReactBSAlert
      show={SuccessMessageShow}
      type='success'
      title="Abgeschlossen"
      confirmBtnText="Zum Schichtplan"
      confirmBtnCssClass="success"
      onConfirm={() => {
        dispatch(resettingSuccessMessages());
        const shiftplanIndex = Plans.findIndex(plan => plan.id === TemporaryRemindedShiftplanId);
        dispatch(settingShiftplan(Plans[shiftplanIndex]));
        dispatch(settingDisplayShiftplan());
      }}
      showCancel
      cancelBtnText="Zur Übersicht"
      onCancel={() => {
        dispatch(resettingSuccessMessages());
        dispatch(resettingRemindShiftplanID());
      }}
     >
      <Row>
        <Col>
          <p>{AltertSuccessMessages[SuccessMessagesKey]}</p>
        </Col>
      </Row>
      </ReactBSAlert>
      <ReactBSAlert
      show={ProcessingShowRejected}
      type='error'
      title="Ein Fehler ist aufgetreten."
      showConfirm={false}
     >
      <Row>
        <Col>
        </Col>
      </Row>
      </ReactBSAlert>
      <ReactBSAlert
      show={ProcessingShowLoading}
      type='info'
      title="In Bearbeitung"
      showConfirm={false}
     >
      <Row>
        <Col>
          <p>Einen Moment noch</p>
        </Col>
      </Row>
     </ReactBSAlert>
     <ReactBSAlert
      show={TemporaryDeleteShiftplanId !== ""}
      type='warning'
      title="Schichtplan löschen?"
      confirmBtnText="Löschen"
      confirmBtnCssClass="bg-danger border-danger sm"
      onConfirm={() => {
        dispatch(thunkDeleteShiftPlan(TemporaryDeleteShiftplanId));
        dispatch(resettingDeleteShiftplanID())
      }}
      cancelBtnText="Schließen"
      btnSize="sm"
      showCancel
      allowEscape
      closeOnClickOutside
      onCancel={() => dispatch(resettingDeleteShiftplanID())}
     >
      <Row>
        <Col>
          <p>Möchtest du diesen Schichtplan wirklich löschen?</p>
        </Col>
      </Row>
     </ReactBSAlert>
      <Nav
        onNavChange={handleNavChange}
        navIndex={navIndex}
        ></Nav>
    <Row className="text-right">
      <Col>
        <Button 
          hidden={DisplayCalendarLayout}
          color="link"
          onClick={() => {
            dispatch(settingCalendarLayout());
            dispatch(resettingBasicLayout());
          }}
          >
            Kalender
          </Button>
        <Button 
          hidden={DisplayBasicLayout}
          color="link"
          onClick={() => {
            dispatch(settingBasicLayout());
            dispatch(resettingCalendarLayout());
          }}
          >
            Basic
          </Button>
      </Col>
    </Row>
    <Row>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlert} />
      </div>
    
    <Col xs={2} className="mt-4">
    <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
    </Col>
    <Col xs={10} className="mt-2 mr-0">
    <Button 
      color="white"
      size="lg"
      hidden={!DisplayNewShiftplan}
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
      hidden={!Shiftplan.id.split('#').includes("Entwurf")}
      size="lg"
      color="primary"
      onClick={() => onClickFreigeben("showSchichtplanFreigeben")}
      >
        <p className="m-0 text-white">
          Schichtplan freigeben
        </p>
      </Button>
      <Button
      hidden={!Shiftplan.id.split('#').includes("Entwurf")}
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
            hidden={!Shiftplan.id.split('#').includes("Freigeben")}
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
            hidden={!Shiftplan.id.split('#').includes("Review")}
            onClick={() => handlePublishShiftPlan()}
            >
              <p className="m-0 text-white">
                Schichtplan veröffentlichen
              </p>
          </Button>
          <Button
            hidden={(DisplayShiftplan || navIndex !== 1 || DisplayNewShiftplan)}
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
             <ImportSchichtplanTabelle/>
             <NeuerSchichtplanTabelle/> 
            <SchichtplanImport
              status={navIndex}
            />
        </div>
      </Row>
      <SetTradeShift/>
      <Row className="text-center mt-4">
        <Col>
          <Button color="link" hidden={DisplayShiftplan} onClick={() => dispatch(thunkFetchAllShiftplans())}>Alle  Schichtpläne laden</Button>
        </Col>
      </Row>
      <OpenModal
        setNavIndex={setNavIndex}
      />
    </>
    )
  };
        return(
          <>
            <div className="main-content mt-9 px-4" ref={mainContent}>
                  {showMain()}
            </div>
            <InfoSidebar
              sidebarInfo={SidebarInfo}/>
            </>
            );
}
export default ShiftplanContainer;
