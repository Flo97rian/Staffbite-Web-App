import { createSlice, current } from "@reduxjs/toolkit";
import { stat } from "fs";
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
      if(state.plan.length > 3) {
        state.plan.splice(action.payload, 1);
      }
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
    settingShiftNotice(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const notice = action.payload.shiftNotice;
      if( state.plan[index][day].notice !== notice && notice !== "" ) {
        state.plan[index][day].notice = notice;
      }
    },
    resettingShiftNotice(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      state.plan[index][day].notice = "";
    },
    settingNewShift(state, action) {
      const userInput = action.payload;
      const newShiftRow = {
        Wochentag: {
          ShiftName: userInput.shiftName !==  "" ? userInput.shiftName : "Name",
          ShiftStart: userInput.shiftStart !== "" ? userInput.shiftStart : "00:00",
          ShiftEnd: userInput.shiftEnd !== "" ? userInput.shiftEnd : "24:00",
          ShiftPosition: userInput.shiftPosition !== "" ? userInput.shiftPosition : "",
          frei: true,
        },
        Montag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Dienstag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Mittwoch: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Donnerstag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Freitag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Samstag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
        Sonntag: {frei: true, anzahl: userInput.numberOfEmployees || 0, applicants: {}, applicantsAfterPublish: {}, setApplicants: {}, prio: false, notice: ""},
      }
      const shiftplanLenght = state.plan.length;
      state.plan.splice(shiftplanLenght - 1, 0, newShiftRow)
      //state.plan[index][day].notice = "";
    },
    settingTenantInShift(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const tenantName = action.payload.name;
      state.plan[index][day].setApplicants["TENANT"] = tenantName;
    },
    deleteTenantFromShift(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      delete state.plan[index][day].setApplicants["TENANT"];
    },
    settingShiftActive(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      state.plan[index][day].frei = !state.plan[index][day].frei
    },
    settingApplicants(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const updateApplicants = action.payload.updateApplicants;
      state.plan[index][day].setApplicants = {};
      updateApplicants.forEach(applicantObject => {
        const employeeId = applicantObject.id.substring(1);
        const employeeName = applicantObject.content;
        if(employeeName !== "Leer") {
          state.plan[index][day].setApplicants[employeeId] = employeeName;
        }
      });
    },
    settingApplicant(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const Employee = action.payload.Employee;
      let EmployeeId = Employee.SK;
      let EmployeeName = Employee.name;
      if(!Object.keys(state.plan[index][day]).includes("applicants")) {
        state.plan[index][day].applicants = {};
      }
      if(!Object.keys(state.plan[index][day].applicants).includes(EmployeeId)) {
        state.plan[index][day].applicants[EmployeeId] = EmployeeName;
      }
    },
    settingApplicantAfterPublish(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const Employee = action.payload.Employee;
      let EmployeeId = Employee.SK;
      let EmployeeName = Employee.name;
      if(!Object.keys(state.plan[index][day]).includes("applicantsAfterPublish")) {
        state.plan[index][day].applicantsAfterPublish = {};
      }
      if(!Object.keys(state.plan[index][day].applicantsAfterPublish).includes(EmployeeId)) {
        state.plan[index][day].applicantsAfterPublish[EmployeeId] = EmployeeName;
      }
    },
    deleteApplicantAfterPublish(state, action) {
        const index = action.payload.index;
        const day = action.payload.day;
        let EmployeeId = action.payload.employeeId;
        delete state.plan[index][day].applicantsAfterPublish[EmployeeId]
    },
    deleteApplicant(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      let EmployeeId = action.payload.employeeId;
      delete state.plan[index][day].applicants[EmployeeId]
    },
    applyForShiftTrade(state, action) {
      const tradeIndex = action.payload.tradeIndex;
      const Employee = action.payload.Employee;
      const employeeId = Employee.employeeId;
      const employeeName = Employee.employeeName;
      state.tauschanfrage[tradeIndex].applicants[employeeId] = employeeName;
    },
    removeApplyForShiftTrade(state, action) {
      const tradeIndex = action.payload.tradeIndex;
      const employeeId = action.payload.employeeId;
      delete state.tauschanfrage[tradeIndex].applicants[employeeId];
    },
    deleteTradeShift(state, action) {
      const tradeIndex = action.payload.tradeIndex;
      const employeeId = action.payload.employeeId;
      if(state.tauschanfrage[tradeIndex].traderId === employeeId) {
        state.tauschanfrage.splice(tradeIndex, 1);
      }
    },
    settingTradeShift(state, action) {
      const employeeId = action.payload.employeeId;
      const index = action.payload.index;
      const day = action.payload.day;
      const trade = {
        traderId: employeeId,
        applicants: {},
        row: index,
        col: day,
      }
      const filterTrade = state.tauschanfrage.filter(currentTrade => {
        if( currentTrade.col === trade.col &&
            currentTrade.row === trade.row &&
            currentTrade.traderId === trade.traderId
          )
          {
            return true;
          }
        return false;
      })
      if(!filterTrade.length) {
        state.tauschanfrage.push(trade);
      }
    },
    settingSetApplicant(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      const Employee = action.payload.Employee;
      let EmployeeId = Employee.SK;
      let EmployeeName = Employee.name;
      if(!Object.keys(state.plan[index][day]).includes("setApplicants")) {
        state.plan[index][day].setApplicants = {};
      }
      if(!Object.keys(state.plan[index][day].setApplicants).includes(EmployeeId)) {
        state.plan[index][day].setApplicants[EmployeeId] = EmployeeName;
      }
    },
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
  settingShiftNotice,
  resettingShiftNotice,
  deleteShift,
  settingNewShift,
  settingShiftDescription,
  settingTenantInShift,
  deleteTenantFromShift,
  settingShiftActive,
  settingApplicants,
  settingApplicant,
  deleteApplicant,
  applyForShiftTrade,
  removeApplyForShiftTrade,
  deleteTradeShift,
  settingApplicantAfterPublish,
  deleteApplicantAfterPublish,
  settingSetApplicant,
  settingTradeShift
} = shiftplanSlice.actions;

export default shiftplanSlice.reducer