import {useEffect, useState} from "react";
import { thunkUploadApplication } from "../store/middleware/UploadApplication";
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
import ApplicationsImport from "./UserApplicationsImport";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_EINTRAGEN } from "../constants/OnBoardingTexts";
import { resettingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";


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
  const selectShiftplan = state => state.Shiftplan;
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged.shiftplanChanged;

  //REDUX-Listener für UI-Data
  const Employee = useSelector(state => state.DB.employee);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const Shiftplan = useSelector(selectShiftplan);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);
  const OnboardingApplication = useSelector(state => state.DB.employee?.onboarding?.eintragen || false);


  // Initiales laden der aktuellen Users
  useEffect(() => {
    dispatch(resettingCurrentShiftplanIndex())
    dispatch(resettingDisplayShiftplan())
    dispatch(resettingShiftplan())
  }, []);

  useEffect(() => {
    if(Employee) {
      setState({...state, run: OnboardingApplication})
    }
  }, [Employee]);

  const handleOnboarding = () => {
      dispatch(thunkUpdateEmployee({...Employee, onboarding: {...Employee.onboarding, eintragen: !OnboardingApplication}}));
  }

  // Diese Funktion ist der handler, wenn sich auf eine Schicht beworben wird. Sie schließt das Modal und leitet einen API Call ein.
  const handleUploadApplication = () => {
    dispatch(thunkUploadApplication(Shiftplan));
    dispatch(resettingModal())
  }

  function onClickBack () {
    if (ShiftplanChanged) {
      dispatch(settingModal("saveChanges"))
    } else {
        dispatch(resettingCurrentShiftplanIndex())
        dispatch(resettingShiftplan())
        dispatch(resettingDisplayShiftplan())
    }
  }

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
        <Row className="mt-6">
        <Col xs={2} className="mt-4">
        <h3 className="float-left pt-4 font-weight-bold text-lg">Eintragen</h3>
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
            <Col>
              <ApplicationsImport />
              <ApplicationsTable/>
            </Col>
          </Row>
        <OpenModal/>
       <InfoSidebar
      sidebarInfo={SidebarInfo}/>
      </>
            );
        }
export default UserApplicationsContainer;