import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  name: "",
  zeitraum: "",
  plan: [],
  schichtentag: 0,
  tauschanfrage: []
}

const shiftplanSlice = createSlice({
  name: "shiftplan",
  initialState,
  reducers: {
    settingShiftplan(state, action) {
      const shiftplan = action.payload;
      state.id = shiftplan.id;
      state.name = shiftplan.name;
      state.zeitraum = shiftplan.zeitraum;
      state.plan = shiftplan.plan;
      state.schichtentag = shiftplan.schichtentag;
      state.tauschanfrage = shiftplan.tauschanfrage;
    },
    resettingShiftplan(state) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.plan = initialState.plan;
      state.schichtentag = initialState.schichtentag;
      state.tauschanfrage = initialState.tauschanfrage;
      state.zeitraum = initialState.zeitraum;
    },
    settingShiftName(state, action) {
      const shiftName = action.payload.shiftName;
      const index = action.payload.index;
      state.plan[index].Wochentag = shiftName
    },
    deletingCalendarShift(state, action) {
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
    settingMinQufalification(state, action) {
      const shiftMinQualification = action.payload.minQualification;
      const index = action.payload.index;
      const day = action.payload.day;
      const newMinQualification = state.plan[index][day].prio === shiftMinQualification ? false : shiftMinQualification
      state.plan[index][day].prio = newMinQualification;
    },
    settingShiftTrade(state, action) {
      const tradeIndex = action.payload.tradeIndex;
      const newEmployee = action.payload.newEmployee;
      const newEmployeeId = Object.keys(action.payload.newEmployee)[0];
      const newEmployeeName = newEmployee[newEmployeeId]
      const shiftIndex = state.tauschanfrage[tradeIndex].row;
      const shiftDay = state.tauschanfrage[tradeIndex].col;
      const traderId = state.tauschanfrage[tradeIndex].traderId;
      delete state.plan[shiftIndex][shiftDay].setApplicants[traderId];
      state.plan[shiftIndex][shiftDay].setApplicants[newEmployeeId] = newEmployeeName;
      state.tauschanfrage.splice(tradeIndex, 1);
    },
    declineShiftTrade(state, action) {
      state.tauschanfrage.splice(action.payload, 1);
    },
    deleteShift(state, action) {
      state.plan.splice(action.payload, 1);
    },
    settingShiftDescription(state, action) {
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
        state.plan[currentShiftIndex].Wochentag.ShiftEnd = userInput.shiftEnd;
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
    },
    resettingShiftNotice(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      state.plan[index][day].notice = "";
    }
  }
})

export const {
  settingShiftplan,
  resettingShiftplan,
  settingShiftName,
  deletingCalendarShift,
  settingMinQufalification,
  settingShiftTrade,
  declineShiftTrade,
  resettingShiftNotice,
  deleteShift,
  settingShiftDescription
} = shiftplanSlice.actions;

export default shiftplanSlice.reducer