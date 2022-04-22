import { isThisSecond } from "date-fns"
import { random } from "lodash"

let initalMeta = {
    zeiterfassung: false,
    automatischeBefuellung: false,
    mitarbeiterApp: false,
    bewerbungssystem: false,
    schichtplan: true
}

let initalUser = {
    
}
let initalDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

let initalEmployees = [
    {
    name: "Max Mustermann",
    SK: "EMP#1",
    position: ["Leitung","Service"],
    schichtenwoche: 2,
    schichten: [],
    },
    {
    name: "Erika Mustermann",
    SK: "EMP#2",
    position: ["Leitung","Service"],
    schichtenwoche: 3,
    schichten: [],
    },
    {
    name: "Lieschen Müller",
    SK: "EMP#3",
    position: ["Leitung","Service"],
    schichtenwoche: 3,
    schichten: [],
    },
    {
    name: "Tim Müller",
    SK: "EMP#4",
    position: ["Leitung","Service"],
    schichtenwoche: 4,
    schichten: [],
    },
    {
    name: "Anna Weide",
    SK: "EMP#5",
    position: ["Leitung","Service"],
    schichtenwoche: 2,
    schichten: [],
    },
    {
    name: "Hanna Leno",
    SK: "EMP#6",
    position: ["Leitung","Service"],
    schichtenwoche: 2,
    schichten: [],
    },
    {
    name: "Marie Meier",
    SK: "EMP#7",
    position: ["Leitung","Service"],
    schichtenwoche: 2,
    schichten: [],
    },

]

const initalSchicht = {
    ShiftStart: "00:00",
    ShiftEnd: "24:00",
    ShiftName: "Name",
    ShiftPosition: "Leitung",
    frei: false,
    notice: "",
    prio: !1
}

