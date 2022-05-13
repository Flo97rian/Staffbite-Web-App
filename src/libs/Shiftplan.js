import _ from "lodash";
import de from "date-fns/locale/de";
import shiftplanStates from "../constants/ShiftplanDefault";
import { weekdays } from "../constants/Weekdays";

export default class ShiftPlan {
    constructor(plan) {
      this.plan = plan.plan;
      this.name = plan.name;
      this.zeitraum = plan.zeitraum;
      this.id = plan.id;
      this.tauschanfrage = plan.tauschanfrage;
      this.schichtentag = plan.schichtentag;
    }

    updateName(userInput) {
      this.name = userInput.name;
    }

    updateCalendarShiftTime(info) {
      const day = _.get(info, "event._def.extendedProps.day", false);
      const index = _.get(info, "event._def.extendedProps.row", false);
      if(_.isBoolean(index) || _.isBoolean(day)) 
      return null
      // get Details of current Shift
      const ShiftStart = _.get(this.plan, "[" + index + "].Wochentag.ShiftStart", "")
      const ShiftEnd = _.get(this.plan, "[" + index + "].Wochentag.ShiftEnd", "")
      const ShiftName = _.get(this.plan, "[" + index + "].Wochentag.ShiftName", "")
      const ShiftPosition = _.get(this.plan, "[" + index + "].Wochentag.ShiftPosition", "")

      //get Time changes
      let getShiftStartChangeInMilliseconds = _.get(info, "startDelta.milliseconds", 0);
      let getShiftEndChangeInMilliseconds = _.get(info, "endDelta.milliseconds", 0);
      const getShiftChangeInDays = _.get(info, "delta.days", 0);

      //determin if just ShiftEnd changed or ShiftStart and ShiftEnd
      if (getShiftStartChangeInMilliseconds === 0 && getShiftEndChangeInMilliseconds === 0) {
        getShiftStartChangeInMilliseconds = _.get(info, "delta.milliseconds", 0);
        getShiftEndChangeInMilliseconds = _.get(info, "delta.milliseconds", 0);
      }

      //fromatting new ShiftStart and ShiftEnd
      let unformattedStart = getShiftStartChangeInMilliseconds !== 0 ? String(Number(ShiftStart.split(":")[0]) + (getShiftStartChangeInMilliseconds / 1000) / 3600) + ":00" : ShiftStart;
      let unformattedEnd = getShiftEndChangeInMilliseconds !== 0 ? String(Number(ShiftEnd.split(":")[0]) + (getShiftEndChangeInMilliseconds / 1000) / 3600) + ":00" : ShiftEnd;
      const start = unformattedStart[1] === ":" ? "0" + unformattedStart : unformattedStart;
      const end = unformattedEnd[1] === ":" ? "0" + unformattedEnd : unformattedEnd;

      //valide new ShiftStart and new ShiftEnd
      if(_.isBoolean(start) || _.isBoolean(end)) 
        return null

      // validate ShiftStart and ShiftEnd changed
      if(_.isEqual(start, ShiftStart) && _.isEqual(end, ShiftEnd) && getShiftChangeInDays === 0) 
        return null

      //check if ShiftRow with spezifications exists
      const haveMatchingRow = _.filter(this.plan, function (value, index) {
        if( _.get(value, "Wochentag.ShiftName", "") === ShiftName &&
            _.get(value, "Wochentag.ShiftPosition", "") === ShiftPosition &&
            _.get(value, "Wochentag.ShiftStart", "") === start &&
            _.get(value, "Wochentag.ShiftEnd", "") === end
        ) return true;
        return false;
      })

      const changeDayTo = getShiftChangeInDays !== 0 ? weekdays[_.indexOf(weekdays, day) + getShiftChangeInDays] : day
      // add Shift to existing Shiftrow
      if(!_.isEmpty(haveMatchingRow)) {
          const targetIndex = _.indexOf(this.plan, haveMatchingRow[0]);
          this.plan[targetIndex][changeDayTo] = this.plan[index][day];
          this.plan[index][day] = {frei: false}
      }

      // create and add Shift to new Shiftrow
      if(_.isEmpty(haveMatchingRow)) {
        let shiftRow = {}
        const shift = _.get(this.plan, "[" + index + "][" +  day + "]", {})
        const currentShiftRow = _.get(this.plan, "[" + index + "]", {})
        _.forIn(currentShiftRow, function (value, key) {
          shiftRow[key] = {frei: false};
        })
        let shiftWeekdayDetails = {..._.get(this.plan, "[" + index + "].Wochentag", {})}
        shiftWeekdayDetails.ShiftStart = start;
        shiftWeekdayDetails.ShiftEnd = end;
        shiftRow["Wochentag"] = shiftWeekdayDetails;
        shiftRow[changeDayTo] = shift;
        const planLength = this.plan.length;
        this.plan.splice(planLength - 1, 0, shiftRow)
        this.plan[index][day] = {frei: false};

      }

      //check if old Shiftrow has other Shifts
      let hasOtherShiftsInRow;
      _.forIn(this.plan[index], function(value, key) {
        if(key !== "Wochentag" && value.frei === true) {
          hasOtherShiftsInRow = true;
        }
      })

      // delte shiftrow if no other Shift in row
      if(!_.isBoolean(hasOtherShiftsInRow)) {
        this.plan.splice(index, 1)
      }

}

