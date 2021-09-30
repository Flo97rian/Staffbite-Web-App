     import store from "../../../../store";

    // // Bearbeiten einer Reihe, wenn der Schichtplan importiert wurde
    export const editShiftDetailsImportedShiftPlan = ({index, Plans, currentShiftPlan, daysIsActive}) => {
    let plan = [...Plans[currentShiftPlan].plan]
    let plans = [...Plans]
    plans[currentShiftPlan].plan = mergeEditedShiftDetails({plan, index, daysIsActive})
    store.dispatch({type: "All/setPlans", payload: plans})
    }

    // // Bearbeiten einer Reihe, wenn der Schichtplan neu erstellt wurde
    export const editShiftDetailsNewShiftPlan = ({index, NewShiftPlan, daysIsActive}) => {
    let plan = [...NewShiftPlan];
    plan = mergeEditedShiftDetails({plan, index, daysIsActive})
    store.dispatch({type: "SetNewShiftPlan", payload: plan})
    }

    const mergeEditedShiftDetails = ({plan, index, daysIsActive}) => {
        plan = editWochentagDetails({plan, index, daysIsActive})
        plan = editRequiredEmployees({plan, index, daysIsActive})
        return plan
      }

    // fügt die Anzahl der benötigten Mitarbeiter:innen ein
    const editRequiredEmployees = ({plan, index, daysIsActive}) => {
    for (const [key] of Object.entries(plan[index])) {
      if (key !== "Wochentag") {
      let includesAnzahl = Object.keys(daysIsActive).includes("anzahl") ? daysIsActive.anzahl : plan[index][key]["anzahl"]
      plan[index][key]["anzahl"] = includesAnzahl
    }}
      return plan
    }
    
    // fügt namen, start und ende einer Schicht hinzu
    const editWochentagDetails = ({plan, index, daysIsActive}) => {
    plan[index].Wochentag["frei"] = !1;
    plan[index].Wochentag["ShiftName"] = Object.keys(daysIsActive).includes("rolle") ? daysIsActive.rolle : plan[index].Wochentag["ShiftName"];
    plan[index].Wochentag["ShiftStart"] = Object.keys(daysIsActive).includes("beginn") ? daysIsActive.beginn : plan[index].Wochentag["ShiftStart"];
    plan[index].Wochentag["ShiftEnd"] = Object.keys(daysIsActive).includes("ende") ? daysIsActive.ende : plan[index].Wochentag["ShiftEnd"];
    return plan
    }