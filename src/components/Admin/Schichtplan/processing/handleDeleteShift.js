      import store from "../../../../store";

      // // Löschen einer Reihe, wenn der Schichtplan importiert wurde
      export const deleteShiftFromImportedShiftPlan = ({index, Plans, currentShiftPlan}) => {
        let plans = [...Plans];
        plans[currentShiftPlan].plan.splice(index, 1);
        plans[currentShiftPlan].schichtentag = String(Number(plans[currentShiftPlan].schichtentag) - 1)
        store.dispatch({type: "All/setPlans", payload: plans})
      }

      export const deleteShiftFromNewShiftPlan = ({index, NewShiftPlan}) => {
        let shiftplan = [...NewShiftPlan];
        shiftplan.splice(index, 1);
        store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
      }