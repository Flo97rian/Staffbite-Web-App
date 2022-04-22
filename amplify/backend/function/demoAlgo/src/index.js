

exports.handler = async (event) => {
    let body = JSON.parse(event.body)
    let shiftplan = body.plan;
    let employees = body.employees;
    let demo = new DemoInterface(shiftplan, employees);
    await demo.createInitals();
    await demo.start();
    shiftplan = demo.getShiftplan();
    employees = demo.getEmployees();
    
    console.log(shiftplan);
    console.log(employees);
    
    // TODO implement
    const response = {
        statusCode: 200,
      headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
      }, 
        body: JSON.stringify({
            plan: shiftplan,
            employees: employees
        })
    };
    return response;
};

class DemoInterface {
    constructor(shiftplan, employees) {
        this.shiftplan = shiftplan,
        this.employees = employees,
        this.dayOrder = ["Montag", "Dienstag", "Sonntag", "Samstag", "Freitag", "Donnerstag", "Mittwoch"],
        this.currentShiftRow = false,
        this.currentShift = false,
        this.currentDay = "Montag",
        this.currentDayIndex = 0,
        this.currentRow = 0
        this.maxApplicantsInShift = 0;
    }
    
    createInitals() {
        this.getMaxApplicantsInShift()
    }
    start() {
        this.shiftplan.forEach((shiftRow, index) => {
            if(index !== 0 && index !== this.shiftplan.length - 1) {
                this.currentShiftRow = shiftRow;
                this.currentRow = index
                this.dayOrder.forEach((day, index) => {
                    this.currentDay = day;
                    this.currentDayIndex = index;
                    this.currentShift = shiftRow[day]
                    this.forShift()
                })
            }
        })
    };
    
    forShift() {
        if(Object.keys(this.currentShift.anzahl).length < this.currentShift.anzahl) {
            this.setApplicants() 
        }
    }
    
    setApplicants() {
        let applicantsIds = Object.keys(this.currentShift.applicants);
        let setApplicantsIds = Object.keys(this.currentShift.setApplicants);
        let filerNotSettedApplicants = applicantsIds.filter(applicantId => (setApplicantsIds.includes(applicantId) === false && this.hasApplicantCapacitys(applicantId) === true));
        if(filerNotSettedApplicants.length > 0) {
            this.shiftplan[this.currentRow][this.currentDay].setApplicants[filerNotSettedApplicants[0]] = "Name Name"
            this.setShiftInEmployeesShifts(filerNotSettedApplicants[0])
        }
    }
    
    getMaxApplicantsInShift () {
        let shiftplanLength = this.shiftplan.length;
        let maxApplicantsInShift = 0;
        this.shiftplan.forEach((shiftRow, index) => {
            if (index !== 0 && index !== shiftplanLength - 1) {
                maxApplicantsInShift =  shiftRow.Montag.anzahl > maxApplicantsInShift ? shiftRow.Montag.anzahl : maxApplicantsInShift
            }
        })
        this.maxApplicantsInShift = maxApplicantsInShift;
    }
    
    setShiftInEmployeesShifts(applicantId) {
        let findEmployee = this.employees.filter(employee => employee.SK === applicantId);
        let indexOfEmployee = this.employees.indexOf(findEmployee[0])
        console.log(this.employees[indexOfEmployee].schichten);
        this.employees[indexOfEmployee].schichten.push(String(this.currentRow) + '#' + String(this.currentDay));
        
    }
    
    hasApplicantCapacitys(applicantId) {
        let findEmployee = this.employees.filter(employee => employee.SK === applicantId);
        let indexOfEmployee = this.employees.indexOf(findEmployee[0])
        if(this.employees[indexOfEmployee].schichten.length === this.employees[indexOfEmployee].schichtenwoche || this.hasApplicantShiftOnSpecificDay(applicantId, indexOfEmployee) === true) return false
        return true
    }
    
    hasApplicantShiftOnSpecificDay (applicantId, indexOfEmployee) {
        let hasShift = !1;
        this.employees[indexOfEmployee].schichten.forEach(shift => {
            if(shift.split('#').includes(this.currentDay)) {
                hasShift = !0;
            }
        })
        return hasShift;
    }
    
    
    getEmployees() {
        return this.employees;
    }
    
    getShiftplan() {
        return this.shiftplan;
    }
}




