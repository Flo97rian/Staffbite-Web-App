import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import addDays from "date-fns/addDays";
import { weekdays } from "../constants/Weekdays";

const initalShiftplan = [
  {
    Wochentag: "Wochentag",
    Montag: "Montag",
    Dienstag: "Dienstag",
    Mittwoch: "Mittwoch",
    Donnerstag: "Donnerstag",
    Freitag: "Freitag",
    Samstag: "Samstag",
    Sonntag: "Sonntag",
  },
  {
    Wochentag: {ShiftName: "", ShiftStart: "", ShiftEnd: "", ShiftPosition: "", frei : true},
    Montag: {frei: true, anzahl:  0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Dienstag: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Mittwoch: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Donnerstag: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Freitag: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Samstag: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Sonntag: {frei: true, anzahl: 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
  },
  {
    Wochentag: "Summe",
    Montag: 0,
    Dienstag: 0,
    Mittwoch: 0,
    Donnerstag: 0,
    Freitag: 0,
    Samstag: 0,
    Sonntag: 0,
  }
]
const initialState = {
  id: "",
  name: "",
  zeitraum: "",
  startOfWeek: '',
  endOfWeek: '',
  plan: [],
  schichtentag: 0,
  tauschanfrage: []
}

const newShiftplanSlice = createSlice({
  name: "newShiftplan",
  initialState,
  reducers: {
    createingNewShiftplan(state, action) {
      state.plan = initalShiftplan;
      const closedDays = action.payload.closedDays;
      let settingShiftsPerDay = action.payload.shiftsPerDay || 1;

      //initalize Shiftplan
      state.id = "PLAN#Entwurf#" + uuidv4();
      state.name = action.payload.shiftplanName;
      state.schichtentag = settingShiftsPerDay;
      const sampleShiftRow = initalShiftplan[1];

      //add Shifts
      while (settingShiftsPerDay > 0) {
        state.plan.splice(state.plan.length - 1, 0, sampleShiftRow);
        settingShiftsPerDay -= 1;
      }

      //set closed Days
      const planLength = state.plan.length;
      state.plan.forEach((shiftRow, index ) => {
        if(index !== 0 && index !== planLength - 1) {
          closedDays.forEach(day => {
            state.plan[index][day].frei = false;
          })
        }
      });
    },
    settingNewShiftplan(state, action) {
      const shiftplan = action.payload;
      state.id = shiftplan.id;
      state.name = shiftplan.name;
      state.zeitraum = shiftplan.zeitraum;
      state.startOfWeek = shiftplan.startOfWeek;
      state.endOfWeek = shiftplan.endOfWeek;
      state.plan = shiftplan.plan;
      state.schichtentag = shiftplan.schichtentag;
      state.tauschanfrage = shiftplan.tauschanfrage;
    },
    resettingNewShiftplan(state, action) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.zeitraum = initialState.zeitraum;
      state.startOfWeek = initialState.startOfWeek;
      state.endOfWeek = initialState.endOfWeek;
      state.plan = initialState.plan;
      state.schichtentag = initialState.schichtentag;
      state.tauschanfrage = initialState.tauschanfrage;
    },
    settingNewShiftName(state, action) {
      const shiftName = action.payload.shiftName;
      const index = action.payload.index;
      state.plan[index].Wochentag = shiftName
    },
    deletingNewCalendarShift(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      state.plan[index][day] = {frei: false}

      let isRowEmptyNow = true;
      for (const [key, value] of Object.entries(state.plan[index])) {
        if(key === "Wochentag") return;
        if(value.frei === true) isRowEmptyNow = false;
      }
      if(isRowEmptyNow) {
        state.plan.splice(index, 1);
      }
    },
    settingNewMinQufalification(state, action) {
      const shiftMinQualification = action.payload.minQualification;
      const index = action.payload.index;
      const day = action.payload.day;
      const newMinQualification = state.plan[index][day].prio === shiftMinQualification ? false : shiftMinQualification
      state.plan[index][day].prio = newMinQualification;
    },
    deleteNewShift(state, action) {
        if(state.plan.length > 3) {
          state.plan.splice(action.payload, 1);
        }
    },
    settingNewShiftDescription(state, action) {
      const userInput = action.payload.userInput;
      const currentShiftIndex = action.payload.index;
      if( state.plan[currentShiftIndex].Wochentag.ShiftName !== userInput.shiftName &&
          userInput.shiftName !== "" 
        ) {
          state.plan[currentShiftIndex].Wochentag.ShiftName = userInput.shiftName;
        }

      if( state.plan[currentShiftIndex].Wochentag.ShiftStart !== userInput.shiftStart &&
        userInput.shiftStart !== "" 
      ) {
        state.plan[currentShiftIndex].Wochentag.ShiftStart = userInput.shiftStart;
      }

      if( state.plan[currentShiftIndex].Wochentag.ShiftEnd !== userInput.shiftEnd &&
        userInput.shiftEnd !== "" 
      ) {
        state.plan[currentShiftIndex].Wochentag.ShiftEnd = userInput.shiftEnd === "on" ? true : userInput.shiftEnd;
      }

      if( state.plan[currentShiftIndex].Wochentag.ShiftPosition !== userInput.shiftPosition &&
        userInput.shiftPosition !== "" 
      ) {
        state.plan[currentShiftIndex].Wochentag.ShiftPosition = userInput.shiftPosition;
      }

      const weekdays = Object.keys(state.plan[currentShiftIndex]);
      weekdays.forEach((day) => {
        if(day !== "Wochentag") {
          if( state.plan[currentShiftIndex][day].anzahl !== userInput.numberOfEmployees &&
            userInput.numberOfEmployees !== 0
          ) {
            state.plan[currentShiftIndex][day].anzahl = userInput.numberOfEmployees;
          }
        }
      })

      if( state.plan[currentShiftIndex].Wochentag.ShiftName !== "" && 
          state.plan[currentShiftIndex].Wochentag.ShiftStart !== "" &&
          state.plan[currentShiftIndex].Wochentag.ShiftEnd !== "" &&
          state.plan[currentShiftIndex].Wochentag.ShiftPosition !== ""
        )
        {
          state.plan[currentShiftIndex].Wochentag.frei = false;
        }
    },
    createingNewShiftplanFromExistingShiftplan(state, action) {
      let existingShiftplan = action.payload.existingShiftplan;
      let newStartDate = new Date(action.payload.newStartDate);
      let newEndDate = new Date(action.payload.newEndDate);
      const startString = newStartDate.getDate() + '.' + (Number(newStartDate.getMonth()) + 1)+ '.' + newStartDate.getFullYear();
      const endString = newEndDate.getDate() + '.' + (Number(newEndDate.getMonth()) + 1) + '.' + newEndDate.getFullYear()
      const newZeitraum = startString + ' - ' + endString; 
      let newShiftplan = {
        id: 'PLAN#Entwurf#' + uuidv4(),
        name: existingShiftplan.name,
        zeitraum: newZeitraum,
        startOfWeek: newStartDate,
        endOfWeek: newEndDate,
        plan: [],
        schichtentag: 0,
        tauschanfrage: []
      }
      existingShiftplan.plan.forEach((shiftRow, shiftRowIndex) => {
        if(shiftRow.Wochentag === "Wochentag") {
          newShiftplan.plan.push(shiftRow);
        }

        if(shiftRow.Wochentag === "Datum") {
          let dateShiftRow = {}
          dateShiftRow.Wochentag = "Datum";
          weekdays.forEach((day, index) => {
            const weekDayDate = addDays(newStartDate, index);
            const weekDayDateString = weekDayDate.getDate() + '.' + (Number(weekDayDate.getMonth()) + 1) + '.' + weekDayDate.getFullYear();
            dateShiftRow[day] = weekDayDateString;
          })
          newShiftplan.plan.push(dateShiftRow);
        }



        if(typeof shiftRow.Wochentag === "object") {
          newShiftplan.plan.push({});
          weekdays.forEach(day => {
            let newShift = {
              frei: shiftRow[day].frei,
              anzahl: shiftRow[day].anzahl || 1,
              prio: shiftRow.prio || true,
              applicants: {},
              setApplicants: {},
              applicantsAfterPublish: {},
            };
            newShiftplan.plan[shiftRowIndex][day] = newShift;
            newShiftplan.plan[shiftRowIndex].Wochentag = shiftRow.Wochentag;
          })
        }

        if(shiftRow.Wochentag === "Summe") {
          let newSummeRow = {};
          newSummeRow.Wochentag = "Summe";
          weekdays.forEach(day => {
            newSummeRow[day] = "0";
          });
          newShiftplan.plan.push(newSummeRow);
        }
      })
      state.id = newShiftplan.id;
      state.zeitraum = newShiftplan.zeitraum;
      state.startOfWeek = String(newShiftplan.startOfWeek);
      state.endOfWeek = String(newShiftplan.endOfWeek);
      state.name = newShiftplan.name;
      state.plan = newShiftplan.plan;
      state.schichtentag = newShiftplan.schichtentag;
      state.tauschanfrage = newShiftplan.tauschanfrage;
    },
    createingNewShiftplanInCalendar(state, action) {
      const userInput = action.payload.userInput;
      const day = action.payload.day;
      let newStartDate = new Date(action.payload.newStartDate);
      let newEndDate = new Date(action.payload.newEndDate);
      const startString = newStartDate.getDate() + '.' + (Number(newStartDate.getMonth()) + 1)+ '.' + newStartDate.getFullYear();
      const endString = newEndDate.getDate() + '.' + (Number(newEndDate.getMonth()) + 1) + '.' + newEndDate.getFullYear()
      const newZeitraum = startString + ' - ' + endString; 

      const InputShiftName = userInput.shiftName || "";
      const InputShiftPosition = userInput.shiftPosition || "";
      const InputShiftStart = userInput.shiftStart || "";
      const InputShiftEnd = userInput.shiftEnd === "on" ? true : userInput.shiftEnd;
      const InputShiftsRequiredNumberOfEmployees = userInput.numberOfEmployees || 0;

      let newShiftplan = {
        id: 'PLAN#Entwurf#' + uuidv4(),
        name: userInput.shiftplanName,
        zeitraum: newZeitraum,
        startOfWeek: newStartDate,
        endOfWeek: newEndDate,
        plan: [],
        schichtentag: 0,
        tauschanfrage: []
      }
      let shiftRow = {};
      shiftRow.Wochentag = {
        ShiftName: InputShiftName,
        ShiftStart: InputShiftStart,
        ShiftEnd: InputShiftEnd,
        ShiftPosition: InputShiftPosition,
        frei: false,
      }

      let dateShiftRow = {}
      dateShiftRow.Wochentag = "Datum";
      weekdays.forEach((day, index) => {
        const weekDayDate = addDays(newStartDate, index);
        const weekDayDateString = weekDayDate.getDate() + '.' + (Number(weekDayDate.getMonth()) + 1) + '.' + weekDayDate.getFullYear();
        dateShiftRow[day] = weekDayDateString;
      })
      newShiftplan.plan.push(dateShiftRow);

      let weekdaysRow = {};
      weekdaysRow.Wochentag = "Wochentag";
      weekdays.forEach(weekday => {
        weekdaysRow[weekday] = String(weekday);
      });
      newShiftplan.plan.push(weekdaysRow);
      
      weekdays.forEach(weekday => {
        if(day === weekday) {
          shiftRow[weekday] = {frei: true, anzahl:  InputShiftsRequiredNumberOfEmployees, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""};
        }

        if(day !== weekday) {
          shiftRow[weekday] = {frei: false, anzahl:  0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""};
        }
      });

      newShiftplan.plan.push(shiftRow);

      let newSummeRow = {};
      newSummeRow.Wochentag = "Summe";
      weekdays.forEach(day => {
        newSummeRow[day] = "0";
      });
      newShiftplan.plan.push(newSummeRow);

      state.id = newShiftplan.id;
      state.zeitraum = newShiftplan.zeitraum;
      state.startOfWeek = String(newShiftplan.startOfWeek);
      state.endOfWeek = String(newShiftplan.endOfWeek);
      state.name = newShiftplan.name;
      state.plan = newShiftplan.plan;
      state.schichtentag = newShiftplan.schichtentag;
      state.tauschanfrage = newShiftplan.tauschanfrage;
    }
  }
})

export const {
  createingNewShiftplan,
  settingNewShiftplan,
  resettingNewShiftplan,
  settingNewShiftName,
  deletingNewCalendarShift,
  settingNewMinQufalification,
  deleteNewShift,
  settingNewShiftDescription,
  createingNewShiftplanFromExistingShiftplan,
  createingNewShiftplanInCalendar
} = newShiftplanSlice.actions;

export default newShiftplanSlice.reducer