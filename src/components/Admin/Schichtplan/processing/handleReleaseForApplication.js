import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import store from "../../../../store";
import { thunkReleaseForApplication } from "../../../../store/middleware/ReleaseForApplication";

  // Update des Datums des ausgewählten Schichtplans - anschließend wird der Schichtplan zur Bewerbung freigegeben wird
export const createShiftPlanForApplicationForNewDate = ({Plans, currentShiftPlan, NewDate}) => {
    let plan = Plans[currentShiftPlan]
    let keys = Object.keys(plan.plan[0]);
    keys.shift()
    keys.forEach(key => {plan.plan[0][key] = moment(NewDate.startDate).add(keys.indexOf(key), "d").format("l")})
    plan.id = "PLAN#Freigeben#" + uuidv4()
    plan.zeitraum = plan.plan[0]["Montag"] + " - " + plan.plan[0]["Sonntag"]
    return plan
  }

export const createShiftPlanForApplicationForSameDate = ({Plans, currentShiftPlan}) => {
  console.log("hier")
    let plan = Plans[currentShiftPlan]
    plan.id = "PLAN#Freigeben#" + uuidv4()
    return plan
  }

export const checkShiftHasDetails = (Plans, currentShiftPlan) => {
  for (const shift of Plans[currentShiftPlan].plan) {
    if (typeof shift.Wochentag === "object" ) {
      if (!Object.keys(shift.Wochentag).includes("ShiftName")) {
        return !1;
      }
    }
  }
  return !0
}

export const handleApplication = (Plans, currentShiftPlan, NewDate) => {
    const shiftDetailsFilled = checkShiftHasDetails(Plans, currentShiftPlan)
    if (shiftDetailsFilled) {
      let plan = null;
      if (NewDate === undefined) {
        plan = createShiftPlanForApplicationForSameDate({Plans, currentShiftPlan});
      } else {
        plan = createShiftPlanForApplicationForNewDate({Plans, currentShiftPlan, NewDate});
      }
      console.log(plan)
      store.dispatch(thunkReleaseForApplication(plan));
      return !0
    } else {
      return !1
    }
}