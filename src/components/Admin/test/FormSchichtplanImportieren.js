import React from "react";
import {
    Col,
    Row, 
    Table,
    Button
  } from "reactstrap";
import { InputButton } from "./InputButton";
import Form from 'react-bootstrap/Form';
import { planIdColor } from "../../../Application/functions/PlanIdColor";
import store from "../../../../store";

const FormSchichtplanImportieren = (props) => {
    const setCurrentShiftPlan = (id) => {
        store.dispatch({type: "SetCurrentShiftPlan", payload: id})
        store.dispatch({type: "setShiftPlanIsActive"})
        store.dispatch({type: "setShiftPlanIsImported"})
    }

    const setTypeOfPlan = (id) => {
        const planid = id
        const typeOfPlan = planid.split("#")[1]
        return typeOfPlan
    }

        return(
            <>
            <Table borderless responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Zeitraum</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {props.plaene ? props.plaene.map((item, index) => (
        <tr>
          <td><p>{item.name}</p></td>
          <td><p> <i class="fa fa-calendar mr-2" aria-hidden="true"></i>{item.zeitraum.split(" - ")[0]} - {item.zeitraum.split(" - ")[1]}</p></td>
          <td>{planIdColor(item.id)}</td>
          <td>
            <Button name={item.label} outline color="success" onClick={() => setCurrentShiftPlan(index)}> Auswählen</Button>{' '}
            <i class="fa fa-trash fa-2x text-danger" aria-hidden="true" onClick={() => props.onDelete(index)}></i>
          </td>
        </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
        )
    }
export default FormSchichtplanImportieren