    updateCalendarShift(userInput, shiftSlot, DnDRef) {
      const index = _.get(shiftSlot, "row", false);
      const day = _.get(shiftSlot, "col", false);

      if(_.isBoolean(index) || _.isBoolean(day)) 
        return null
      //getCurrent
      //ShiftName
      //ShiftPosition
      //ShiftStart
      //ShiftEnd
      //NumberOfEmployees
      //Notice
      //MinQualifications
      //newSetApplicants
      const ShiftName = _.get(this.plan, "[" + index + "].Wochentag.ShiftName", "")
      const ShiftPosition = _.get(this.plan, "[" + index + "].Wochentag.ShiftPosition", "")
      const ShiftStart = _.get(this.plan, "[" + index + "].Wochentag.ShiftStart", "")
      const ShiftEnd = _.get(this.plan, "[" + index + "].Wochentag.ShiftEnd", "")
      const ShiftsRequiredNumberOfEmployees = _.get(this.plan, "[" + index + "][" + day + "].anzahl", 0)
      const ShiftsNotice = _.get(this.plan, "[" + index + "][" + day + "].notice", "")
      const CurrentSetApplicants = _.get(this.plan, "[" + index + "][" + day + "].setApplicants", {});

      //getChanges
      //ShiftName
      //ShiftPosition
      //ShiftStart
      //ShiftEnd
      //NumberOfEmployees
      //Notice
      //MinQualifications
      //newSetApplicants
      const InputShiftName = _.get(userInput, "rolle", "");
      const InputShiftPosition = _.get(userInput, "position", "");
      const InputShiftStart = _.get(userInput, "beginn", "");
      const InputShiftEnd = _.get(userInput, "ende", "")
      const InputShiftsRequiredNumberOfEmployees = _.get(userInput, "anzahl", 0);
      const InputShiftsNotice = _.get(userInput, "notice", "");
      const InputShiftDayly = _.get(userInput, "dayly", false);
      let InputSetApplicants = _.get(DnDRef, "current", []);

      const changeShiftWeekDayDetail = (target, changeValue) => {
        this.plan = _.map(this.plan, function (value, key) {
          if(key === index) {
            value.Wochentag[target] = changeValue;
          }
          return value;
        });
      };

      const changeShiftsDetail = (target, changeValue) => {
        this.plan = _.map(this.plan, function (value, key) {
          if(key === index) {
            value[day][target] = changeValue;
          }
          return value;
        });
      };

      //check
      //check ShiftName
      if( !_.isEqual(InputShiftName, ShiftName) && 
          !_.isEqual(InputShiftName, shiftplanStates.rolle)) {
            console.log("changeShiftName")
            changeShiftWeekDayDetail("ShiftName", InputShiftName);
      }
      //checkShiftPosition
      if( !_.isEqual(InputShiftPosition, ShiftPosition) && 
          !_.isEqual(InputShiftPosition, shiftplanStates.position)) {
            console.log("ChangePosition")
            changeShiftWeekDayDetail("ShiftPosition", InputShiftPosition);
      }
      //check ShiftStart
      if( !_.isEqual(InputShiftStart, ShiftStart) && 
          !_.isEqual(InputShiftStart, shiftplanStates.beginn)) {
            console.log("shouldChngeStart")
            changeShiftWeekDayDetail("ShiftStart", InputShiftStart)
        }      
      // check ShiftEnde
      if( !_.isEqual(InputShiftEnd, ShiftEnd) && 
          !_.isEqual(InputShiftEnd, shiftplanStates.ende)) {
            console.log("shouldChngeEnde")
            changeShiftWeekDayDetail("ShiftEnd", InputShiftEnd)
      }      
      // check ShiftsRequuiredNumberOfEmployees
      if( !_.isEqual(InputShiftsRequiredNumberOfEmployees, ShiftsRequiredNumberOfEmployees) && 
          !_.isEqual(InputShiftsRequiredNumberOfEmployees, shiftplanStates.anzahl)) {
            console.log("shouldChngeNumberOfEmployees")
            changeShiftsDetail("anzahl", InputShiftsRequiredNumberOfEmployees)
      }
      // check Notice
      if( !_.isEqual(InputShiftsNotice, ShiftsNotice) && 
          !_.isEqual(InputShiftsNotice, shiftplanStates.notice)) {
            console.log("shouldChngeNotice")
            changeShiftsDetail("notice", InputShiftsNotice)
      }

      if(InputShiftDayly) {
        _.forIn(this.plan[index], function (value, key) {
          if(key === "Wochentag") return
          if( !_.isEqual(InputShiftsRequiredNumberOfEmployees, ShiftsRequiredNumberOfEmployees) && 
              !_.isEqual(InputShiftsRequiredNumberOfEmployees, shiftplanStates.anzahl)) {
                console.log("shouldChngeNumberOfEmployees")
                value.anzahl = InputShiftsRequiredNumberOfEmployees;
            } else {
                value.anzahl = ShiftsRequiredNumberOfEmployees;
            }
          if( !_.isEqual(InputShiftsNotice, ShiftsNotice) && 
              !_.isEqual(InputShiftsNotice, shiftplanStates.notice)) {
                console.log("shouldChngeNotice")
                value.notice = InputShiftsNotice;
            } else {
                value.notice = InputShiftsNotice;
            }
          value.frei = true;
        })
      }

      //check SetApplicants
      let InputSetApplicantsObject = {}
      InputSetApplicants = _.filter(InputSetApplicants, function(value) {return value.id.length > 2})
      _.forEach(InputSetApplicants, function (value, key) {
        if(value.id[0] !== "E") {
          value.id = value.id.substr(1)
          } 
        InputSetApplicantsObject[value.id] = value.content;
      })
      if( !_.isEqual(CurrentSetApplicants, InputSetApplicantsObject)) {
        console.log("gonna change SetApplicants");
        changeShiftsDetail("setApplicants", InputSetApplicantsObject)
}

}

