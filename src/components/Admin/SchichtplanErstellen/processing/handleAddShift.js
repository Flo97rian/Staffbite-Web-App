import store from "../../../../store"

      // Einfügen einer neuen Spalte, wenn der Schichtplan importiert wurde
      export const addNewShiftToImportedShiftPlan = ({index, Plans, currentShiftPlan, daysIsActive}) => {
        const plans = getCopyOfShiftPlans({Plans})
        const currentPlan = getCurrentPlan({currentShiftPlan, Plans})
        const element = getCurrentPlanLength(-1, currentPlan)
        const input = createNewShiftRow({plans, daysIsActive, currentShiftPlan})
        console.log(input);
        plans[currentShiftPlan].plan.splice(element, 0, input);
        plans[currentShiftPlan].schichtentag = Number(currentPlan.schichtentag) + 1
        store.dispatch({type: "All/setPlans", payload: plans})
      }
            // Einfügen einer neuen Spalte, wenn der Schichtplan neu erstellt wurde
    export const addShiftToNewShiftPlan = ({index, NewShiftPlan, daysIsActive}) => {
        let shiftplan = [...NewShiftPlan]
        let indextoinsert = shiftplan.length - 1
        let input = createNewShiftRowForNewPlan({shiftplan, daysIsActive})
        shiftplan.splice(indextoinsert, 0, input);
        //let schichtentag = this.addDayToShiftCounter(1)
        store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
      }

      const getCopyOfShiftPlans = ({Plans}) =>{
        let plans = [...Plans];
        return plans
      }

      // Länge des ausgewählten Schichtplans ggf. möglich einen Wert abzuziehen oder hinzuzufügen
      const getCurrentPlanLength = (minus=0, currentPlan) => {
        let len = currentPlan.plan.length + minus
        return len
      }

      const getCurrentPlan = ({currentShiftPlan, Plans}) => {
        let plan = Plans[currentShiftPlan]
        return plan
      }

      const createNewShiftRow = ({plans, daysIsActive, currentShiftPlan}) => {
        let newShift = {};
        newShift["Wochentag"] = createWeekDayValues({daysIsActive})
        let MondayToSunday = createMondayToSunday({plans, currentShiftPlan, daysIsActive})
        Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element])
        return newShift
      }

      const createWeekDayValues = ({daysIsActive}) => {
        let Wochentag = {
          frei: !1,
          ShiftName: daysIsActive.rolle,
          ShiftStart: daysIsActive.beginn,
          ShiftEnd: daysIsActive.ende
        }
        return Wochentag
      }

      const createMondayToSunday = ({plans, currentShiftPlan, daysIsActive}) => {
        let WeekDays = { 
          Montag: {frei: plans[currentShiftPlan].plan[2].Montag.frei, anzahl: daysIsActive.anzahl},
          Dienstag: {frei: plans[currentShiftPlan].plan[2].Dienstag.frei, anzahl: daysIsActive.anzahl},
          Mittwoch: {frei: plans[currentShiftPlan].plan[2].Mittwoch.frei, anzahl: daysIsActive.anzahl},
          Donnerstag: {frei: plans[currentShiftPlan].plan[2].Donnerstag.frei, anzahl: daysIsActive.anzahl},
          Freitag: {frei: plans[currentShiftPlan].plan[2].Freitag.frei, anzahl: daysIsActive.anzahl},
          Samstag: {frei: plans[currentShiftPlan].plan[2].Samstag.frei, anzahl: daysIsActive.anzahl},
          Sonntag: {frei: plans[currentShiftPlan].plan[2].Sonntag.frei, anzahl: daysIsActive.anzahl}
        }
        return WeekDays
      }

    const getNewShiftplanLength = (minus = 0) => {
      let len = this.state.shiftplan.length + minus
      return len
    }

    const createNewShiftRowForNewPlan = ({shiftplan, daysIsActive}) => {
      let newShift = {};
      newShift["Wochentag"] = createNewWeekDayValues(daysIsActive)
      let MondayToSunday = createNewMondayToSunday({shiftplan, daysIsActive})
      Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element])
      return newShift
    }

    const createNewWeekDayValues = (daysIsActive) => {
      let Wochentag = {
          frei: !1, 
          ShiftName: daysIsActive.rolle, 
          ShiftStart: daysIsActive.beginn, 
          ShiftEnd: daysIsActive.ende
        }
      return Wochentag
    }

    const addDayToShiftCounter = (value=0) => {
      let schichtentag = Number(this.state.daysIsActive.schichtentag) + value
      return schichtentag
    }

    const createNewMondayToSunday = ({shiftplan, daysIsActive}) => {
      let WeekDays = {
        Montag: {frei: shiftplan[2].Montag.frei, anzahl: daysIsActive.anzahl},
        Dienstag: {frei: shiftplan[2].Dienstag.frei, anzahl: daysIsActive.anzahl}, 
        Mittwoch: {frei: shiftplan[2].Mittwoch.frei, anzahl: daysIsActive.anzahl}, 
        Donnerstag: {frei: shiftplan[2].Donnerstag.frei, anzahl: daysIsActive.anzahl}, 
        Freitag: {frei: shiftplan[2].Freitag.frei, anzahl: daysIsActive.anzahl},
        Samstag: {frei: shiftplan[2].Samstag.frei, anzahl: daysIsActive.anzahl},
        Sonntag: {frei: shiftplan[2].Sonntag.frei, anzahl: daysIsActive.anzahl}
      }
      return WeekDays
    }

    const setNewShiftPlan = () => {
        let daysIsActive = {Wochentag: !0, Montag: !0, Dienstag: !0, Mittwoch: !0, Donnerstag: !0, Freitag: !0, Samstag: !0, Sonntag: !0}
        this.setSingleState("daysIsActive", daysIsActive)
      }