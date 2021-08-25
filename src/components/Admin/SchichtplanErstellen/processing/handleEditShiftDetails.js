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
    console.log("premerge", plan)
    plan = mergeEditedShiftDetails({plan, index, daysIsActive})
    console.log("postmerge", plan)
    store.dispatch({type: "SetNewShiftPlan", payload: plan})
    }

    const mergeEditedShiftDetails = ({plan, index, daysIsActive}) => {
        plan = editWochentagDetails({plan, index, daysIsActive})
        plan = editRequiredEmployees({plan, index, daysIsActive})
        return plan
      }
    // fügt die Anzahl der benötigten Mitarbeiter:innen ein
    const editRequiredEmployees = ({plan, index, daysIsActive}) => {
    for (const [key, value] of Object.entries(plan[index])) {if (key !== "Wochentag") {plan[index][key]["anzahl"] = daysIsActive.anzahl}}
    return plan
    }
    
    // fügt namen, start und ende einer Schicht hinzu
    const editWochentagDetails = ({plan, index, daysIsActive}) => {
    plan[index].Wochentag["frei"] = !1;
    plan[index].Wochentag["ShiftName"] = daysIsActive.rolle;
    plan[index].Wochentag["ShiftStart"] = daysIsActive.beginn;
    plan[index].Wochentag["ShiftEnd"] = daysIsActive.ende;
    return plan
    }