    addCalendarShift(userInput, shiftSlot) {
      const day = _.get(shiftSlot, "col", false);

      if( _.isBoolean(day)) 
        return null

      const InputShiftName = _.get(userInput, "rolle", "");
      const InputShiftPosition = _.get(userInput, "position", "");
      const InputShiftStart = _.get(userInput, "beginn", "");
      const InputShiftEnd = _.get(userInput, "ende", "")
      const InputShiftsRequiredNumberOfEmployees = _.get(userInput, "anzahl", 0);
      const InputShiftsNotice = _.get(userInput, "notice", "");

      if(
        !_.isEmpty(InputShiftName) &&
        !_.isEmpty(InputShiftPosition) &&
        !_.isEmpty(InputShiftStart) &&
        !_.isEmpty(InputShiftEnd)
        ) {
          let shiftRow = {}
          _.forEach(weekdays, function (value, index) {
            shiftRow[value] = {frei: false};
          })
          shiftRow.Wochentag = {
            ShiftName: InputShiftName,
            ShiftStart: InputShiftStart,
            ShiftEnd: InputShiftEnd,
            ShiftPosition: InputShiftPosition
          }
          shiftRow[day] = {...shiftRow[day], frei: true, anzahl: Number(InputShiftsRequiredNumberOfEmployees), notice: InputShiftsNotice}
          const PlanLength = this.plan.length;
          this.plan.splice(PlanLength - 1, 0, shiftRow)
      }

    }

