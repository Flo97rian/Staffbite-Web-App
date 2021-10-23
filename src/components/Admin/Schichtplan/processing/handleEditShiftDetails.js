     import store from "../../../../store";

    // // Bearbeiten einer Reihe, wenn der Schichtplan importiert wurde
    export const editShiftDetailsImportedShiftPlan = ({index, Plans, currentShiftPlan, userInput}) => {
    let plan = [...Plans[currentShiftPlan].plan];
    let plans = [...Plans];
    plans[currentShiftPlan].plan = mergeEditedShiftDetails({plan, index, userInput});
    store.dispatch({type: "All/setPlans", payload: plans});
    };

    // // Bearbeiten einer Reihe, wenn der Schichtplan neu erstellt wurde
    export const editShiftDetailsNewShiftPlan = ({index, NewShiftPlan, userInput}) => {
    let plan = [...NewShiftPlan];
    plan = mergeEditedShiftDetails({plan, index, userInput});
    store.dispatch({type: "SetNewShiftPlan", payload: plan});
    };

    const mergeEditedShiftDetails = ({plan, index, userInput}) => {
        plan = editWochentagDetails({plan, index, userInput});
        plan = editRequiredEmployees({plan, index, userInput});
        return plan;
      };

    // fügt die Anzahl der benötigten Mitarbeiter ein
    const editRequiredEmployees = ({plan, index, userInput}) => {
    for (const [key] of Object.entries(plan[index])) {
      if (key !== "Wochentag") {
      let includesAnzahl = "anzahl" in userInput ? userInput.anzahl : plan[index][key]["anzahl"];
      plan[index][key]["anzahl"] = includesAnzahl;
    }}
      return plan;
    };
    
    // fügt namen, start und ende einer Schicht hinzu
    const editWochentagDetails = ({plan, index, userInput}) => {
    plan[index].Wochentag["frei"] = !1;
    var shiftname = "rolle" in userInput;
    var beginn = "beginn" in userInput;
    var ende = "ende" in userInput;
    plan[index].Wochentag["ShiftName"] = shiftname ? userInput.rolle : plan[index].Wochentag["ShiftName"];
    plan[index].Wochentag["ShiftStart"] = beginn ? userInput.beginn : plan[index].Wochentag["ShiftStart"];
    plan[index].Wochentag["ShiftEnd"] = ende ? userInput.ende : plan[index].Wochentag["ShiftEnd"];
    return plan;
    };