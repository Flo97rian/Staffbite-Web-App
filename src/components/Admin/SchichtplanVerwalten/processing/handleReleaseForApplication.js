import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

  // Update des Datums des ausgewählten Schichtplans - anschließend wird der Schichtplan zur Bewerbung freigegeben wird
export const createShiftPlanForApplicationForNewDate = ({Plans, currentShiftPlan, NewDate}) => {
    let plan = Plans[currentShiftPlan]
    let keys = Object.keys(plan.plan[0]);
    keys.shift()
    keys.forEach(key => plan.plan[0][key] = moment(NewDate, "DD.MM.YYYY").add(keys.indexOf(key), "d").locale("de").format("l"))
    plan.id = "PLAN#Freigeben#" + uuidv4()
    return plan
  }

export const createShiftPlanForApplicationForSameDate = ({Plans, currentShiftPlan}) => {
    let plan = Plans[currentShiftPlan]
    plan.id = "PLAN#Freigeben#" + uuidv4()
    return plan
  }