    deleteCalendarShift(shiftSlot) {
      const index = _.get(shiftSlot, "row", false);
      const day = _.get(shiftSlot, "col", false);

      if(_.isBoolean(index) || _.isBoolean(day)) 
        return null

      this.plan[index][day] = {frei: false}

      let isRowEmptyNow = true;
      _.forIn(this.plan[index], function (value, key) {
        if(key === "Wochentag") return;
        if(value.frei === true) isRowEmptyNow = false;
      })

      if(isRowEmptyNow) {
        this.plan.splice(index, 1);
      }
    }

    updateShiftDescription (index, userInput) {
      let copyPlan = [...this.plan];

      function updateNameOfShift(copyPlan, index, userInput) {
        console.log(userInput);
        console.log(index);
        if(!("ShiftName" in copyPlan[index].Wochentag)) {
          copyPlan[index].Wochentag.ShiftName = userInput.rolle;
        }
        if (userInput.rolle !== "Name") {
          copyPlan[index].Wochentag.ShiftName = userInput.rolle;
        }
        return copyPlan;
      }

      function updatePositionOfShift(copyPlan, index, userInput) {
        if(!("ShiftPosition" in copyPlan[index].Wochentag)) {
          copyPlan[index].Wochentag.ShiftPosition = userInput.position;
        }
        if (userInput.position !== undefined) {
          copyPlan[index].Wochentag.ShiftPosition = userInput.position;
        }
        return copyPlan;
      }
  
      function updateStartOfShift(copyPlan, index, userInput) {
        if(!("ShiftStart" in copyPlan[index].Wochentag)) {
          copyPlan[index].Wochentag.ShiftStart = userInput.beginn;
        }
        if (userInput.beginn !== "00:00") {
          copyPlan[index].Wochentag.ShiftStart = userInput.beginn;
        }
        return copyPlan;
      }
  
      function updateEndOfShift(copyPlan, index, userInput) {
        if(!("ShiftEnd" in copyPlan[index].Wochentag)) {
          copyPlan[index].Wochentag.ShiftEnd = userInput.ende;
        }
        if (userInput.ende !== "24:00") {
          copyPlan[index].Wochentag.ShiftEnd = userInput.ende;
        }
        return copyPlan;
      }

  
      function updateRequiredEmployeesForShift(copyPlan, index, userInput) {
        if(!("anzahl" in copyPlan[index].Montag)) {
          for (const [key] of Object.entries(copyPlan[index])) {
            if (key !== "Wochentag") {
              copyPlan[index][key].anzahl = userInput.anzahl;
            }
          }
        }
        if (userInput.anzahl !== 1) {
          for (const [key] of Object.entries(copyPlan[index])) {
            if (key !== "Wochentag") {
              copyPlan[index][key].anzahl = userInput.anzahl;
            }
          }
        }
        return copyPlan;
      }

      function updateShiftHasDetails(copyPlan, index) {
        if(copyPlan[index].Wochentag.frei) {
          copyPlan[index].Wochentag.frei = !1;
        }
        return copyPlan;
      }

      updateNameOfShift(copyPlan, index, userInput);
      updatePositionOfShift(copyPlan, index, userInput);
      updateStartOfShift(copyPlan, index,userInput);
      updateEndOfShift(copyPlan, index,userInput);
      updateRequiredEmployeesForShift(copyPlan, index, userInput);
      updateShiftHasDetails(copyPlan, index)
      this.plan = copyPlan;
    }

