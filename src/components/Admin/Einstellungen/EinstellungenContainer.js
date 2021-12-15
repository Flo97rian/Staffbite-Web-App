import React, {useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import {
    Row,
    Col,
    Alert,
  } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Navs from "./FormElements/NavPills";
import Spinner from 'react-bootstrap/Spinner'
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import store from "../../../store";
import InfoSidebar from "../../Sidebar/InfoSidebar";
import Joyride from 'react-joyride';
import {INFO_CREATED_POSITION, SUCCESS_LOADING_META} from "../../../constants/Alerts";
import { ONBOARDING_EINSTELLUNGEN_BETRIEB_NAME, ONBOARDING_EINSTELLUNGEN_POSITIONEN, ONBOARDING_EINSTELLUNGEN_NAV_BETRIEB, ONBOARDING_EINSTELLUNGEN_SHIFTPLAN_REVERSE, ONBOARDING_EINSTELLUNGEN_SHIFTPLAN_ORDER, ONBOARDING_EINSTELLUNGEN_NAV_SHIFTPLAN, ONBOARDING_EINSTELLUNGEN_SPEICHERN } from "../../../constants/OnBoardingTexts"
import { validMeta } from "../../Application/functionalComponents/ValidFunctions";

const EinstellungenContainer = () => {
  const [metaData, setMetaData] = useState(null)
  const [position, setPosition] = useState(null);
  const [showPositionHinzufuegen, setShowPositionHinzufuegen] = useState(!1);
  const [msng, setMsng] = useState({LoadingMeta: !1, createdPosition: !1});
  const [state, setState] = useState({
    run: !1,
    steps: [
      {
        target: '.nav_betrieb',
        locale: { 
          skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
          next: <strong aria-label="skip">Nächster Schritt</strong>
         },
        content: ONBOARDING_EINSTELLUNGEN_NAV_BETRIEB,
        title: "Deine Einstellungen"
      },
      {
        target: '.input_betrieb',
        content: ONBOARDING_EINSTELLUNGEN_BETRIEB_NAME,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Deine Einstellungen"
      },
      {
        target: '.input_position',
        content: ONBOARDING_EINSTELLUNGEN_POSITIONEN,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Deine Einstellungen"
      },
      {
        target: '.button_speichern',
        content: ONBOARDING_EINSTELLUNGEN_SPEICHERN,
        locale: { 
            skip: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong>, 
            next: <strong aria-label="skip">Nächster Schritt</strong>,
            back: <strong aria-label="skip">Zurück</strong>
          },
        title: "Deine Einstellungen"
      },
      {
        target: '.nav_shiftplan',
        content: ONBOARDING_EINSTELLUNGEN_NAV_SHIFTPLAN,
        locale: { 
            back: <strong aria-label="skip">Zurück</strong>,
            last: <strong aria-label="skip" onClick={() => handleOnboarding()}>Beenden</strong> 
          },
        title: "Deine Einstellungen"
      }
    ]
  });
  let notificationAlert = useRef(null)
  const { run, steps } = state;

  const selectMeta = state => state.Meta;
  const selectLoadingMeta = state => state.loadings.isFetchingMeta;
  const selectDate = state => state.date;
  const selectInfoSidebar = state => state.InfoSidebar;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const LoadingMeta = useSelector(selectLoadingMeta);
  const Date = useSelector(selectDate);
  const SidebarInfo = useSelector(selectInfoSidebar);

  useEffect(() => {
      store.dispatch(FetchOrg)
      store.dispatch({ type: "ResetCurrentShiftPlan"})
      store.dispatch({ type: "resetShiftplan"})
      store.dispatch({ type: "ResetShiftSlot"})
      store.dispatch({ type: "stopShiftPlanIsActive"})
      store.dispatch({ type: "stopShiftPlanIsImported"})
    }, []); 

     useEffect(() => {
       if(validMeta(Meta)) {
        setMetaData({...metaData, schichten: Meta.schichten})
       }
    }, [Meta]);


  useEffect(() => {
    if (Meta) {
      let showSettings = Meta.onboarding.settings
      setState({...state, run: showSettings})
    }
  }, [Meta]);


  useEffect(() => {
    if(Date.start !== undefined) {
    let abrechnungStart = moment(Date.start.startDate).format("l")
    let abrechnungEnde = moment(Date.ende.endDate).format("l")
    setMetaData({...metaData, AbrechnungStart: abrechnungStart, AbrechnungEnde: abrechnungEnde })
    }
  }, [Date]);
  
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
    setMsng({...msng, [err]: !1})

  };
  const handleOnboarding = () => {
    let meta = store.getState().Meta;
    if(validMeta(meta)) {
      meta.onboarding.settings = !1;
      store.dispatch(thunkUpdateProfile(meta));
    }
  }
  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setMetaData({...metaData, [key]: val })
  }

  // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
  const stateSwitch = (value, event) => {
    if (value !== "on") return value
      let state = handleInputSwitch(event);
      return state
  }

    // Diese Funktion ändert den Wert eines Switches, je nach userinput
    const handleInputSwitch = (event) => {
      if (event.target.checked !== !0) return !1
        return !0
    }
    const handleUpdateProfile = () => {
      store.dispatch({type: "isFetchingMeta"});
      store.dispatch(thunkUpdateProfile(metaData));
      setMsng({...msng, LoadingMeta: !0});
    }
    const handlePositionHinzufuegen = () => {
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
    };
    
    const handlePositionHinzufuegenClose = () => {
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
    };

    const handlePositionErstellen = () => {
      let copymeta = {...metaData};
      if (copymeta.schichten === undefined) {
        copymeta.schichten = [];
        copymeta.schichten.push(position);
      } else if (!(position in metaData.schichten)) {
        copymeta.schichten.push(position);
      }
      setMetaData(copymeta);
      setPosition(null);
      setShowPositionHinzufuegen(!showPositionHinzufuegen);
      setMsng({...msng, CreatedPosition: !0});
    };
   // Handling von Userinputs
   const handlePositionChange = (event) => {
    const val = event.target.value;
    setPosition(val);
  };
    const handleRemovePositions = (item) => {
      let copymeta = {...metaData};
      copymeta.schichten = copymeta.schichten.filter(element => element !== item);
      setMetaData(copymeta);
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
      { !Meta ? 
      <Row className="text-center mt-2">
        <Col className="mt-2" xs={12}>
          <Spinner animation="grow" variant="light"/>
        </Col>
      </Row>
      : 
      <>
        { msng.LoadingMeta ? Notify("success", SUCCESS_LOADING_META, "LoadingMeta") : null}
        { msng.CreatedPosition ? Notify("info", INFO_CREATED_POSITION, "CreatedPosition") : null}
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>     
      {Meta ?
        <Navs
        showPositionHinzufuegen={showPositionHinzufuegen}
        handleRemovePositions={handleRemovePositions}
        handlePositionErstellen={handlePositionErstellen}
        handlePositionChange={handlePositionChange}
        handlePositionHinzufuegen={handlePositionHinzufuegen}
        handlePositionHinzufuegenClose={handlePositionHinzufuegenClose}
        onChange={handleInputChange}
        onClick={handleUpdateProfile}
        org={Meta}
        metaData={metaData}
        ></Navs>
        :
        null
      }
      </>
      }
      <InfoSidebar
      sidebarInfo={SidebarInfo}/>
    </>
            );
        }
export default EinstellungenContainer;
