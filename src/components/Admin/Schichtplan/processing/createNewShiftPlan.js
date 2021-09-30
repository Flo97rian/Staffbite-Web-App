import moment from "moment";
import store from "../../../../store";

export const createNewShiftPlan = (daysIsActive) => {
    const state = store.getState()
    let shiftplan = setNewShiftPlanInitalDays()
    let hasDate = state.date.start !== undefined
    if (daysIsActive && hasDate) {
    let schichtentag = setNewShiftPlanShifts(daysIsActive)
    shiftplan = addDatesToNewShiftPlan(shiftplan, state);
    shiftplan = editShiftPlanRow(shiftplan);
    shiftplan = addShiftsToNewShiftPlan(schichtentag, shiftplan);
    shiftplan = addDaysToShift(shiftplan);
    shiftplan = addActiveInactiveDay(shiftplan, daysIsActive);
    shiftplan = addSumHoursToNewShiftPlan(shiftplan);
    setNewShiftPlanStates(shiftplan)
    }
}

const setNewShiftPlanStates = (shiftplan) => {
    store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
    store.dispatch({type: "setShiftPlanIsActive"})
    store.dispatch({type: "stopShiftPlanIsImported"})
  }

  const setNewShiftPlanInitalDays = () => {
    let shiftplan = [
      {
        Wochentag: "Wochentag",
        Montag: "Montag",
        Dienstag: "Dienstag",
        Mittwoch: "Mittwoch",
        Donnerstag: "Donnerstag",
        Freitag: "Freitag",
        Samstag: "Samstag",
        Sonntag: "Sonntag"
      }
    ]
    return shiftplan
  }

const setNewShiftPlanShifts = (daysIsActive = 0) => {
    let hasSchichtentag = Object.keys(daysIsActive).includes("schichtentag")
    let schichtentag = hasSchichtentag ? daysIsActive["schichtentag"] : 0
    return schichtentag
  }

  const addShiftsToNewShiftPlan = (schichtentag, shiftplan) => {
    for (let i = 0; i < schichtentag; i++) {shiftplan.push({})}
    return [...shiftplan]
  }

  const addDaysToShift = (shiftplan) => {
    let len = shiftplan.length
    Object.keys(shiftplan[1]).forEach(key => {for (let i = 2; i < len ; i++) {
    shiftplan[i][key] = {}
    }})
    return [...shiftplan]
  }

  const addActiveInactiveDay = (shiftplan, daysIsActive) => {
    let len = shiftplan.length
    Object.keys(shiftplan[1]).forEach(key => {for (let i = 2; i < len ; i++) {
    daysIsActive[key] !== undefined ? (daysIsActive[key] ? shiftplan[i][key]["frei"] = !0 : shiftplan[i][key]["frei"] = !1) : shiftplan[i][key]["frei"] = !0
    }})
    return [...shiftplan]
  }


  const addDatesToNewShiftPlan = (shiftplan, state) => {
    let dates = Object.keys(shiftplan[0]);
    let datearray = {}
    dates.forEach(day => { day !== "Wochentag" ? datearray[day] = moment(state.date.start).add(dates.indexOf(day) - 1, "d").locale("de").format("l") : datearray[day] = "Datum"});
    return [...shiftplan, datearray]
  }

  const editShiftPlanRow = (shiftplan) => {
    let copyshiftplan = shiftplan;
    [copyshiftplan[0], copyshiftplan[1]] = [copyshiftplan[1], copyshiftplan[0]];
    return [...copyshiftplan]
  }

  const addSumHoursToNewShiftPlan = (shiftplan) => {
    let hours = {Wochentag: "Summe", Montag: 0, Dienstag: 0, Mittwoch: 0, Donnerstag: 0, Freitag: 0, Samstag: 0, Sonntag: 0}
    return [...shiftplan, hours]
  }