    addNewShiftToPlan (userInput) {
      let copyPlan = [...this.plan];
      let schichtentag = this.schichtentag;

      function createNewShiftForPlan(copyPlan, userInput) {
        let newShift = {};
        newShift["Wochentag"] = createWeekDayValues(userInput);
        let MondayToSunday = createMondayToSunday(copyPlan, userInput);
        Object.keys(MondayToSunday).forEach(element => newShift[element] = MondayToSunday[element]);
        return newShift;
      };

      function createWeekDayValues(userInput) {
        let Wochentag = {};
        Wochentag["frei"] = !1;
        Wochentag["ShiftName"] = userInput.rolle;
        Wochentag["ShiftPosition"] = userInput.position;
        Wochentag["ShiftStart"] = userInput.beginn;
        Wochentag["ShiftEnd"] = userInput.ende;
        return Wochentag;
      };

      function createMondayToSunday(copyPlan, userInput) {
        let WeekDaysDetails = {};
        const hasAtLeastOneShift = copyPlan[2].Wochentag !== "Summe" ? !0 : !1;
        if (hasAtLeastOneShift) {
              WeekDaysDetails["Montag"] = {frei: copyPlan[2].Montag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Dienstag"] = {frei: copyPlan[2].Dienstag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Mittwoch"] = {frei: copyPlan[2].Mittwoch.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Donnerstag"] = {frei: copyPlan[2].Donnerstag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Freitag"] = {frei: copyPlan[2].Freitag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Samstag"] = {frei: copyPlan[2].Samstag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
              WeekDaysDetails["Sonntag"] = {frei: copyPlan[2].Sonntag.frei, anzahl: userInput.anzahl, applicants: {}, setApplicants: {}, notice: "", prio: !1};
        }
        return WeekDaysDetails;
        };

      function addDayToShiftCounter(schichtentag, value=0) {
        let newSchichtentag = String(Number(schichtentag) + value);
        return newSchichtentag;
      };

      let indextoinsert = copyPlan.length - 1;
      copyPlan.splice(indextoinsert, 0, {});
      let input = createNewShiftForPlan(copyPlan, userInput);
      copyPlan[indextoinsert] = input;
      this.plan = copyPlan;
      this.schichtentag = addDayToShiftCounter(schichtentag, 1);
    }

      deleteShift(index) {
        let copyPlan = [...this.plan] 
        copyPlan.splice(index, 1);
        let copySchichtentag = this.schichtentag;
        copySchichtentag =  String(Number(copySchichtentag) - 1)
        this.plan = copyPlan;
        this.schichtentag = copySchichtentag;
      }

      changeShiftsOrder (shiftplan) {
        let plan = this.plan 

        function deleteIdsFromDnD(plan, shiftplan) {
          let keys = Object.keys(plan[0])
          let copyPlan = shiftplan.map(shift => {
            let newShift = {}    
            keys.forEach(item => {
                newShift[item] = shift[item]
                })
            return newShift
          })
        return copyPlan
        }

        function getShiftIndexs(plan) {
          let indexArray = []
          plan.forEach((row, index) => {
            if(typeof row.Wochentag === "object") {
              indexArray.push(index)
            }
          })
          return indexArray
        }

        this.plan = deleteIdsFromDnD(plan, shiftplan)
      }

    
    setApplyForTradeShift(User, index) {
      let copyTauschanfrage = [...this.tauschanfrage];

        function setTradeShift (copyTauschanfrage, User, index) {
          let user = User.SK;
          let name = User.name;
          if (copyTauschanfrage[index].trader !== user) {
            copyTauschanfrage[index].applicants[user] = name;
          }
          return copyTauschanfrage;
        }

      setTradeShift(copyTauschanfrage, User, index);
      this.tauschanfrage = copyTauschanfrage;
    }

    setAcceptTradeShift (userInput, index) {
      let copyPlan = [...this.plan];
      let copyTauschanfrage = [...this.tauschanfrage];
      let tauschanfrageDetails = copyTauschanfrage[index];

      function setEmployeeInShift (copyPlan, tauschanfrageDetails, userInput) {
        let applicants = Object.keys(tauschanfrageDetails.applicants);
        if(userInput.setTrade === !1) {
          copyPlan[tauschanfrageDetails.row][tauschanfrageDetails.col].setApplicants[applicants[0]] = tauschanfrageDetails.applicants[applicants[0]];
        } else {
          copyPlan[tauschanfrageDetails.row][tauschanfrageDetails.col].setApplicants[userInput.setTrade] = tauschanfrageDetails.applicants[userInput.setTrade];
        }
        return copyPlan;
      }

      function deleteOldEmployeeFromShift (copyPlan, tauschanfrageDetails) {
        delete copyPlan[tauschanfrageDetails.row][tauschanfrageDetails.col].setApplicants[tauschanfrageDetails.traderId];
        return copyPlan;
      }

      function deleteShiftTrade (copyTauschanfrage, index) {
        console.log(index, copyTauschanfrage)
        if (copyTauschanfrage.length === 1 ) {
          console.log("only last",copyTauschanfrage)
          copyTauschanfrage = []
          console.log("after last", copyTauschanfrage)
        } else {
          console.log("before last", copyTauschanfrage)
          copyTauschanfrage.splice(index, 1);
          console.log("after last2", copyTauschanfrage)
        }
        return copyTauschanfrage;
      }

    deleteOldEmployeeFromShift(copyPlan, tauschanfrageDetails);
    setEmployeeInShift(copyPlan, tauschanfrageDetails, userInput);
    this.tauschanfrage = deleteShiftTrade(copyTauschanfrage, index);
    this.plan = copyPlan;
    console.log(this.tauschanfrage)
    }

    setDeclineShiftTrade (index) {
        let copyTauschanfrage = [...this.tauschanfrage];
        if (copyTauschanfrage.length === 1) {
          copyTauschanfrage = []
        } else {
          copyTauschanfrage.splice(index, 1);
        }
        this.tauschanfrage = copyTauschanfrage;
    }

    removeApplyForShift(User, index) {
      let copyTauschanfrage = [...this.tauschanfrage];

        function removeTradeShift (copyTauschanfrage, User, index) {
          let user = User.SK;
          if (copyTauschanfrage[index].trader !== user) {
          delete copyTauschanfrage[index].applicants[user]
          }
          return copyTauschanfrage;
        }

      removeTradeShift(copyTauschanfrage, User, index);
      this.tauschanfrage = copyTauschanfrage;
    }

    setApplicant(User, ShiftSlot) {
      let copyPlan = [...this.plan];

      function setApplicantInShift (copyPlan, User, ShiftSlot) {
        let row = ShiftSlot.row;
        let day = ShiftSlot.col;
        let UserId = User.SK;
        let UserName = User.name;
        if ("applicants" in copyPlan[row][day]) {
          copyPlan[row][day].applicants = {...copyPlan[row][day].applicants, [UserId]: UserName}
        } else {
          copyPlan[row][day]["applicants"] = {[UserId]: UserName}
        }
        return copyPlan;
      }
      setApplicantInShift(copyPlan, User, ShiftSlot);
      this.plan = copyPlan;
    }

    adminSetApplicant(updateApplicant, ShiftSlot) {
      let copyPlan = [...this.plan];
      let row = ShiftSlot.row;
      let day = ShiftSlot.col;

      function getAddRemove(updateApplicant, copyPlan, row, day) {
        if(noSetApplicants(copyPlan, row, day)) {
          copyPlan[row][day].setApplicants = {};
        }
        let singleApplicant = hasSingleApplicant(copyPlan, row, day);
        copyPlan[row][day].setApplicants = {};
        if (singleApplicant) {
          let empty = zeroApplicants(updateApplicant);
          if(empty) {
            copyPlan[row][day].setApplicants = {};
          } else {
            addApplicantsToShiftplan(updateApplicant, copyPlan, row, day);
          }
        } else {
          if(!checkForDummyApplicant(updateApplicant)) {
            addApplicantsToShiftplan(updateApplicant, copyPlan, row, day);
          }
        }
        return copyPlan;
      }
      function checkForDummyApplicant(updateApplicant) {
        let isDummy = !1;
        let updateApplicantsLength = updateApplicant.length;
        if(updateApplicantsLength === 1) {
          let id = updateApplicant[0].id
          if(id.length === 1) {
            isDummy = !0;
          }
        }
        return isDummy;
      }
      function addApplicantsToShiftplan(updateApplicant, copyPlan, row, day) {
        updateApplicant.forEach(applicant => {
          let id = getUserId(applicant);
          let name = getUserName(applicant);
          copyPlan[row][day].setApplicants[id] = name;
        })
        return copyPlan;
      }

      function zeroApplicants(updateApplicant) {
        let zero = !1;
        if (getUserName(updateApplicant[0]) === "Leer") {
          zero = !0;
        }
        return zero;
      }

      function hasApplicants(copyPlan, row, day) {
        let hasSetApplicants = !1;
        let length = getSetApplicantsLength(copyPlan, row, day);
        if (length > 1) {
          hasSetApplicants = !0;
        }
        return hasSetApplicants;
      }

      function hasSingleApplicant(copyPlan, row, day) {
        let hasSetApplicants = !1;
        let length = getSetApplicantsLength(copyPlan, row, day);
        if (length === 1) {
          hasSetApplicants = !0;
        }
        return hasSetApplicants;
      }
      function noSetApplicants(copyPlan, row, day) {
        let hasNoSetApplicants = !1;
        let keys = getSlotKeys(copyPlan, row, day);
        if (!keys.includes("setApplicants")) {
          hasNoSetApplicants = !0;
        }
        return hasNoSetApplicants;
      }

      function getSlotKeys(copyPlan, row, day) {
        return Object.keys(copyPlan[row][day])
      }

      function getSetApplicantsLength(copyPlan, row, day) {
        return Object.keys(copyPlan[row][day].setApplicants).length
      }

      function getUserId(applicantObject) {
        return removeIndexFromId(applicantObject);
      }

      function getUserName(applicantObject) {
        return applicantObject.content;
      }

      function removeIndexFromId(applicantObject) {
        return applicantObject.id.substring(1)
      }

      getAddRemove(updateApplicant, copyPlan, row, day);
      this.plan = copyPlan;

    }

    removeApplicant(User, ShiftSlot) {
      let copyPlan = [...this.plan];

      function removetApplicantInShift (copyPlan, User, ShiftSlot) {
        let row = ShiftSlot.row;
        let day = ShiftSlot.col;
        let UserId = User.SK;
        if ("applicants" in copyPlan[row][day]) {
          if (UserId in copyPlan[row][day].applicants) {
            delete copyPlan[row][day].applicants[UserId];
          }
        }
        return copyPlan;
      }

      removetApplicantInShift(copyPlan, User, ShiftSlot);
      this.plan = copyPlan;
    }

    setTradeShift(User, ShiftSlot) {
      let copyTauschanfrage = [...this.tauschanfrage];

      function createTrade (User, ShiftSlot) {
        let slot = {};
        slot["row"] = ShiftSlot.row;
        slot["col"] = ShiftSlot.col;
        slot["traderId"] = User.SK;
        slot["traderName"] = User.name;
        slot["applicants"] = {};
        return slot;
    }

    function willDoublicate(copyTauschanfrage, newTrade) {
      let alreadySet = !1;
      copyTauschanfrage.forEach(trade => {
        let isTraderId = trade.traderId === newTrade.traderId;
        let isDay = trade.col === newTrade.col;
        let isRow = trade.row === newTrade.row;
        if(isTraderId && isDay && isRow) {
          alreadySet = !0;
        }
      })
      return alreadySet;
    }

    let newTrade = createTrade(User, ShiftSlot)
    let alreadySetTrade = willDoublicate(copyTauschanfrage, newTrade);
    if(!alreadySetTrade) {
      copyTauschanfrage.push(newTrade);
    }
    this.tauschanfrage = copyTauschanfrage;
    }

    removeTradeShift(index) {
      let copyTauschanfrage = [...this.tauschanfrage];

        function spliceTradeShift (copyTauschanfrage, index) {
          copyTauschanfrage.splice(index, 1);
          return copyTauschanfrage;
        }

      spliceTradeShift(copyTauschanfrage, index);
      this.tauschanfrage = copyTauschanfrage;
  }

  releaseForApplication (NewDate) {

  }

  checkShiftHasDetails() {
    let shiftsHaveDetails = !1;


    function hasValidShiftDetails(plan, shiftsHaveDetails) {
      let validArray = getShiftRows(plan);
      let allDetailsValid = allValid(validArray);
      if(allDetailsValid) {
        shiftsHaveDetails = !0;
      }
      return shiftsHaveDetails;
    }
    function getShiftRows(plan) {
      let validArray = [];
      plan.forEach((row, index) => {
        let isObject = typeof plan[0].Wochentag === "object"
        if(!isObject && plan[0].Wochentag !== "Datum") {
          if(index !== 0 && index !== getPlanLength(plan) - 1) {
            validArray.push(validDetails(row.Wochentag))
          }
        } else {
          if(index !== 0 && index !== 1 && index !== getPlanLength(plan) - 1) {
            validArray.push(validDetails(row.Wochentag))
          }
        }
      })
      return validArray;
    }

    function allValid(validArray) {
      let isValid = !1;
      if(!validArray.includes(!1)) {
        isValid = !0
      }
      return isValid;
    }

    function getPlanLength(plan) {
      return plan.length;
    }

    function validDetails(Wochentag) {
      let isValid = !1;
      if(isObject(Wochentag)) {
        if(hasShiftName(Wochentag)) {
          isValid = !0;
        }
      }
      return isValid;
    }

    function isObject(Wochentag) {
      let isObject = !1;
      if(typeof Wochentag === "object") {
        isObject = !0;
      }
      return isObject;
    }
    function hasShiftName(Wochentag) {
      let hasName = !1;
      if ("ShiftName" in Wochentag) {
        hasName = !0;
      }
      return hasName;
    }

    shiftsHaveDetails = hasValidShiftDetails(this.plan, shiftsHaveDetails);
    return shiftsHaveDetails;
  }

  changeNotice(userInput, ShiftSlot) {
    let copyPlan = [...this.plan]
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    let inputNotice = this.getInputNotice(userInput);
    if(this.hasNotice(inputNotice) && this.hasValidNotice(inputNotice)) {
      copyPlan[row][day].notice = inputNotice;
      this.plan = copyPlan;
    }
  }

  resetNotice(ShiftSlot) {
    let copyPlan = [...this.plan]
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    copyPlan[row][day].notice = "";
    this.plan = copyPlan;
  }

  getNotice(shift) {
    return shift.notice;
  }

  hasNotice(notice) {
    let valid = !1;
    if(notice !== "") {
      valid = !0; 
    }
    return valid;
  }

  hasValidNotice(inputNotice) {
    let valid = !1;
    let InputLength = inputNotice.length;
    if(InputLength < 80) {
      valid = !0;
    }
    return valid;
  }

  getInputNotice(userInput) {
    return userInput.notice;
  }

  setPrio(ShiftSlot, qualifikation) {
    let copyPlan = [...this.plan];
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    if(copyPlan[row][day].prio !== !1) {
      copyPlan[row][day].prio = !1
    } else {
      copyPlan[row][day].prio = qualifikation;
    }
    this.plan = copyPlan;
  }

  setTenantInShift(ShiftSlot, meta) {
    let copyPlan = [...this.plan];
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    let name = "Name"
    if("vorname" in meta) {
      name = meta.vorname
    }
    copyPlan[row][day].setApplicants["TENANT"] = name
    this.plan = copyPlan;
  }

  removeTenantFromShift(ShiftSlot) {
    let copyPlan = [...this.plan];
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    delete copyPlan[row][day].setApplicants.TENANT
    this.plan = copyPlan;
  }

  shiftIsActive(ShiftSlot) {
    let copyPlan = [...this.plan];
    let row = this.getRow(ShiftSlot);
    let day = this.getDay(ShiftSlot);
    let shift = this.getShift(copyPlan, row, day);
    let isActive = this.getIsActive(shift);
    let newIsActive = this.setActive(isActive);
    copyPlan[row][day].frei = newIsActive;
    this.plan = copyPlan;
  }


  getShift(copyPlan, row, day) {
    return copyPlan[row][day]
  }

  setActive (active) {
    return !active;

  }

  getIsActive(shift) {
    return shift.frei;
  }

  getRow(ShiftSlot) {
    return ShiftSlot.row;
  }

  getDay(ShiftSlot) {
    return ShiftSlot.col;
    }

    getPlan () {
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