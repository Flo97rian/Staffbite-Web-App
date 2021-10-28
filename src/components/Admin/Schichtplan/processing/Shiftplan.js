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

    updateShiftDescription (index, userInput) {
      let copyPlan = [...this.plan];

      function updateNameOfShift(copyPlan, index, userInput) {
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
        if (copyTauschanfrage.length === 1 ) {
          copyTauschanfrage = []
        } else {
          copyTauschanfrage.splice(index, 1);
        }
        return copyTauschanfrage;
      }

    deleteOldEmployeeFromShift(copyPlan, tauschanfrageDetails);
    setEmployeeInShift(copyPlan, tauschanfrageDetails, userInput);
    this.tauschanfrage = deleteShiftTrade(copyTauschanfrage, index);
    this.plan = copyPlan;
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

    let newTrade = createTrade(User, ShiftSlot)
    copyTauschanfrage.push(newTrade);
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