let initalSchichtplan = {
    tauschanfrage: [],
    plan: [{"Wochentag":"Wochentag","Montag":"Montag","Dienstag":"Dienstag","Mittwoch":"Mittwoch","Donnerstag":"Donnerstag","Freitag":"Freitag","Samstag":"Samstag","Sonntag":"Sonntag"},{"Wochentag":{"frei":false,"ShiftName":"Frühschicht","ShiftPosition":"Leitung","ShiftStart":"08:00","ShiftEnd":"15:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":{"frei":false,"ShiftName":"Abend","ShiftPosition":"Leitung","ShiftStart":"15:00","ShiftEnd":"22:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":{"frei":false,"ShiftName":"Springer","ShiftPosition":"Leitung","ShiftStart":"12:00","ShiftEnd":"18:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":"Summe","Montag":0,"Dienstag":0,"Mittwoch":0,"Donnerstag":0,"Freitag":0,"Samstag":0,"Sonntag":0}],
    name: "Name",
    schichtentag: 3,
    zeitraum: "01.01.2021 - 07.01.2021",
}

let initalState = {
    schichtplan: initalSchichtplan,
    user: !1,
    meta: initalMeta
}
export default class DemoInterface {
    constructor(initalState) {
        this.schichtplan = initalSchichtplan;
        this.user = initalUser;
        this.meta = initalMeta;
        this.employees = initalEmployees;
    }

    updateSchichtInfo (index, userInput) {
        let copySchichtplan = {...this.schichtplan}

        function getCurrentDetails (copySchichtplan, index) {
            let currentDetails = copySchichtplan.plan[index].Wochentag;
            return currentDetails;
        }
        
        function mergeDetails (currentDetails, userInput) {
            let updatedDetails = currentDetails;
            let DetailsKeys = Object.keys(currentDetails);
            let userInputKeys = Object.keys(userInput);
            DetailsKeys.forEach(detail => {
                if(userInputKeys.includes(detail)) {
                    if(currentDetails[detail] !== userInput[detail] && initalSchicht[detail] !== userInput[detail]) {
                        updatedDetails[detail] = userInput[detail]
                    }
                }
            })
            return updatedDetails;
        }

        function updateNumberOfEmployees (copyShiftplan, index, userInput) {
            initalDays.forEach(day => {
                if(copyShiftplan.plan[index][day].anzahl !== userInput.anzahl && userInput.anzahl !== initalSchicht.anzahl) {
                    copyShiftplan.plan[index][day].anzahl = Number(userInput.anzahl);
                }
            });
            return copyShiftplan;


        }

        let currentDetails = getCurrentDetails(copySchichtplan, index);
        let updatedDetails = mergeDetails(currentDetails, userInput);
        copySchichtplan = updateNumberOfEmployees(copySchichtplan, index, userInput);
        copySchichtplan.plan[index].Wochentag = updatedDetails;
        this.schichtplan = copySchichtplan;
        
    }

    updateSingleShift (userInput, index, day) {
        let copySchichtplan = {...this.schichtplan};

        function getCurrentShift (copySchichtplan, index, day) {
            let currentShift = copySchichtplan.plan[index][day];
            return currentShift;
        }

        function mergeShift (currentShift, userInput) {
            let updatedShift = currentShift;
            let ShiftKeys = Object.keys(currentShift);
            let userInputKeys = Object.keys(userInput);
            ShiftKeys.forEach(detail => {
                if(userInputKeys.includes(detail)) {
                    if(ShiftKeys[detail] !== userInput[detail] && initalSchicht[detail] !== userInput[detail]) {
                        updatedShift[detail] = userInput[detail]
                    }
                }
            })
            return updatedShift;
        }

        let currentShift = getCurrentShift(copySchichtplan, index, day);
        let updatedShift = mergeShift(currentShift, userInput);
        copySchichtplan.plan[index][day] = updatedShift;
        this.schichtplan = copySchichtplan;
    }

    updatePrio (qualifikation, shiftSlot) {
        let copySchichtplan = {...this.schichtplan};
        let index = shiftSlot.row;
        let day = shiftSlot.col;

        function getCurrentShift(copySchichtplan, index, day) {
            let currentShift = copySchichtplan.plan[index][day];
            return currentShift;
        }

        function editPrio(currentShift, qualifikation) {
            let updatedShift = currentShift;
            let gotPrio = currentShift.prio !== false; 
            if(gotPrio) {
                if(currentShift.prio === qualifikation) {
                    updatedShift.prio = !1;
                } else {
                    updatedShift.prio = qualifikation;
                }
            } else {
                updatedShift.prio = qualifikation;
            }
            return updatedShift;

        }
        let currentShift = getCurrentShift(copySchichtplan, index, day);
        let updatedShift = editPrio(currentShift, qualifikation);
        this.schichtplan.plan[index][day] = updatedShift;
    }

    shiftIsActive (index, day) {
        let copySchichtplan = {...this.schichtplan};

        function getCurrentShift(copySchichtplan, index, day) {
            let currentShift = copySchichtplan.plan[index][day];
            return currentShift;
        }

        function changeActiveInaktive (currentShift) {
            let updatedShift = currentShift;
            updatedShift.frei = !currentShift.frei;
            return updatedShift;
        }
        let currentShift = getCurrentShift(copySchichtplan, index, day); 
        let updatedShift = changeActiveInaktive(currentShift);
        copySchichtplan.plan[index][day] = updatedShift;

        this.schichtplan = copySchichtplan;
    }

    simulateApplicants () {
        let copySchichtplan = {...this.schichtplan};
        let copyEmployees = [...this.employees];
        let indexes = [1, 2, 3];

        function addApplicants (shift, copyEmployees) {
                while (Object.keys(shift.applicants).length <= shift.anzahl) {
                    let employeeIndex = getRandomInt(7);
                    if(!Object.keys(shift.applicants).includes(copyEmployees[employeeIndex].SK)) {
                        let currentId = copyEmployees[employeeIndex].SK
                        shift.applicants = {...shift.applicants, [currentId]: copyEmployees[employeeIndex].name}

                    }
                }
                return shift;
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        function forEachShift(copySchichtplan, index, copyEmployees) {
            initalDays.forEach(day => {
                if(copySchichtplan.plan[index][day].frei !== false) {
                    copySchichtplan.plan[index][day] = addApplicants(copySchichtplan.plan[index][day], copyEmployees) 
                }
            })
            return copySchichtplan
        }

        function forEachIndex(copySchichtplan, indexes, copyEmployees) {
            indexes.forEach(index => {
                copySchichtplan = forEachShift(copySchichtplan, index, copyEmployees);
            })
            return copySchichtplan;
        }

        copySchichtplan = forEachIndex(copySchichtplan, indexes, copyEmployees);
        this.schichtplan = copySchichtplan
    }

    search() {
        let copySchichtplan = {...this.schichtplan}
        let search = "Samstag";
        let maxDepth;
        //ForEach
        function getItem (input, search) {
            let found = !1;
            let index = 0;
            let width = 0;
            if(found !== !0) return console.log("done");

        }

        function nextDepth (currentInput = !1, search, index, width) {
            console.log(currentInput);
            let nextInput; 
            if (currentInput !== !1) {
                if (currentInput[Object.keys(currentInput)[index]] === undefined) {
                    index -= 1;
                    width += 1;
                    nextInput = currentInput[Object.keys(currentInput)[index]]
                } else {
                    nextInput = currentInput[Object.keys(currentInput)[width]]
                    width += 1;
                }
            }
            while(nextInput !== undefined) return nextDepth(currentInput, nextInput, search, index, width)
            return currentInput
            }

        getItem(copySchichtplan.plan, search)
    }

    setApplicantInShiftplan (DragAndDropRef, shiftSlot) {
        let copySchichtplan = [...this.schichtplan.plan];


        function getShiftSlot(copySchichtplan, shiftSlot) {
            return copySchichtplan[shiftSlot.row][shiftSlot.col];
        }

        function updateSetApplicants (setApplicants, DragAndDropRef, employees) {
            let newSetApplicants = {

            }
            DragAndDropRef.forEach(applicant => {
                if(applicant.content !== "Leer") {
                    let applicantId = getEmployeeId(applicant.id);
                    let filterEmployees = employees.filter(employee => employee.SK === applicantId);
                    let indexOfEmployee = employees.indexOf(filterEmployees[0]);
                    newSetApplicants[applicantId] = employees[indexOfEmployee].name;
                }

            });
            return newSetApplicants;
        }

        function getEmployeeId (applicantId) {
            return applicantId.substring(1);

        }

        function updateEmployees(setApplicants, updatedSetApplicants, employees, shiftSlot) {
            let slotName = String(shiftSlot.row) + '#' + String(shiftSlot.col);
            let pastApplicantsIds = Object.keys(setApplicants);
            let newApplicantsIds = Object.keys(updatedSetApplicants);
            let filterNotInShift = pastApplicantsIds.filter(applicant => newApplicantsIds.includes(applicant) === false);
            let filterNewInShift = newApplicantsIds.filter(applicant => pastApplicantsIds.includes(applicant) === false);
            filterNotInShift.forEach(currentID => {
                let filterEmployees = employees.filter(employee => employee.SK === currentID);
                let indexOfEmployee = employees.indexOf(filterEmployees[0]);
                const index = employees[indexOfEmployee].schichten.indexOf(slotName);
                if (index > -1) {
                    employees[indexOfEmployee].schichten.splice(index, 1);
                }
            })

            filterNewInShift.forEach(currentID => {
                let filterEmployees = employees.filter(employee => employee.SK === currentID);
                let indexOfEmployee = employees.indexOf(filterEmployees[0]);
                if(employees[indexOfEmployee].schichten.includes(slotName) === false) {
                    employees[indexOfEmployee].schichten.push(slotName)
                }
            })
            console.log(filterNotInShift, filterNewInShift);
        return employees
        }

        let shift = getShiftSlot(copySchichtplan, shiftSlot);
        let setApplicants = shift.setApplicants;
        let updatedSetApplicants = updateSetApplicants(setApplicants, DragAndDropRef, this.employees);
        let newEmployees = updateEmployees(setApplicants, updatedSetApplicants, this.employees, shiftSlot);
        console.log(newEmployees);
        copySchichtplan[shiftSlot.row][shiftSlot.col].setApplicants = updatedSetApplicants;
        this.schichtplan.plan = copySchichtplan;

    }


    setShiftplanPlan (schichtplan) {
        this.schichtplan.plan = schichtplan;

    }

    setEmployees (employees) {
        this.employees = employees;

    }
    getShiftplanName () {
        return this.schichtplan.name;
    }

    getShiftplanTauschanfrage () {
        return this.schichtplan.tauschanfrage;
    }

    getShiftplanSchichtentag () {
        return this.schichtplan.schichtentag;
    }

    getShiftplanZeitraum () {
        return this.schichtplan.zeitraum;
    }

    getShiftplanPlan () {
        return this.schichtplan.plan;
    }

    getEmployees() {
        return this.employees;
    }
}