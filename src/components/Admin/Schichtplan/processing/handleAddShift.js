import store from "../../../../store"

      // Einfügen einer neuen Spalte, wenn der Schichtplan importiert wurde
      export const addNewShiftToImportedShiftPlan = ({index, Plans, currentShiftPlan, daysIsActive}) => {
        if (daysIsActive !== null) {
          const shiftname = Object.keys(daysIsActive).includes("rolle")
          const beginn = Object.keys(daysIsActive).includes("beginn")
          const ende = Object.keys(daysIsActive).includes("ende")
          if (shiftname && beginn && ende) {
          const plans = getCopyOfShiftPlans({Plans})
          const currentPlan = getCurrentPlan({currentShiftPlan, Plans})
          const element = getCurrentPlanLength(-1, currentPlan)
          const input = createNewShiftRow({plans, daysIsActive, currentShiftPlan})
          plans[currentShiftPlan].plan.splice(element, 0, input);
          plans[currentShiftPlan].schichtentag = String(Number(currentPlan.schichtentag) + 1)
          store.dispatch({type: "All/setPlans", payload: plans})
        }}
      }
            // Einfügen einer neuen Spalte, wenn der Schichtplan neu erstellt wurde
    export const addShiftToNewShiftPlan = ({index, NewShiftPlan, daysIsActive}) => {
      if (daysIsActive !== null) {
        let shiftplan = [...NewShiftPlan]
        let indextoinsert = shiftplan.length - 1
        let input = createNewShiftRowForNewPlan({shiftplan, daysIsActive})
        shiftplan.splice(indextoinsert, 0, input);
        //let schichtentag = this.addDayToShiftCounter(1)
        store.dispatch({type: "SetNewShiftPlan", payload: shiftplan})
        }
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
        let WochentagDetails = {}
        console.log(daysIsActive)
        if(daysIsActive !== null) {
        console.log(daysIsActive)
        const shiftname = Object.keys(daysIsActive).includes("rolle")
        const beginn = Object.keys(daysIsActive).includes("beginn")
        const ende = Object.keys(daysIsActive).includes("ende")
        if (shiftname && beginn && ende) {
          WochentagDetails["frei"] = !1
          WochentagDetails["ShiftName"] = daysIsActive.rolle
          WochentagDetails["ShiftStart"] = daysIsActive.beginn
          WochentagDetails["ShiftEnd"] = daysIsActive.ende
        }} else {
          WochentagDetails["frei"] = !1
        }
        console.log("wochentagdetails", WochentagDetails)
        return WochentagDetails
      }

      const createMondayToSunday = ({plans, currentShiftPlan, daysIsActive}) => {
        let WeekDaysDetails = {}
        if (daysIsActive !== null) {
          const anzahl = Object.keys(daysIsActive).includes("anzahl")
          if (anzahl) {
            WeekDaysDetails["Montag"] = {frei: plans[currentShiftPlan].plan[2].Montag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Dienstag"] = {frei: plans[currentShiftPlan].plan[2].Dienstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Mittwoch"] = {frei: plans[currentShiftPlan].plan[2].Mittwoch.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Donnerstag"] = {frei: plans[currentShiftPlan].plan[2].Donnerstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Freitag"] = {frei: plans[currentShiftPlan].plan[2].Freitag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Samstag"] = {frei: plans[currentShiftPlan].plan[2].Samstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Sonntag"] = {frei: plans[currentShiftPlan].plan[2].Sonntag.frei, anzahl: daysIsActive.anzahl}
      }} else {
        WeekDaysDetails["Montag"] = {frei: plans[currentShiftPlan].plan[2].Montag.frei, anzahl: 0}
        WeekDaysDetails["Dienstag"] = {frei: plans[currentShiftPlan].plan[2].Dienstag.frei, anzahl: 0}
        WeekDaysDetails["Mittwoch"] = {frei: plans[currentShiftPlan].plan[2].Mittwoch.frei, anzahl: 0}
        WeekDaysDetails["Donnerstag"] = {frei: plans[currentShiftPlan].plan[2].Donnerstag.frei, anzahl: 0}
        WeekDaysDetails["Freitag"] = {frei: plans[currentShiftPlan].plan[2].Freitag.frei, anzahl: 0}
        WeekDaysDetails["Samstag"] = {frei: plans[currentShiftPlan].plan[2].Samstag.frei, anzahl: 0}
        WeekDaysDetails["Sonntag"] = {frei: plans[currentShiftPlan].plan[2].Sonntag.frei, anzahl: 0}
      }
      console.log("WeekDateilas", WeekDaysDetails)
      return WeekDaysDetails
      }

    const createNewShiftRowForNewPlan = ({shiftplan, daysIsActive}) => {
      let newShift = {};
      newShift["Wochentag"] = createNewWeekDayValues(daysIsActive)
      let MondayToSunday = createNewMondayToSunday({shiftplan, daysIsActive})
      console.log(MondayToSunday)
      Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element])
      console.log(newShift)
      return newShift
    }

    const createNewWeekDayValues = (daysIsActive) => {
      let Wochentag = {}
      const shiftname = Object.keys(daysIsActive).includes("rolle")
      const beginn = Object.keys(daysIsActive).includes("beginn")
      const ende = Object.keys(daysIsActive).includes("ende")
      if (shiftname && beginn && ende) {
          Wochentag["frei"] = !1 
          Wochentag["ShiftName"] = daysIsActive.rolle 
          Wochentag["ShiftStart"] = daysIsActive.beginn
          Wochentag["ShiftEnd"] = daysIsActive.ende
        } else {
          Wochentag["frei"] = !0 
        }
      return Wochentag
    }

    const addDayToShiftCounter = (value=0) => {
      let schichtentag = String(Number(this.state.daysIsActive.schichtentag) + value)
      return schichtentag
    }

    const createNewMondayToSunday = ({shiftplan, daysIsActive}) => {
      let WeekDaysDetails = {}
      const hasAtLeastOneShift = shiftplan[2].Wochentag !== "Summe" ? !0 : !1;
      const anzahl = Object.keys(daysIsActive).includes("anzahl")
      if (hasAtLeastOneShift && anzahl) {
        console.log("stage 1")
            console.log("stage 2")
            WeekDaysDetails["Montag"] = {frei: shiftplan[2].Montag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Dienstag"] = {frei: shiftplan[2].Dienstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Mittwoch"] = {frei: shiftplan[2].Mittwoch.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Donnerstag"] = {frei: shiftplan[2].Donnerstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Freitag"] = {frei: shiftplan[2].Freitag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Samstag"] = {frei: shiftplan[2].Samstag.frei, anzahl: daysIsActive.anzahl}
            WeekDaysDetails["Sonntag"] = {frei: shiftplan[2].Sonntag.frei, anzahl: daysIsActive.anzahl}
      } else {
        console.log("stage 3")
        WeekDaysDetails["Montag"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Dienstag"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Mittwoch"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Donnerstag"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Freitag"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Samstag"] = {frei: !0, anzahl: 0}
        WeekDaysDetails["Sonntag"] = {frei: !0, anzahl: 0}
      }
      console.log("stage4", WeekDaysDetails)
      return WeekDaysDetails
      }