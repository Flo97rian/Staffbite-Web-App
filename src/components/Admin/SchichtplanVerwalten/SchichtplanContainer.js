import {React, useState, useEffect} from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
    Alert
  } from "reactstrap";
import Spinner from 'react-bootstrap/Spinner'
import { ButtonZurueck } from "../SchichtplanVerwalten/FormElements/ButtonZurueck"
import OpenModal from './Modal/OpenModal';
import SchichtenTabelle from "./SchichtplanListe/SchichtplanTabelle";
import FormSchichtplanImportieren from "../SchichtplanErstellen/FormElements/FormSchichtplanImportieren";
import { useSelector } from "react-redux";
import store  from "../../../store"
import { handleApplication } from "./processing/handleReleaseForApplication";
import { thunkStartAlg } from "../../../store/middleware/StartAlg";
import { thunkDeleteShiftPlan } from "../../../store/middleware/DeleteShiftPlan";
import { thunkUpdateShiftPlan } from "../../../store/middleware/UpdateShiftPlan";
import { FetchFromDB } from "../../../store/middleware/FetchPlansFromDB";
import { FetchEmployees } from "../../../store/middleware/FetchEmployees";
import { editShiftDetailsImportedShiftPlan } from "../SchichtplanErstellen/processing/handleEditShiftDetails";
import { refractorEmployees } from "./processing/GetShiftCount";
import { setApplicantsInShiftPlan } from "./processing/handleUpdateSetApplicants";
import ModalOpenButton from "../SchichtplanErstellen/FormElements/ModalOpenButton";
import ButtonUpdateShiftPlan from "./FormElements/ButtonUpdateShiftPlan";
import { thunkPublishShiftPlan } from "../../../store/middleware/PublishShiftPlan";
import SetTradeShift from "../../Application/functionalComponents/setTradeShift";
import { thunkReleaseForApplication } from "../../../store/middleware/ReleaseForApplication";
import TableDnD from "../../Application/functionalComponents/TableDragAndDrop";
import { handleSetShfitTrade, handleCancelShfitTrade } from "./processing/handleSetShiftTrade";

