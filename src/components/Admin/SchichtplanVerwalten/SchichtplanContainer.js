import {React, useState, useEffect} from "react";
import 'moment/locale/de';
import {
    Card,
    Col,
    CardHeader,
    Row,
    CardBody,
  } from "reactstrap";
import Spinner from 'react-bootstrap/Spinner'
import { ButtonZurueck } from "../SchichtplanVerwalten/FormElements/ButtonZurueck"
import OpenModal from './Modal/OpenModal';
import SchichtenTabelle from "./SchichtplanListe/SchichtplanTabelle";
import FormSchichtplanImportieren from "../SchichtplanErstellen/FormElements/FormSchichtplanImportieren";
import { useSelector } from "react-redux";
import store  from "../../../store"
import { thunkReleaseForApplication } from "../../../store/middleware/ReleaseForApplication";
import { createShiftPlanForApplicationForNewDate, createShiftPlanForApplicationForSameDate } from "./processing/handleReleaseForApplication";
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
import moment from "moment";

const TableContainer = (props) => {
  const [daysIsActive, setDaysIsActive] = useState(null);
  const [Applicants, setApplicants] = useState(null);
  const [ShiftEmployees, setShiftEmployees] = useState(null);

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
    if(currentShiftPlan) {
      const employees = refractorEmployees(Employees, Plans[currentShiftPlan].plan)
      setShiftEmployees(employees)
    }
  }, [ShiftPlanIsActive]);

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

  // Handling des DragNDrop-Interfaces bei der Belegung von Schichten
  const onEmployeeChange = (state) => {
    setApplicants(state);
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
    setApplicantsInShiftPlan({Plans, currentShiftPlan, ShiftSlot, updateApplicant, modal})
  }

  // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter:innen)
  const handleEditShiftDetails = (index) => {
    editShiftDetailsImportedShiftPlan({index, Plans, currentShiftPlan, daysIsActive})
    store.dispatch({type: "CLOSE", payload: index})
  }
    

  const handleReleaseForApplication = (modal) => {
    console.log(daysIsActive);
    const plan = NewDate ?  createShiftPlanForApplicationForNewDate({Plans, currentShiftPlan, NewDate}) : createShiftPlanForApplicationForSameDate({Plans, currentShiftPlan});
    store.dispatch(thunkReleaseForApplication(plan));
    store.dispatch({type: "CLOSE", payload: modal});
  }
    

  const handleStartAlg = (modal) => {
    const id = Plans[currentShiftPlan].id
    store.dispatch(thunkStartAlg(id))
    store.dispatch({type: "CLOSE", payload: modal})
  }


  //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
  const handleUpdatedShiftPlanToDB = () => {
    store.dispatch(thunkUpdateShiftPlan({Plans, currentShiftPlan}))
  }

  //Diese Funktion löscht einen ausgewählten Schichtplan in der Datenbank
  const handleDeleteShiftPlan = (index) => {
    store.dispatch(thunkDeleteShiftPlan({index, Plans}))
  }

        return(
      <>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan verwalten</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? <span className="ni ni-bold-left" onClick={() => {store.dispatch({ type: "SwitchLeftcurrentShiftPlan"})}}></span> : <></>}
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
                      <ButtonUpdateShiftPlan
                      title="Änderungen speichern"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Review")}
                      onClick={handleUpdatedShiftPlanToDB}
                      />
                    <ModalOpenButton
                      title="Schichtplan freigeben"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Entwurf")}
                      modal="showSchichtplanFreigeben"/>
                    <ModalOpenButton
                      title="Befüllung starten"
                      trigger={Plans[currentShiftPlan].id.split("#").includes("Freigeben") || Plans[currentShiftPlan].id.split("#").includes("Review")}
                      modal="showBefuellungStarten"/>
                    </Col>
                    </Row>
                  </>
                  : <></>}
                  </Col>
                  <Col xs={1}>
                  {ShiftPlanIsActive ? <span className="ni ni-bold-right" onClick={() => {store.dispatch({ type: "SwitchRightcurrentShiftPlan", payload: Plans.length})}}></span> : <></>}
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
            onEmployeeChange={onEmployeeChange}
            ></OpenModal>
    </>
            );
        }
export default TableContainer