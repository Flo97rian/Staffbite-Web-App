import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/de';
import {
    Card,
    CardHeader,
    Row,
    Col,
    CardBody,
  } from "reactstrap";

import Navs from "./FormElements/NavPills";
import Spinner from 'react-bootstrap/Spinner'
import { FetchOrg } from "../../../store/middleware/FetchOrg";
import { thunkUpdateProfile } from "../../../store/middleware/UpdateProfile";
import store from "../../../store";

const EinstellungenContainer = () => {
  const [meta, setMeta] = useState(null)
  const selectMeta = state => state.DB.meta
  const selectDate = state => state.date

  //REDUX-Listener für UI-Data
  const Meta = useSelector(selectMeta)
  const Date = useSelector(selectDate)

  useEffect(() => {
      store.dispatch(FetchOrg)
    }, []);

  useEffect(() => {
    if(Date.start !== undefined) {
    let abrechnungStart = moment(Date.start.startDate).format("l")
    let abrechnungEnde = moment(Date.ende.endDate).format("l")
    setMeta({...meta, AbrechnungStart: abrechnungStart, AbrechnungEnde: abrechnungEnde })
    }
  }, [Date]);

  // Handling von Userinputs
  const handleInputChange = (event) => {
    let key = event.target.name;
    console.log()
    let val = stateSwitch(event.target.value, event);
    setMeta({...meta, [key]: val })
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
      store.dispatch(thunkUpdateProfile(meta))
    }
        return(
      <>
      <Row>
          <div className="col">
                  { !Meta ? 
                  <Row className="text-center mt-2">
                    <Col className="mt-2" xs={12}>
                      <Spinner animation="grow" variant="light"/>
                    </Col>
                  </Row>
                  : 
                    <Navs
                    onChange={handleInputChange}
                    onClick={handleUpdateProfile}
                    org={Meta}
                    ></Navs>
                  }
          </div>
        </Row>
    </>
            );
        }
export default EinstellungenContainer;
