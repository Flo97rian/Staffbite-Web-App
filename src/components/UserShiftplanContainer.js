import { useEffect, useState} from "react";
import { thunkUploadApplication } from "../store/middleware/UploadApplication";
import { useSelector, useDispatch } from "react-redux";
import InfoSidebar from "./Sidebar/InfoSidebar";
import Joyride from 'react-joyride';
import 'moment/locale/de';
import {
    Col,
    Row,
    Button,
    Container
  } from "reactstrap";
import ShiftplanTable from "./UserShiftplanTable";
import OpenModal from "./OpenModal";
import SchichtplanImport from "./ShiftplanImport";
import { thunkUpdateEmployee } from "../store/middleware/UpdateEmployee";
import { ONBOARDING_EMPLOYEE_SCHICHTPLAN } from "../constants/OnBoardingTexts";
import { resettingShiftplan } from "../reducers/Shiftplan";
import { resettingCurrentShiftplanIndex } from "../reducers/currentShiftPlan";
import { resettingModal, settingModal } from "../reducers/modal";
import { resettingDisplayShiftplan } from "../reducers/display";
import { resettingShiftplanChanged } from "../reducers/shiftplanChanged";
import UserShiftplanTrades from "./UserShiftplanTrades";

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
  const selectShiftplan = state => state.Shiftplan;
  const selectUser = state => state.user
  const selectInfoSidebar = state => state.InfoSidebar;
  const selectShiftplanChanged = state => state.ShiftplanChanged.shiftplanChanged;

  //REDUX-Listener für UI-Data
  const User = useSelector(selectUser);
  const Shiftplan = useSelector(selectShiftplan);
  const SidebarInfo = useSelector(selectInfoSidebar);
  const ShiftplanChanged = useSelector(selectShiftplanChanged);
  const OnboardingShiftplan = useSelector(state => state.DB.emplyee?.onboarding?.shiftplan || false);
  const Employee = useSelector(state => state.DB.employee);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan)


  // Initiales laden der aktuellen Users
  useEffect(() => {
  }, []);

  useEffect(() => {
    if(User) {
      setState({...state, run: OnboardingShiftplan})
    }
  }, [User]);


  const handleOnboarding = () => {
      dispatch(thunkUpdateEmployee({...Employee, onboarding: {...Employee.onboarding, shiftplan: !OnboardingShiftplan}}));
  }

  // Diese Funktion ist der handler, wenn sich auf eine Schicht beworben wird. Sie schließt das Modal und leitet einen API Call ein.
  const handleUpdateShiftplan = () => {
    dispatch(thunkUploadApplication(Shiftplan));
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


  return(
          <Container fluid className="px-6">
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
        <h3 className="float-left pt-4 font-weight-bold text-lg">Schichtplan</h3>
        </Col>
        <Col xs={10} className="mt-2">
        <Button 
        hidden={!DisplayShiftplan}
          color={ShiftplanChanged ? "success" : "white"}
          size="lg"
          className="float-right mt-2 ml-2 mr-0"
          onClick={() => handleUpdateShiftplan()}>
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
              <>
                <SchichtplanImport/>
                <ShiftplanTable/>
              </>
            </Col>
          </Row>
              <Row className="mt-4">
                <div className="col">
                  <UserShiftplanTrades/>
                </div>
              </Row>
        <OpenModal/>
      <InfoSidebar
      sidebarInfo={SidebarInfo}/>
      </Container>
            );
        }
export default UserShiftplanContainer;