const TableContainer = (props) => {
  const [daysIsActive, setDaysIsActive] = useState(null);
  const [ShiftEmployees, setShiftEmployees] = useState(null);
  const [visible, setVisible] = useState(false);
  const [shiftDetails, setShiftDetails] = useState(false)
  const [ActivePlanIndex, setActivePlanIndex] = useState({left: !1, right: !1});

  const onDismiss = () => setVisible(false);
  const onShiftDismiss = () => setShiftDetails(false);


  //REDUX-Filter für UI-Data
  const selectCurrentShiftPlan = state => state.currentShiftPlan.currentShiftPlan
  const selectShiftPlanIsActive = state => state.visibility.ShiftPlanIsActive
  const selectPlans = state => state.DB.plans
  const selectShiftSlot = state => state.shiftSlot
  const selectModal = state => state.modal
  const selectNewDate = state => state.date.start
  const selectEmployees = state => state.DB.employees;

  //REDUX-Listener für UI-Data
  const ShiftPlanIsActive = useSelector(selectShiftPlanIsActive)
  const currentShiftPlan = useSelector(selectCurrentShiftPlan)
  const NewDate = useSelector(selectNewDate);
  const Plans = useSelector(selectPlans)
  const ShiftSlot = useSelector(selectShiftSlot);
  const Modal = useSelector(selectModal);
  const Employees = useSelector(selectEmployees);

  // Initiales laden der aktuellen Users
  useEffect(() => {
    store.dispatch(FetchFromDB)
    store.dispatch(FetchEmployees)
  }, []);

  useEffect(() => {
    if(currentShiftPlan && Employees && Plans) {
      const employees = refractorEmployees(Employees, Plans[currentShiftPlan].plan)
      setShiftEmployees(employees)
    }
  }, [currentShiftPlan]);

  useEffect(() => {
    if(Plans) {
    let NoLeftNextShiftPlan = currentShiftPlan - 1 < 0 ? !0 : !1 
    let NoRightNextShiftPlan = currentShiftPlan + 1 >= Plans.length ? !0 : !1 
    setActivePlanIndex({...ActivePlanIndex, left: NoLeftNextShiftPlan, right: NoRightNextShiftPlan})
    console.log(ActivePlanIndex)
    }
  }, [currentShiftPlan]);


  useEffect(() => {
  }, [Plans]);

  useEffect(() => {
    setTimeout( function () {setVisible(!1)}, 60000)
  }, [visible]);
  //REDUX-Store Listener
  store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
  )


  // Untersucht, ob der Wert eines Modals auf true steht und gibt den Wert true zurück
  const getModalTrue = (allmodals) => {
    let modals = Object.entries(allmodals).map(([key, value]) => {return value})
    let truemodal = modals.includes(true)
    return truemodal
  }

  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setDaysIsActive({...daysIsActive, [key]: val })
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
    
  // Untersucht, ob der Wert eines Modals auf auf true steht und gibt den zugehörigen Key zurück
  const getModalKey = (allmodals) => {
      const modals = Object.entries(allmodals).map(([key, value]) =>  value ? key : null);
      const modalfilter = modals.filter((modal) => typeof modal === "string");
      const modal = modalfilter[0];
      return modal;
  }

  const handleSetApplicant = (modal, updateApplicant) => {
    console.log(":(", updateApplicant, ShiftSlot)
    setApplicantsInShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal})
  }

  // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter:innen)
  const handleEditShiftDetails = (index) => {
    editShiftDetailsImportedShiftPlan({index, Plans, currentShiftPlan, daysIsActive})
    store.dispatch({type: "CLOSE", payload: index})
  }
    

  const handleReleaseForApplication = (modal) => {
    const response = handleApplication(Plans, currentShiftPlan, NewDate)
    if (!response) {setShiftDetails(!0)}
    store.dispatch({type: "CLOSE", payload: modal});
  }
    

  const handleStartAlg = (modal) => {
    const id = Plans[currentShiftPlan].id
    setVisible(!0)
    store.dispatch(thunkStartAlg(id))
    store.dispatch({type: "CLOSE", payload: modal})
  }


  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
    store.dispatch(thunkUpdateShiftPlan(Plans, currentShiftPlan))
  }

    //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
    const handleShiftTradeToDB = (index) => {
      let plans = Plans
      plans[currentShiftPlan] = handleSetShfitTrade(Plans, currentShiftPlan, index, daysIsActive, Employees)
      store.dispatch(thunkUpdateShiftPlan(plans, currentShiftPlan))
    }

  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleCancelShiftTradeToDB = (index) => {
    let plans = Plans
    plans[currentShiftPlan] = handleCancelShfitTrade(Plans, currentShiftPlan, index, daysIsActive, Employees)
    store.dispatch(thunkUpdateShiftPlan(plans, currentShiftPlan))
  }
  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handleDeleteShiftPlan = (index) => {
    store.dispatch(thunkDeleteShiftPlan({index, Plans}))
  }

  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handlePublishShiftPlan = () => {
    let plan = Plans[currentShiftPlan]
    let currentId = plan.id
    let newId = currentId.replace(/Review/i, "Veröffentlicht");
    console.log(plan.plan)
    plan.id = newId
    let index = currentShiftPlan
    store.dispatch(thunkDeleteShiftPlan({index, Plans}))
    store.dispatch(thunkReleaseForApplication(plan))
  }

        return(
      <>
      <Alert color="success" isOpen={visible} toggle={onDismiss} role="alert" fade>
        Befüllung wurde gestartet. Der Prozess kann bis zu einer Minute dauern. Aktualisieren Sie anschließend das Fenster!
      </Alert>
      <Alert color="warning" isOpen={shiftDetails} toggle={onShiftDismiss} role="alert" fade>
        Der Schichtplan kann nicht freigegeben werden, da noch nicht alle Details für diesen Schichtplan eingetragen wurden! Gehen Sie hierzu in den Reiter Schichtplan erstellen und füllen Sie die übrigen Schichtdetails aus.
      </Alert>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan verwalten</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? (ActivePlanIndex.left ? <span className="ni ni-bold-left text-light"></span> : <span className="ni ni-bold-left" onClick={() => {store.dispatch({ type: "SwitchLeftcurrentShiftPlan"})}}></span>) : <></>}
                  </Col>
                  <Col xs={10} className="text-center">
                  {ShiftPlanIsActive ?
                  <>
                  <Row className="text-center">
                  <Col xs={6}>
                  <ButtonZurueck
                      titel="Zurück zur Auswahl"
                      true={ShiftPlanIsActive}
                      >
                      </ButtonZurueck>
                    </Col>
                    <Col xs={6}>
                    <ModalOpenButton
                      title="Schichtplan freigeben"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Entwurf")}
                      modal="showSchichtplanFreigeben"/>
                    <ModalOpenButton
                      title="Befüllung starten"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Freigeben")}
                      modal="showBefuellungStarten"/>
                    <ButtonUpdateShiftPlan
                      title="Änderungen speichern"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Review")}
                      onClick={handleUpdatedShiftPlanToDB}
                      />
                    <ButtonUpdateShiftPlan
                      title="Schichtplan veröffentlichen"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Review")}
                      onClick={handlePublishShiftPlan}
                      />
                    </Col>
                    </Row>
                  </>
                  : <></>}
                  </Col>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? (ActivePlanIndex.right ? <span className="ni ni-bold-right text-light"></span> : <span className="ni ni-bold-right" onClick={() => {store.dispatch({ type: "SwitchRightcurrentShiftPlan", payload: Plans.length})}}></span>) : <></>}
                  </Col>
                </Row>
                <br />
                {ShiftPlanIsActive ?
                <SchichtenTabelle 
                  plaene={Plans}
                  plan={currentShiftPlan}
                  bearbeiten={ShiftPlanIsActive}
                 />
                 : 
                 (!Plans
                  ? 
                  <>
                  <br/>   
                  <Row className="text-center">
                    <br/>
                    <Col xs={12}>
                      <Spinner animation="grow" variant="light"/>
                    </Col>
                  </Row>
                  </>
                  :
                  <FormSchichtplanImportieren
                  plaene={Plans}
                  onDelete={handleDeleteShiftPlan}
                  />)
                }
              </CardBody>
            </Card>
          </div>
        </Row>
        {currentShiftPlan && Plans[currentShiftPlan].tauschanfrage.length > 0 ?
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
                plan={Plans}
                current={currentShiftPlan}/>
              </CardBody>
            </Card>
          </div>
        </Row>
        :
        <></>
        }
      <OpenModal
            show={Modal}
            selectBewerber={handleSetApplicant}
            onChange={handleInputChange}
            checkTrue={getModalTrue}
            checkModalKey={getModalKey}
            plaene={Plans}
            plan={currentShiftPlan}
            startAlg = {handleStartAlg}
            onUpdate={handleReleaseForApplication}
            onSaveBearbeiten={handleEditShiftDetails}
            onDelete={handleDeleteShiftPlan}
            bewerber={ShiftSlot}
            employees={ShiftEmployees}
            ></OpenModal>
    </>
            );
        }
export default TableContainer