import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initalShiftplan = [
  {
    Wochentag: "Wochentag",
    Montag: "Monatg",
    Dienstag: "Dienstag",
    Mittwoch: "Mittwoch",
    Donnerstag: "Donnerstag",
    Freitag: "Freitag",
    Samstag: "Samstag",
    Sonntag: "Sonntag",
  },
  {
    Wochentag: {ShiftName: "", ShiftStart: "", ShiftEnd: "", ShiftPosition: "", frei : true},
    Montag: {frei : true, anzahl: 1},
    Dienstag: {frei : true, anzahl: 1},
    Mittwoch: {frei : true, anzahl: 1},
    Donnerstag: {frei : true, anzahl: 1},
    Freitag: {frei : true, anzahl: 1},
    Samstag: {frei : true, anzahl: 1},
    Sonntag: {frei : true, anzahl: 1},
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
      state.plan = shiftplan.plan;
      state.schichtentag = shiftplan.schichtentag;
      state.tauschanfrage = shiftplan.tauschanfrage;
    },
    resettingNewShiftplan(state, action) {
      state = initialState;
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
        state.plan[currentShiftIndex].Wochentag.ShiftEnd = userInput.shiftEnd === "on" ? "open End" : userInput.shiftEnd;
      }

      if( state.plan[currentShiftIndex].Wochentag.ShiftPosition !== userInput.shiftPosition &&
        userInput.shiftPosition !== "" 
      ) {
        state.plan[currentShiftIndex].Wochentag.ShiftPosition = userInput.shiftPosition;
      }

      const weekdays = Object.keys(state.plan[currentShiftIndex]);
      weekdays.forEach((day) => {
        if(day !== "Wochentag" && state.plan[currentShiftIndex][day].frei !== false) {
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
  settingNewShiftDescription
} = newShiftplanSlice.actions;

export default newShiftplanSlice.reducer