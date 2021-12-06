import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export default class NewShiftPlan {
    constructor() {
      this.name = "";
      this.plan = [
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
      ];
      this.zeitraum = "01.01.2021 - 07.01.2021";
      this.id = "";
      this.tauschanfrage = [];
      this.schichtentag = "";
    }

    configure (userInput, Dates) {
      let copyPlan = [...this.plan];
      
      function addName(shiftplanStates) {
        return shiftplanStates.name;
      }

      function addId() {
        return uuidv4();
      }
  
      function addSchichtentag (shiftplanStates) {
        let schichtentag = 1;
        if (typeof Number(shiftplanStates.schichtentag) === "number") {
          schichtentag =  shiftplanStates.schichtentag;
        }
        return String(schichtentag);
      }

      function addZeitraum(Dates) {
        let start = "1.1.2021"
        let ende = "7.1.2021"
        if(Dates !== undefined) {
          start = moment(Dates.startDate).format("l")
          ende = moment(Dates.startDate).add(6, "d").format("l")
        }
        return  `${start} - ${ende}`;
      }

      function addDatesToPlan(copyPlan, zeitraum) {
        let datearray = setDatesInPlan(copyPlan, zeitraum);
        copyPlan = [...copyPlan, datearray];
        return copyPlan;
      }

      function setDatesInPlan (copyPlan, zeitraum) {
        let datearray = {}
        let dates = Object.keys(copyPlan[0]);
        let startZeitraum = zeitraum.split(" - ")[0].split(".");
        dates.forEach((item, index) => { 
          if (item !== "Wochentag") {
            datearray[item] = createDateForPlan(index, startZeitraum);
          } else {
            datearray[item] = "Datum";
          }
        });
        return datearray;
      }

      function createDateForPlan (index, startZeitraum) {
        let startDate = new Date(startZeitraum[2], String(Number(startZeitraum[1]) - 1), startZeitraum[0])
        let nextDate = new Date(startZeitraum[2], String(Number(startZeitraum[1]) - 1), startZeitraum[0])
        nextDate.setDate(startDate.getDate() + index);
        let day = nextDate.getUTCDate()
        let month = Number(nextDate.getUTCMonth()) + 1
        let year = nextDate.getUTCFullYear()
        return day + "." + month + "." + year;
      }

      function switchPlansOrder(copyPlan, from , to) {
        [copyPlan[from], copyPlan[to]] = [copyPlan[to], copyPlan[from]];
        return copyPlan;
      }

      function addShiftsToPlan (copyPlan, schichtentag) {
        for (let i = 0; i < Number(schichtentag); i++) {copyPlan.push({});}
        return copyPlan;
      }

      function addDayKeysToShifts (copyPlan) {
        let len = copyPlan.length;
        Object.keys(copyPlan[0]).forEach(key => {for (let i = 1; i < len ; i++) {
          copyPlan[i][key] = {};
        }});
        return copyPlan;
      }

      function createActiveInactiveDay (copyPlan, userInput) {
        let len = copyPlan.length;
        Object.keys(copyPlan[1]).forEach(key => {
          for (let i = 1; i < len; i++) {
            userInput[key] ? copyPlan[i][key].frei = !1 : copyPlan[i][key].frei = !0;
          }
        });
        return copyPlan;
      }

      function addSumHoursToPlan (copyPlan) {
        let hours = {Wochentag: "Summe", Montag: 0, Dienstag: 0, Mittwoch: 0, Donnerstag: 0, Freitag: 0, Samstag: 0, Sonntag: 0};
        copyPlan = [...copyPlan, hours];
        return copyPlan;
      }

      this.name = addName(userInput);
      this.id = addId();
      this.schichtentag = addSchichtentag(userInput);
      //this.zeitraum = addZeitraum(Dates);
      //copyPlan = addDatesToPlan(copyPlan, this.zeitraum);
      //copyPlan = switchPlansOrder(copyPlan, 0, 1);
      addShiftsToPlan(copyPlan, this.schichtentag);
      addDayKeysToShifts(copyPlan);
      createActiveInactiveDay(copyPlan, userInput);
      copyPlan = addSumHoursToPlan(copyPlan);
      this.plan = copyPlan;
    }


    addNewShiftToPlan (userInput) {
      let copyPlan = [...this.plan];
      let indextoinsert = copyPlan.length - 1;

      function createNewShiftRowForNewPlan (copyPlan, userInput) {
        let newShift = {};
        newShift["Wochentag"] = createWeekDayValues(userInput);
        let MondayToSunday = createMondayToSunday(copyPlan, userInput);
        Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element]);
        return newShift;
      };

      
    function createWeekDayValues (userInput) {
      let Wochentag = {};
      Wochentag["frei"] = !1;
      Wochentag["ShiftName"] = userInput.rolle;
      Wochentag["ShiftStart"] = userInput.beginn;
      Wochentag["ShiftEnd"] = userInput.ende;
      return Wochentag;
    };

    function createMondayToSunday (copyPlan, userInput) {
      let WeekDaysDetails = {};
      const hasAtLeastOneShift = copyPlan[2].Wochentag !== "Summe" ? !0 : !1;
      if (hasAtLeastOneShift) {
            WeekDaysDetails["Montag"] = {frei: copyPlan[2].Montag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Dienstag"] = {frei: copyPlan[2].Dienstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Mittwoch"] = {frei: copyPlan[2].Mittwoch.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Donnerstag"] = {frei: copyPlan[2].Donnerstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Freitag"] = {frei: copyPlan[2].Freitag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Samstag"] = {frei: copyPlan[2].Samstag.frei, anzahl: userInput.anzahl};
            WeekDaysDetails["Sonntag"] = {frei: copyPlan[2].Sonntag.frei, anzahl: userInput.anzahl};
      }
      return WeekDaysDetails;
      };

    function addDayToShiftCounter (schichtentag, value=0) {
        schichtentag = String(Number(schichtentag) + value);
        return schichtentag;
      };

      copyPlan.splice(indextoinsert, 0, {});
      let input = createNewShiftRowForNewPlan(copyPlan, userInput);
      copyPlan[indextoinsert] = input;
      this.plan = copyPlan;
      this.schichtentag = addDayToShiftCounter(this.schichtentag, 1);
    }

    getShiftplan() {
      return this.plan
    }

    getAllPlanDetails () {
      return {
        id: this.id,
        name: this.name,
        plan: this.plan,
        schichtentag: this.schichtentag,
        tauschanfrage:this.tauschanfrage,
        zeitraum: this.zeitraum
      }
    }
  }