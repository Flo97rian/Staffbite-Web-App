import { createSlice, current } from "@reduxjs/toolkit";
import millisecondsToHours from 'date-fns/millisecondsToHours'
import { weekdays } from "../constants/Weekdays";
import shiftplanStates from "../constants/ShiftplanDefault";
import getNumberOfEmployees from "../libs/getNumberOfEmployees";
const initialState = {
  id: "",
  name: "",
  startOfWeek: "",
  endOfWeek: "",
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
      state.startOfWeek = shiftplan.startOfWeek;
      state.endOfWeek = shiftplan.endOfWeek;
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
      state.startOfWeek = initialState.startOfWeek;
      state.endOfWeek = initialState.endOfWeek;
    },
    settingShiftName(state, action) {
      const shiftName = action.payload.shiftName;
      const index = action.payload.index;
      state.plan[index].Wochentag = shiftName
    },
    deletingCalendarShift(state, action) {
      const index = action.payload.index;
      const day = action.payload.day;
      state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}

      let isRowEmptyNow = true;
      for (const [key, value] of Object.entries(state.plan[index])) {
        if(key === "Wochentag") return;
        if(value.frei === true) isRowEmptyNow = false;
      }
      if(isRowEmptyNow) {
        state.plan.splice(index, 1);
      }
    },
    deletingCalendarShifts(state, action) {
      const index = action.payload.index;
      const customDays = action.payload.customDays;
      customDays.forEach(day => {
        state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}
      })

      let isRowEmptyNow = true;
      for (const [key, value] of Object.entries(state.plan[index])) {
        if(key !== "Wochentag") {
          if(value.frei === true) {
            isRowEmptyNow = false
          };
        };
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
          ShiftName: userInput.shiftName !==  "" ? userInput.shiftName : "",
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
    settingShiftTime(state, action) {
      const index = action.payload.index || false;
      const day = action.payload.day || false;
      let startDeltaInMilliseconds = action.payload.startDeltaInMilliseconds;
      let endDeltaInMilliseconds = action.payload.endDeltaInMilliseconds;
      const shiftChangeInDays = action.payload.shiftChangeInDays;
      const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

      if(index && day) {

        const ShiftStart = state?.plan[index]?.Wochentag?.ShiftStart || "";
        const ShiftEnd = state?.plan[index]?.Wochentag?.ShiftEnd || "";
        const ShiftName = state?.plan[index]?.Wochentag?.ShiftName || "";
        const ShiftPosition = state?.plan[index]?.Wochentag?.ShiftPosition || "";
      
      //fromatting new ShiftStart and ShiftEnd
      let unformattedStart;
      let unformattedEnd;

      if(startDeltaInMilliseconds !== 0) {
        unformattedStart = String(Number(ShiftStart.split(":")[0]) + millisecondsToHours(startDeltaInMilliseconds)) + ":00"
      }

      if(startDeltaInMilliseconds === 0) {
        unformattedStart = ShiftStart;
      }

      if(ShiftEnd !== true) {
        if(endDeltaInMilliseconds !== 0) {
          unformattedEnd = String(Number(ShiftEnd.split(":")[0]) + millisecondsToHours(endDeltaInMilliseconds)) + ":00"
        }

        if(endDeltaInMilliseconds === 0) {
          unformattedEnd = ShiftEnd;
        }
      }

      if(ShiftEnd === true) {
        unformattedEnd = "24:00";
      }

      const start = unformattedStart[1] === ":" ? "0" + unformattedStart : unformattedStart;
      const end = unformattedEnd[1] === ":" ? "0" + unformattedEnd : unformattedEnd;

      //check if ShiftRow with spezifications exists
      const haveMatchingRow = state.plan.filter(row => {
        if (  row.Wochentag.ShiftName === ShiftName &&
              row.Wochentag.ShiftPosition === ShiftPosition &&
              row.Wochentag.ShiftStart === start &&
              row.Wochentag.ShiftEnd === end
        ) return true;
        return false;
      })

      const changeDayTo = shiftChangeInDays !== 0 ? weekdays[weekdays.indexOf(day) + shiftChangeInDays] : day
      // add Shift to existing Shiftrow
      if(haveMatchingRow.length) {
          const targetIndex = state.plan.indexOf(haveMatchingRow[0]);
          state.plan[targetIndex][changeDayTo] = state.plan[index][day];
          state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}
      }

      // create and add Shift to new Shiftrow
      if(!haveMatchingRow.length) {
        let shiftRow = {}
        const shift = state.plan[index][day];
        const currentShiftRow = state.plan[index];
        for (let [shiftday, shift] of Object.entries(currentShiftRow)) {
          shiftRow[shiftday] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}
        };
        let shiftWeekdayDetails = {...state.plan[index].Wochentag};
        shiftWeekdayDetails.ShiftStart = start;
        shiftWeekdayDetails.ShiftEnd = end;
        shiftRow["Wochentag"] = shiftWeekdayDetails;
        shiftRow[changeDayTo] = shift;
        const planLength = state.plan.length;
        state.plan.splice(planLength - 1, 0, shiftRow)
        state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}

      }

      //check if old Shiftrow has other Shifts
      let hasOtherShiftsInRow = false;
      for (let [shiftday, shift] of Object.entries(state.plan[index])) {
        if(shiftday !== "Wochentag" && shift.frei === true) {
          hasOtherShiftsInRow = true;
        }
      };
      // delte shiftrow if no other Shift in row
      if(!hasOtherShiftsInRow) {
        state.plan.splice(index, 1)
      }
      };
    },
    settingCalenderShift(state, action) {
      const index = action.payload.index || false;
      const day = action.payload.day || false;
      const userInput = action.payload.userInput;
      const changeAllSelectedDays = action.payload.changeAllSelectedDays;
      const DnDRef = action.payload.DnDRef;
      const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

      if(index && day) {
      //getCurrent
      //ShiftName
      //ShiftPosition
      //ShiftStart
      //ShiftEnd
      //NumberOfEmployees
      //Notice
      //MinQualifications
      //newSetApplicants
      const ShiftStart = state?.plan[index]?.Wochentag?.ShiftStart || "";
      const ShiftEnd = state?.plan[index]?.Wochentag?.ShiftEnd || "";
      const ShiftName = state?.plan[index]?.Wochentag?.ShiftName || "";
      const ShiftPosition = state?.plan[index]?.Wochentag?.ShiftPosition || "";
      const ShiftsRequiredNumberOfEmployees = state?.plan[index][day]?.anzahl || 0;
      const ShiftsNotice = state?.plan[index][day]?.notice || "";
      const CurrentSetApplicants = state?.plan[index][day]?.setApplicants || {};

      //getChanges
      //ShiftName
      //ShiftPosition
      //ShiftStart
      //ShiftEnd
      //NumberOfEmployees
      //Notice
      //MinQualifications
      //newSetApplicants
      const InputShiftName = userInput.shiftName || "";
      const InputShiftPosition = userInput.shiftPosition || "";
      const InputShiftStart = userInput.shiftStart || "";
      const InputShiftEnd = userInput.shiftEnd === "on" ? true : userInput.shiftEnd;
      const InputShiftsRequiredNumberOfEmployees = userInput.numberOfEmployees || 0;
      const InputShiftsNotice = userInput.shiftNotice || "";
      const InputShiftDayly = typeof userInput.shiftIsDayly === "boolean" ? userInput.shiftIsDayly : false;
      const InputShiftCustomDays = userInput.shiftCustomDays.length ? userInput.shiftCustomDays : [];
      let InputSetApplicants = DnDRef || [];


      const getShiftNameChanged = InputShiftName !== ShiftName && InputShiftName !== "";
      const getShiftPositionChanged = InputShiftPosition !== ShiftPosition && InputShiftPosition !== "";
      const getShiftStartChanged = InputShiftStart !== ShiftStart && InputShiftStart !== "";
      const getShiftEndChanged = InputShiftEnd !== ShiftEnd && InputShiftEnd !== "";
      const getShiftsNumberOfEmployeesChanged = InputShiftsRequiredNumberOfEmployees !== ShiftsRequiredNumberOfEmployees && InputShiftsRequiredNumberOfEmployees !== 0;
      const getShiftNoticeChanged = InputShiftsNotice !== ShiftsNotice && InputShiftsNotice !== "";


      const getIsShiftDayly = () => {
        let isDayly = true;
        const currentShiftRow = state.plan[index];
        for (let [shiftday, shift] of Object.entries(currentShiftRow)) {
            if (shiftday !== "Wochentag") {
              if (shift.frei !== true) 
                  isDayly = false;
            }
        }; 
        return isDayly; 
      }

      const getActiveDays = () => {
        let activeDays = [];
        const currentShiftRow = state.plan[index];
        for (let [shiftday, shift] of Object.entries(currentShiftRow)) {
            if (shiftday !== "Wochentag") {
              if (shift.frei !== false) 
                activeDays.push(shiftday);
            }
        }; 
        return activeDays; 
      }

      const getCurrentWeekDetails = () => {
        return state.plan[index].Wochentag;
      }

      const getTargetWeekDetails = (targetIndex) => {
        return state.plan[targetIndex].Wochentag;
      }

      const getDetfaultWeekdaysForCurrentIndex = () => {
        for (let [shiftday, shift] of Object.entries(state.plan[index])) {
          state.plan[index][shiftday] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}
        };
      }

      const getDefaultShiftRow = () => {
        let shiftRow = {};
        weekdays.forEach(day => {
          shiftRow[day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}
        });
        return shiftRow;

      }

      const getDetailsFromShift = (day) => {
        return state.plan[index][day];
      }

      const getAllApplicantsDetailsOfShift = (index, day) => {
        const applicants = state.plan[index][day].applicants;
        const setApplicants = state.plan[index][day].setApplicants;
        const applicantsAfterPublish = state.plan[index][day].applicantsAfterPublish;
        return {applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish}
      }

      const getExistingShiftRow = () => {
        const {newShiftName, newShiftPosition, newShiftStart, newShiftEnd } = getChangedWeekdayDetails();
        const haveMatchingRow = state.plan.filter(row => {
          if (  row.Wochentag.ShiftName === newShiftName &&
                row.Wochentag.ShiftPosition === newShiftPosition &&
                row.Wochentag.ShiftStart === newShiftStart &&
                row.Wochentag.ShiftEnd === newShiftEnd
          ) return true;
          return false;
        })
        return haveMatchingRow;
      }

      const getChangedWeekdayDetails = () => {
        const newShiftName = getShiftNameChanged ? InputShiftName : ShiftName;
        const newShiftPosition = getShiftPositionChanged ? InputShiftPosition : ShiftPosition;
        const newShiftStart = getShiftStartChanged ? InputShiftStart : ShiftStart;
        const newShiftEnd = getShiftEndChanged ? InputShiftEnd : ShiftEnd;
        return {newShiftName: newShiftName, newShiftPosition: newShiftPosition, newShiftStart: newShiftStart, newShiftEnd: newShiftEnd};
      }

      const getChangedShiftNotice = () => {
        const newNotice = getShiftNoticeChanged ? InputShiftsNotice : state.plan[index][day].notice;
        return {newNotice: newNotice};
      }

      const getChangedNumberOfEmployees = () => {
        const newNumberOfEmployees = getShiftsNumberOfEmployeesChanged ? InputShiftsRequiredNumberOfEmployees : state.plan[index][day].anzahl;
        return {newNumberOfEmployees: newNumberOfEmployees};
      }

      const getChangedMinQualification = () => {
        const newMinQualification = state.plan[index][day].prio;
        return {newMinQualification: newMinQualification};
      }

      const createNewWeekDayDetails = () => {
        const {newShiftName, newShiftPosition, newShiftStart, newShiftEnd } = getChangedWeekdayDetails();
        const WeekdayDetails = {
          ShiftName: newShiftName,
          ShiftPosition: newShiftPosition,
          ShiftStart: newShiftStart,
          ShiftEnd: newShiftEnd,
          frei: true,
        }
        return WeekdayDetails;
      }

      const createNewShiftRow = () => {
        let shiftRow = getDefaultShiftRow();
        shiftRow["Wochentag"] = createNewWeekDayDetails();
        return shiftRow;
      }

      const setDetailsForSelectedDays = (shiftRow) => {
        const { newNumberOfEmployees } = getChangedNumberOfEmployees();
        const { newNotice } = getChangedShiftNotice();
        const { newMinQualification } = getChangedMinQualification();
        InputShiftCustomDays.forEach((customDay) => {
          const {applicants, applicantsAfterPublish, setApplicants} = getAllApplicantsDetailsOfShift(index, day)
          const newDay = {frei: true, applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish, prio: newMinQualification, notice: newNotice, anzahl: newNumberOfEmployees}
          shiftRow[customDay] = newDay;
        });
        return shiftRow;
      }

      const resettingDetailsInCurrentRow = () => {
        InputShiftCustomDays.forEach((customDay) => {
          state.plan[index][customDay] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0};
        });
      }

      const setDetailsForNewDaysInExistingRow = (targetIndex) => {
        const { newNumberOfEmployees } = getChangedNumberOfEmployees();
        const { newNotice } = getChangedShiftNotice();
        const { newMinQualification } = getChangedMinQualification();
        const newDays = InputShiftCustomDays.filter(customDay => getCurrentActiveDays.includes(customDay));
        newDays.forEach((customDay) => {
          const newShift = state.plan[index][day];
          newShift.notice = newNotice;
          newShift.anzahl = newNumberOfEmployees;
          newShift.prio = newMinQualification; 
          state.plan[targetIndex][customDay] = newShift;
        });
      }

      const getTargetRowIndex = (haveMatchingRow) => {
        const targetIndex = state.plan.indexOf(haveMatchingRow[0]);
        return targetIndex;
      }

      const setDetailsForSelectedDaysInIndex = () => {
        const { newNumberOfEmployees } = getChangedNumberOfEmployees();
        const { newNotice } = getChangedShiftNotice();
        const { newMinQualification } = getChangedMinQualification();
        InputShiftCustomDays.forEach((customDay) => {
          const {applicants, applicantsAfterPublish, setApplicants} = getAllApplicantsDetailsOfShift(index, customDay)
          state.plan[index][customDay] = {frei: true, applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish, prio: newMinQualification, notice: newNotice, anzahl: newNumberOfEmployees}
        });
      }

      const setDetailsForSelectedDaysInTargetIndex = (targetIndex) => {
        const { newNumberOfEmployees } = getChangedNumberOfEmployees();
        const { newNotice } = getChangedShiftNotice();
        const { newMinQualification } = getChangedMinQualification();
        InputShiftCustomDays.forEach((customDay) => {
          const {applicants, applicantsAfterPublish, setApplicants} = getAllApplicantsDetailsOfShift(index, customDay)
          state.plan[targetIndex][customDay] = {frei: true, applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish, prio: newMinQualification, notice: newNotice, anzahl: newNumberOfEmployees}
        });
      }


      const getCurrentShiftIsDayly = getIsShiftDayly()
      const getCurrentActiveDays = getActiveDays();

      const changeCustomShift = () => {
        const haveMatchingRow = getExistingShiftRow();

        // create and add Shift to new Shiftrow
        if(!haveMatchingRow.length) {
          let shiftRow = createNewShiftRow();

          if(changeAllSelectedDays) {
            shiftRow = setDetailsForSelectedDays(shiftRow);
            resettingDetailsInCurrentRow();
            const planLength = state.plan.length;
            state.plan.splice(planLength - 1, 0, shiftRow)
          }
        }

        if(haveMatchingRow.length) {
          const targetIndex = getTargetRowIndex(haveMatchingRow);

          if(!changeAllSelectedDays) {
            state.plan[targetIndex][day] = state.plan[index][day];
            state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0};

          }

          if(changeAllSelectedDays) {
            setDetailsForSelectedDaysInTargetIndex(targetIndex);
            setDetailsForSelectedDaysInIndex();
          }
        }

        if(!getActiveDays().length) {
          state.plan.splice(index, 1);
        }
      }

      const reduceToSingleShift = () => {
        InputShiftCustomDays.forEach((customDay) => {
          state.plan[index][customDay] = state.plan[index][day];
        });
        const remainingDays = weekdays.filter(day => !InputShiftCustomDays.includes(day));
        remainingDays.filter(remainingDay => remainingDay !== day);

        remainingDays.forEach(remainingDay => {
          state.plan[index][remainingDay] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0}  
        })
      }

      const settingShiftDetailsForSingleShift = () => {
        const {newShiftName, newShiftPosition, newShiftStart, newShiftEnd } = getChangedWeekdayDetails();
        const newNumberOfEmployees = getShiftsNumberOfEmployeesChanged ? InputShiftsRequiredNumberOfEmployees : state.plan[index][day].anzahl
        const newNotice = getShiftNoticeChanged ? InputShiftsNotice : state.plan[index][day].notice;

        const newDetails = {
          ShiftName: newShiftName,
          ShiftPosition: newShiftPosition,
          ShiftStart: newShiftStart,
          ShiftEnd: newShiftEnd,
          frei: false,
        }
        state.plan[index].Wochentag = newDetails;
        state.plan[index][day].anzahl = newNumberOfEmployees;
        state.plan[index][day].notice = newNotice;

      }

      const settingShiftDetailsForDaylyShift = () => {
        const newShiftName = getShiftNameChanged ? InputShiftName : ShiftName;
        const newShiftPosition = getShiftPositionChanged ? InputShiftPosition : ShiftPosition;
        const newShiftStart = getShiftStartChanged ? InputShiftStart : ShiftStart;
        const newShiftEnd = getShiftEndChanged ? InputShiftEnd : ShiftEnd;

        const newDetails = {
          ShiftName: newShiftName,
          ShiftPosition: newShiftPosition,
          ShiftStart: newShiftStart,
          ShiftEnd: newShiftEnd,
          frei: false,
        }
        state.plan[index].Wochentag = newDetails;

      }

      const changeDaylyShift = () => {
        const newNumberOfEmployees = getShiftsNumberOfEmployeesChanged ? InputShiftsRequiredNumberOfEmployees : state.plan[index][day].anzahl
        const newNotice = getShiftNoticeChanged ? InputShiftsNotice : state.plan[index][day].notice;
        const newMinQualification = state.plan[index][day].prio;
        weekdays.forEach(day => {
          const newDay = {
            frei: true,
            prio: false,
            applicants: {},
            applicantsAfterPublish: {},
            setApplicants: {},
            anzahl: 0,
            notice: "",
          }
          state.plan[index][day] = newDay
          state.plan[index][day].anzahl = newNumberOfEmployees;
          state.plan[index][day].notice = newNotice;
          state.plan[index][day].prio = newMinQualification;
        })
        settingShiftDetailsForDaylyShift()
      }

      const changeSingleShift = () => {
        const haveMatchingRow = getExistingShiftRow();
        
        if(haveMatchingRow.length) {
          const targetIndex = getTargetRowIndex(haveMatchingRow);
          const { newNumberOfEmployees } = getChangedNumberOfEmployees();
          const { newNotice } = getChangedShiftNotice();
          const { newMinQualification } = getChangedMinQualification();
          const {applicants, applicantsAfterPublish, setApplicants} = getAllApplicantsDetailsOfShift(index, day)
          state.plan[targetIndex][day] = {frei: true, applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish, prio: newMinQualification, notice: newNotice, anzahl: newNumberOfEmployees}  
        }

        if(!haveMatchingRow.length) {
          const { newNumberOfEmployees } = getChangedNumberOfEmployees();
          const { newNotice } = getChangedShiftNotice();
          const { newMinQualification } = getChangedMinQualification();
          let shiftRow = createNewShiftRow();

          //setting new day
          const {applicants, applicantsAfterPublish, setApplicants} = getAllApplicantsDetailsOfShift(index, day)
          shiftRow[day] = {frei: true, applicants: applicants, setApplicants: setApplicants, applicantsAfterPublish: applicantsAfterPublish, prio: newMinQualification, notice: newNotice, anzahl: newNumberOfEmployees};
          // resetting old day
          state.plan[index][day] = {frei: false, applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false, notice: "", anzahl: 0};
          const planLength = state.plan.length;
          state.plan.splice(planLength - 1, 0, shiftRow)
        }
      }

      const settingSetApplicants = (index) => {
        state.plan[index][day].setApplicants = {};
        InputSetApplicants.forEach(applicantObject => {
        const employeeId = applicantObject.id.substring(1);
        const employeeName = applicantObject.content;
        if(employeeName !== "Leer") {
          state.plan[index][day].setApplicants[employeeId] = employeeName;
        }
      });

      }
      const changeCurrentNotice = () => {
        state.plan[index][day].notice = getShiftNoticeChanged ? InputShiftsNotice : ShiftsNotice;
      }

      const changeCurrentNumberOfEmployees = () => {
        state.plan[index][day].anzahl = getShiftsNumberOfEmployeesChanged ? InputShiftsRequiredNumberOfEmployees : ShiftsRequiredNumberOfEmployees;
      }


      if(InputShiftDayly && !getCurrentShiftIsDayly && changeAllSelectedDays) {
        changeDaylyShift();
      }

      if(InputShiftCustomDays.length > 1 && changeAllSelectedDays) {
        changeCustomShift();
      }

      if(InputShiftCustomDays.length > 1 && !changeAllSelectedDays) {
        changeSingleShift();
      }
      if(InputShiftCustomDays.length === 1 && !changeAllSelectedDays) {
        reduceToSingleShift();
        settingShiftDetailsForSingleShift();

      }

      }
  },
  addCalendarShift(state, action) {
    const userInput = action.payload.userInput;
    const day = action.payload.day;

    const InputShiftName = userInput.shiftName;
    const InputShiftPosition = userInput.shiftPosition === "" ? userInput.positions[0] : userInput.shiftPosition;
    const InputShiftStart = userInput.shiftStart;
    const InputShiftEnd = userInput.shiftEnd;
    const InputShiftsRequiredNumberOfEmployees = userInput.numberOfEmployees;
    if(
      InputShiftName &&
      InputShiftPosition &&
      InputShiftStart &&
      InputShiftEnd
      ) {
        let shiftRow = {}
        shiftRow.Wochentag = {
          ShiftName: InputShiftName,
          ShiftStart: InputShiftStart,
          ShiftEnd: InputShiftEnd,
          ShiftPosition: InputShiftPosition,
          frei: false
        }
        weekdays.forEach(day => {
          shiftRow[day] = {frei: false, anzahl: Number(InputShiftsRequiredNumberOfEmployees), notice: "", applicants: {}, setApplicants: {}, applicantsAfterPublish: {}, prio: false};
        });
        shiftRow[day] = {...shiftRow[day], frei: true, anzahl: Number(InputShiftsRequiredNumberOfEmployees), notice: ""}
        const PlanLength = state.plan.length;
        state.plan.splice(PlanLength - 1, 0, shiftRow)
    }

  }
}});

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
  settingTradeShift,
  settingShiftTime,
  settingCalenderShift,
  addCalendarShift,
  deletingCalendarShifts,
} = shiftplanSlice.actions;

export default shiftplanSlice.reducer