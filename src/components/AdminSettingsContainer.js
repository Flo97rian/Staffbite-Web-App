import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import 'moment/locale/de';
import {
    Row,
    Col,
  } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import AdminSettingsNavPills from "./AdminSettingsNavPills";
import Spinner from 'react-bootstrap/Spinner'
import { thunkFetchOrg } from "../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../store/middleware/UpdateProfile";
import store from "../store";
import InfoSidebar from "./Sidebar/InfoSidebar";
import Joyride from 'react-joyride';
import {INFO_CREATED_POSITION, SUCCESS_LOADING_META} from "../constants/Alerts";
import { ONBOARDING_EINSTELLUNGEN_BETRIEB_NAME, ONBOARDING_EINSTELLUNGEN_POSITIONEN, ONBOARDING_EINSTELLUNGEN_NAV_BETRIEB, ONBOARDING_EINSTELLUNGEN_SHIFTPLAN_REVERSE, ONBOARDING_EINSTELLUNGEN_SHIFTPLAN_ORDER, ONBOARDING_EINSTELLUNGEN_NAV_SHIFTPLAN, ONBOARDING_EINSTELLUNGEN_SPEICHERN } from "../constants/OnBoardingTexts"
import _ from "lodash";
import { resettingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftSlot } from "../reducers/ShiftSlot";

const AdminSettingsContainer = () => {
  const dispatch = useDispatch();
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
  let mainContent = useRef(null)
  const { run, steps } = state;

  const selectMeta = state => state.Meta;
  const selectInfoSidebar = state => state.InfoSidebar;

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const userInput = useSelector(state => state.userInput);

  useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      dispatch(resettingCurrentShiftplanIndex())
      dispatch(resettingShiftplan())
      dispatch(resettingShiftSlot())
      dispatch(resettingDisplayShiftplan())
    }, []); 


  useEffect(() => {
    if (Meta) {
      let showSettings = Meta.onboarding.settings
      setState({...state, run: showSettings})
    }
  }, [Meta]);
  
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
    if(_.isObject(meta)) {
      meta.onboarding.settings = !1;
      store.dispatch(thunkUpdateProfile(meta));
    }
  }


    const handleUpdateProfile = () => {
      dispatch(
        thunkUpdateProfile({
          ...Meta,
          name: userInput.companyName !== "" ? userInput.companyName : Meta.name,
          fair: userInput.companyName !== "" ? userInput.companyName : Meta.name,
        })
      );
    }

        return(
      <div className="main-content px-4 mt-9" ref={mainContent}>
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
      { !_.isObject(Meta) ? 
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
        <AdminSettingsNavPills
        onClick={handleUpdateProfile}
        ></AdminSettingsNavPills>
      </>
      }
      <InfoSidebar
      sidebarInfo={SidebarInfo}/>
    </div>
            );
        }
export default AdminSettingsContainer;
