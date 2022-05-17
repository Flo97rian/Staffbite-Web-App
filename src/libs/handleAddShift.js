import { settingNewShiftplan } from "../reducers/NewShiftPlan";
import store from "../store";

            // Einfügen einer neuen Spalte, wenn der Schichtplan neu erstellt wurde
    export function addShiftToNewShiftPlan({ index, NewShiftPlan, userInput }) {
  if (userInput !== null) {
    let shiftplan = [...NewShiftPlan];
    let indextoinsert = shiftplan.length - 1;
    let input = createNewShiftRowForNewPlan({ shiftplan, userInput });
    shiftplan.splice(indextoinsert, 0, input);
    //let schichtentag = this.addDayToShiftCounter(1)
    store.dispatch(settingNewShiftplan(shiftplan))
  }
}

    const createNewShiftRowForNewPlan = ({shiftplan, userInput}) => {
      let newShift = {};
      newShift["Wochentag"] = createNewWeekDayValues(userInput);
      let MondayToSunday = createNewMondayToSunday({shiftplan, userInput});
      Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element]);
      return newShift;
    };

    const createNewWeekDayValues = (userInput) => {
      let Wochentag = {};
      var shiftname = "rolle" in userInput;
      var beginn = "beginn" in userInput;
      var ende = "ende" in userInput;
      if (shiftname && beginn && ende) {
          Wochentag["frei"] = !1;
          Wochentag["ShiftName"] = userInput.rolle;
          Wochentag["ShiftStart"] = userInput.beginn;
          Wochentag["ShiftEnd"] = userInput.ende;
        } else {
          Wochentag["frei"] = !0;
        }
      return Wochentag;
    };

    const createNewMondayToSunday = ({shiftplan, userInput}) => {
      let WeekDaysDetails = {};
      const hasAtLeastOneShift = shiftplan[2].Wochentag !== "Summe" ? !0 : !1;
      const anzahl = Object.keys(userInput).includes("anzahl");
      if (hasAtLeastOneShift && anzahl) {
            WeekDaysDetails["Montag"] = {frei: shiftplan[2].Montag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Dienstag"] = {frei: shiftplan[2].Dienstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Mittwoch"] = {frei: shiftplan[2].Mittwoch.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Donnerstag"] = {frei: shiftplan[2].Donnerstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Freitag"] = {frei: shiftplan[2].Freitag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Samstag"] = {frei: shiftplan[2].Samstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Sonntag"] = {frei: shiftplan[2].Sonntag.frei, anzahl: userInput.anzahl};
      } else {
        WeekDaysDetails["Montag"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Dienstag"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Mittwoch"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Donnerstag"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Freitag"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Samstag"] = {frei: !0, anzahl: 0};
        WeekDaysDetails["Sonntag"] = {frei: !0, anzahl: 0};
      }
      return WeekDaysDetails;
      };