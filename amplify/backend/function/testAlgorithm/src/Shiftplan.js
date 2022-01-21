var Employee = require('./Employee.js');
var Employees = require('./Employees.js');

class Shiftplan {
    constructor(plan, Employees) {
        this.plan = plan
        this.employees = Employees
    }

    startAlg() {
        let employees = new Employees();
        employees.createEmployeesInstance(this.employees)
        this.employees = employees;
        this.createInitalState();
        this.MainAlgorithm();
    }
    
    MainAlgorithm() {
        let currentRun = 1;
        while (currentRun <= this.MaximumSetApplicants) {
            this.iterateShiftRows(currentRun);
            currentRun += 1;
        }
        console.log("Ergebnis ALL: ", this)
        console.log("Ergebnis Plan: ", this.plan)
        console.log("Ergebnis Employees: ", this.employees.getAllEmployees())
        console.log("heatMapApplicants: ", this.heatMapApplicants)
        console.log("heatMapSetApplicants: ", this.heatMapSetApplicants)
    }
    
    iterateShiftRows(currentRun) {
        this.plan.forEach((shiftRow, index) => {
            this.scopeShiftRow(shiftRow, index, currentRun);
        })
    }
    
    scopeShiftRow(shiftRow, index, currentRun) {
        this.createActiveDays(index)
        this.createCurrentIndexAndShift(shiftRow, index);
        this.createHeatMapRows();
        if(this.getCurrentShiftsMaximumApplicants() >= currentRun) {
            this.iterateShiftRowsDays();
        }
    }
    
    iterateShiftRowsDays() {
       this.days.forEach(day => {
            this.currentDay = day;
            this.getShiftScope();
        }) 
    }
    
    
    
    createHeatMapRows() {
        this.createHeatMapRow(this.heatMapApplicants);
        this.createHeatMapRow(this.heatMapSetApplicants);
    }
    
    createCurrentIndexAndShift(shiftRow, index) {
        this.currentShiftRow = shiftRow;
        this.currentIndex = index;
    }
    
    createInitalState() {
        this.planLength = this.getShiftplanLength() - 1;
        this.MaximumSetApplicants = this.getMaxAnzahl()
        this.createShiftLookUp()
        this.heatMapApplicants = []
        this.heatMapSetApplicants = []
    }
    
    
    createHeatMapRow(heatMap) {
        if (!this.hasHeatMapIndex(heatMap)) {
            heatMap.push([])
        }
    }
    hasHeatMapIndex(heatMap) {
        return heatMap[this.currentIndex] !== undefined
    }
    
    createShiftLookUp () {
        let shiftLookUp = {};
        let descriptionRows = [0, 1, this.planLength]
        this.plan.forEach((shiftRow, index) => {
        if (!descriptionRows.includes(index)) {
            let shiftName = shiftRow.Wochentag.ShiftName;
            let shiftPosistion = shiftRow.Wochentag.ShiftPosition
            let shiftKey = String(shiftName + "#" + shiftPosistion)
            shiftLookUp[shiftKey] = index;
        }
        })
    this.shiftLookUp = shiftLookUp;
    }
        
    getCurrentShiftsMaximumApplicants() {
        let currentMaximumApplicants = 0
        if(this.currentIndex !== 0 && this.currentIndex !== 1 && this.currentIndex !== this.planLength) {
            currentMaximumApplicants = this.getShiftsMaximumApplicants()
        }
        return currentMaximumApplicants;
    }
        
    getShiftsMaximumApplicants() {
        let shiftMax = 0;
        if(this.hasAnzahl(this.currentShiftRow.Montag)) {
            shiftMax = this.currentShiftRow.Montag.anzahl;
        }
        return Number(shiftMax);
    }
            
    getShiftKeys(shift) {
        return Object.keys(shift)
    }
        
    getMaxAnzahl () {
        let currentMax = 0;
        let maxAnzahl = this.forEachShift(currentMax);
        return Number(maxAnzahl);
        }

    forEachShift(currentMax) {
        this.plan.forEach((shift, index) => {
            if(index !== 0 && index !== 1 && index !== this.planLength) {
            currentMax = this.getMax(shift.Montag, currentMax)
            }
        })
        return currentMax
    } 
    
    getMax (shift, currentMax) {
        if(this.hasAnzahl(shift)) {
            if (shift.anzahl > currentMax) {
                currentMax = shift.anzahl
            }
        }
        return currentMax
    }
    
    hasAnzahl (shift) {
        return this.getShiftKeys(shift).includes("anzahl")
    }
        
    getShiftScope() {
        if(this.isValidShift()) {
            this.setApplicant()
            //this.setHeatMapSetApplicants()
        }
    }
        
    setApplicant() {
       if(this.validateSetApplicants()) {
            if(this.hasValidApplicants(this.currentShiftsValidApplicants)) {
                this.startSetApplicants()
            } else {
                this.findAlternativeApplicant();
            }
        }
    }
    
    setHeatMapSetApplicants() {
        if(this.isHeadMapFilled(this.heatMapSetApplicants)) {
            this.setValueInHeatMapFromSetApplicants()
        }
    }
    
    validateSetApplicants() {
        let canStart = !1;
        let shift = this.geCurrentShift();
        if(this.hasApplicants(shift)) {
            this.setShiftSetApplicants(shift);
            if(!this.isShiftFilled(shift)) {
                this.hasShiftMinQualifikation(shift);
                this.filterValidApplicants()
                canStart = !0;
            }
        }
        return canStart;
    }
    
    geCurrentShift() {
        return this.plan[this.currentIndex][this.currentDay];
    }
    
    isHeadMapFilled(heatMap) {
        return heatMap[this.currentIndex] < this.days.length;
    }
    
    setValueInHeatMapFromSetApplicants() {
        this.heatMapSetApplicants[this.currentIndex].push(this.getSetApplicantsIds(this.plan[this.currentIndey][this.currentDay]).length)
    }
    
    
    setValueInHeatMapFromApplicants() {
        this.heatMapApplicants[this.currentIndex].push(this.getApplicantsIds(this.plan[this.currentIndey][this.currentDay]).length)
    }
    adjustSetApplicants() {
        this.removeCurrentApplicantFromTargetShift()
        this.removeShiftFromCurrentApplicantsShifts()
        this.setAlterantiveApplicantInTargetShift()
        this.setShiftInAlternativeApplicantsShifts()
        this.setCurrentApplicantInCurrentShift()
        this.setShiftInCurrentApplicantsShifts()
    }
    
    setShiftInCurrentApplicantsShifts() {
        let shiftName = this.getShiftName()
        let shiftPosistion = this.getShiftPosition()
        this.employees.addShiftToShiftObject(this.currentApplicant, shiftName, this.currentDay, shiftPosistion);
    }
    
    setCurrentApplicantInCurrentShift() {
        let applicant = new Employee(this.employees.getEmployee(this.currentApplicant))
        let name = applicant.getName();
        if(name === "Aenne Moby") {
            console.log("current in current", this.currentDay, this.currentIndex, this.plan[this.currentIndex][this.currentDay])
        }
        this.plan[this.currentIndex][this.currentDay].setApplicants[this.currentApplicant] = name;
    }
    
    removeCurrentApplicantFromTargetShift () {
        let shiftDetails = this.alternativeShift
        delete this.plan[shiftDetails.row][shiftDetails.day].setApplicants[this.currentApplicant]
    }
    
    removeShiftFromCurrentApplicantsShifts () {
        let shiftDetails = this.alternativeShift
        this.employees.removeShiftFromEmployee(this.currentApplicant, shiftDetails.key);
    }
    
    setAlterantiveApplicantInTargetShift() {
        let alternativeApplicant = new Employee(this.employees.getEmployee(this.alternativeApplicantsId))
        let shiftDetails = this.alternativeShift
        let name = alternativeApplicant.getName();
        if(name === "Aenne Moby") {
            console.log("alt in target", this.currentDay, this.currentIndex, this.plan[this.currentIndex][this.currentDay])
        }
        this.plan[shiftDetails.row][shiftDetails.day].setApplicants[this.alternativeApplicantsId] = name;
        }
        
    getAlternativeShiftsDetails () {
        
    }
    
        
    setShiftInAlternativeApplicantsShifts() {
        let shiftDetails = this.alternativeShift
        let shiftsFullName = shiftDetails.key;
        let splitFullName = shiftsFullName.split("#")
        let shiftName = splitFullName[0]
        let shiftDay = shiftDetails.day
        let shiftPosistion = splitFullName[1];
        this.employees.addShiftToShiftObject(this.alternativeApplicantsId, shiftName, shiftDay, shiftPosistion);
    }
    
    
            
    findAlternativeApplicant() {
        let shift = this.plan[this.currentIndex][this.currentDay];
        let notFound = !0;
        let applicantIds = this.getApplicantsIds(shift);
        this.applicantsLength = applicantIds.length - 1;
        this.currentApplicantIndex = 0;
        while (notFound) {
            this.currentApplicant = applicantIds[this.currentApplicantIndex];
            notFound = this.whileNotFound(notFound)
            this.currentApplicantIndex += 1
        }
        return shift;
    }  
    
    whileNotFound (notFound = !0) {
        notFound = this.tryFindAlternative(notFound);
        this.validateFound();
        return notFound;
    }
            
    tryFindAlternative(notFound = !0) {
        if(this.currentApplicantIndex <= this.applicantsLength) {
            if(this.employees.applicantExists(this.currentApplicant)) {
                let shiftsReferences = this.getShiftsReference();
                notFound = this.canSwapShifts(shiftsReferences, notFound);
                notFound = !1;
                    
            }
        } else {
            notFound = !1;
        }
        return notFound;
    }
    
    validateFound() {
        if (this.alternativeApplicantsId !== undefined) {
            this.adjustSetApplicants()
            this.alternativeApplicantsId = undefined;
            this.alternativeShift = undefined;
        }
    }
    
    getShiftsReference () {
        let employee = this.employees.getEmployee(this.currentApplicant);
        let applicant = new Employee(employee);
        let currentShifts = applicant.getShifts()
        let shiftsArray = currentShifts.map(settedShift => {
            return this.getApplicantsShift(settedShift)
        })
        applicant = this.deleteInstance();
        return shiftsArray;
    }
    
    getApplicantsShift(settedShift) {
        let splitShift = settedShift.split("#");
        let ShiftKey = splitShift[0] + "#" + splitShift[1]
        let day = splitShift[2];
        let index = this.getIndex(ShiftKey)
            return {row: index, day: day, key: settedShift}
    }      
    
    canSwapShifts(shiftsReferences, notFound = !0) {
        let referencesLength = shiftsReferences.length - 1;
        let currentIndex = 0;
        while(currentIndex <= referencesLength) {
            notFound = this.searchSwap(shiftsReferences, currentIndex, notFound)
            if(notFound !== !0) {
                break
            }
            currentIndex += 1;
        }
        return notFound;
    }
    
    searchSwap(shiftsReferences, currentIndex, notFound) {
        let searchApplicantsIndex = 0;
        let shift = this.createSwapDetails(shiftsReferences, currentIndex);
        let searchApplicantsLength = this.getApplicantsIdsFromTarget(shift).length;
        while(searchApplicantsIndex <= searchApplicantsLength && notFound) {
            this.validateApplicant(shiftsReferences, notFound, shift, searchApplicantsIndex, currentIndex)
            searchApplicantsIndex += 1
        }
        return notFound;
    }
    
    validateApplicant(selectedReference, notFound, shift, searchApplicantsIndex, currentIndex) {
        let searchApplicantsIds = this.getApplicantsIdsFromTarget(shift);
        let applicantId = searchApplicantsIds[searchApplicantsIndex];
            if(this.employees.applicantExists(searchApplicantsIds[searchApplicantsIndex])) {
                if(applicantId !== this.currentApplicant) {
                    let applicant = new Employee(this.employees.getEmployee(applicantId));
                    let isAtMaximumShifts = applicant.getIsMaxShiftThisWeek();
                    let currentApplicant = new Employee(this.employees.getEmployee(this.currentApplicant));
                    let isSetInTargetDay = this.getApplicantIsSetInTargetShift(applicant, selectedReference[currentIndex].day);
                    let isSetInCurrentDay = this.getApplicantIsSetThisDay(currentApplicant);
                    console.log(this.currentApplicant)
                    if(!isAtMaximumShifts && !isSetInCurrentDay && !isSetInTargetDay) {
                        this.alternativeApplicantsId = applicantId;
                        this.alternativeShift = selectedReference[currentIndex];
                        notFound = !1;
                    }
                }
            }
        }
        
    getApplicantIsSetInTargetShift(applicant, targetDay) {
        let hasShift = !1;
        if(this.getEmployeeHasShifts(applicant)) {
            applicant.schichten.forEach(shift => {
                let day = shift.split("#")[2];
                if(day === targetDay) {
                    hasShift = !0;
                }
            })
        }
        return hasShift;
    }
    
    createSwapDetails(shiftsReferences, currentIndex) {
        let selectedReference = shiftsReferences[currentIndex];
        let selectedShiftRow = selectedReference.row;
        let selectedShiftDay = selectedReference.day;
        let shift = this.plan[selectedShiftRow][selectedShiftDay];
        return shift;
    }
    
    
    
    
            
    getIndex(ShiftKey) {
        return this.shiftLookUp[ShiftKey];
    }
            
    startSetApplicants() {
        const {name, shiftName, shiftPosistion } = this.getDetailsToSetApplicant();
        if(name === "Aenne Moby") {
            console.log("forwardset", this.currentDay, this.currentIndex, this.plan[this.currentIndex][this.currentDay])
        }
        this.plan[this.currentIndex][this.currentDay].setApplicants[this.currentShiftsFirstValidApplicant] = name;
        this.employees.addShiftToShiftObject(this.currentShiftsFirstValidApplicant, shiftName, this.currentDay, shiftPosistion);
    }
    
    getDetailsToSetApplicant() {
        let name = this.employees.getName(this.currentShiftsFirstValidApplicant)
        let shiftName = this.getShiftName();
        let shiftPosition = this.getShiftPosition();
        return {name:name, shiftName: shiftName, shiftPosistion: shiftPosition}
    }
            
    setShiftSetApplicants(shift) {
        if(!this.hasSetApplicants(shift)) {
            this.plan[this.currentIndex][this.currentDay]["setApplicants"] = {};
        }
    return shift;
    }
            
    hasValidApplicants(validApplicants) {
        return validApplicants.length > 0
    }
            
    getShiftName() {
        return this.plan[this.currentIndex].Wochentag.ShiftName;
    }
                
    getShiftPosition() {
        return this.plan[this.currentIndex].Wochentag.ShiftPosition;
    }
        
    deleteInstance () {
        return null;
    }
            
    filterValidApplicants() {
        let applicantsArray = this.getOrderedApplicants();
        let validApplicants = applicantsArray.filter(applicant => this.getValidApplicant(applicant) === !0)
        this.currentShiftsValidApplicants = validApplicants
        this.currentShiftsFirstValidApplicant = validApplicants[0]
    }
                
    hasShiftMinQualifikation(shift) {
        let minQualifikation = 1;
        if("prio" in shift) {
            minQualifikation = this.getQualifikation(shift["prio"])
        }
        this.currentShiftsMinimumQualifikation = minQualifikation;
    }
                
    getQualifikation(qualifikationString) {
        let minQualifikation = 1;
        if (qualifikationString === "Anfänger") {
            minQualifikation = 1;
        } 
        else if (qualifikationString === "Fortgeschritten") {
            minQualifikation = 2;
        }
        else if (qualifikationString === "Experte") {
            minQualifikation = 3;
        }
        return minQualifikation;
    }
            
    hasSetApplicants(shift) {
        return this.getShiftKeys(shift).includes("setApplicants");
    }
            
    getShiftKeys(shift) {
        return Object.keys(shift);
    }
            
    hasApplicants(shift) {
        return this.shiftInlcudesApplicants(shift);
    }
            
    shiftInlcudesApplicants (shift) {
        let includesApplicants = !1;
        if (this.getShiftKeys(shift).includes("applicants")) {
            if( this.getApplicantsIds(shift).length > 0 ) {
                includesApplicants = !0;
            }
        }
        return includesApplicants;
    }
    
    getApplicantsIdsFromTarget(shift) {
        return Object.keys(shift.applicants);
    }
            
    getApplicantsIds() {
        return Object.keys(this.plan[this.currentIndex][this.currentDay].applicants);
    }
    
    getSetApplicantsIds() {
        return Object.keys(this.plan[this.currentIndex][this.currentDay].setApplicants);
    }
        
    getApplicantShiftCount (applicant) {
        let employee = this.createEmployeeInstance(applicant)
        let shiftsCount = parseFloat(employee.getShiftsCount());
        employee = this.deleteEmployeeInstance();
        return shiftsCount;
    }
        
    getSortedApplicants(applicantsArray) {
        applicantsArray.sort((a,b) => this.compare(a,b))
        return applicantsArray;
    }
    
    compare( a, b ) {
        if ( this.getApplicantShiftCount(a) < this.getApplicantShiftCount(b)){
            return -1;
        }
        if ( this.getApplicantShiftCount(b) > this.getApplicantShiftCount(a)){
            return 1;
        }
            return 0;
    }
      
    getOrderedApplicants() {
        let applicantsIds = this.getApplicantsIds();
        applicantsIds = this.filterNotExistingAnymore(applicantsIds);
        applicantsIds = this.getSortedApplicants(applicantsIds);
        return applicantsIds;
    }
                
    filterNotExistingAnymore(applicantsArray) {
        let employeesIds = this.employees.getAllEmployeesIds()
        let filteredApplicantsArray = applicantsArray.filter(applicant => employeesIds.includes(applicant))
        return filteredApplicantsArray;
    }
                
        
    createEmployeeInstance (applicantId) {
        let employee = this.employees.getEmployee(applicantId)
        return new Employee(employee);
    }
        
    deleteEmployeeInstance () {
        return null;
    }
            
    // get valid applicants. based on qualification and maximum shifts per week
    getValidApplicant(applicant) {
        let valid = !1;
        let employee = this.createApplicantInstance(applicant);
        let validQualifikation = this.getApplicantHasMinimumQualifikation(employee);
        let validShiftsCount = this.getApplicantAtMaximumShiftsThisWeek(employee);
        let validIsSetThisDay = this.getApplicantIsSetThisDay(employee);
        valid = this.isCountAndQaulifikationAndNotSetValid(validQualifikation, validShiftsCount, validIsSetThisDay);
        employee = this.deleteApplicantInstance();
        return valid;
    }
    
    getApplicantIsSetThisDay(employee) {
        let hasShift = !1;
        if(this.getEmployeeHasShifts(employee)) {
            employee.schichten.forEach(shift => {
                let day = shift.split("#")[2];
                if(day === this.currentDay) {
                    hasShift = !0;
                }
            })
        }
        return hasShift;
    }
    
    getEmployeeHasShifts(employee) {
        let hasShifts = !1;
        if(employee.schichten.length > 0) {
            hasShifts = !0
        }
        return hasShifts;
    }
    
        
    isCountAndQaulifikationAndNotSetValid(validQualifikation, validShiftsCount, validIsSetThisDay) {
        return (validQualifikation && validShiftsCount && !validIsSetThisDay);
    }
        
    createApplicantInstance(applicantId) {
        let employee = this.employees.getEmployee(applicantId)
        return new Employee(employee);
    }
        
    deleteApplicantInstance() {
        return null;
    }
        
    getApplicantHasMinimumQualifikation(employee) {
        return this.validateApplicantHasMinimumQualifikation(employee);
    }
    
    getApplicantQualifikation (employee) {
        let qualifikation = employee.getQualifikation();
        return qualifikation;
    }
                
    validateApplicantHasMinimumQualifikation(employee) {
        let employeeQualifikation = this.getApplicantQualifikation(employee);
        let hasQualifikation = !1;
        if (employeeQualifikation >= this.currentShiftsMinimumQualifikation) {
            hasQualifikation = !0;
        }
        return hasQualifikation;
    }
        
    getApplicantAtMaximumShiftsThisWeek (employee) {
        let isAtMax = !this.isApplicantAtMaximumShifts(employee)
        return isAtMax;
    }
        
    getApplicantShifts(employee) {
        return employee.getShiftsCount();
    }        
    
    getApplicantMaxShifts(employee) {
        return employee.getShiftsPerWeek();
    }
    
    isApplicantAtMaximumShifts (employee) {
        return this.getApplicantShifts(employee) >= this.getApplicantMaxShifts(employee);
    }
        
    isValidApplicant(validQualifikation, validShiftsCount) {
        return validQualifikation && validShiftsCount;
    }        
        
         // get nessesary days to iterate over
    createActiveDays(index) {
        this.getDays(index);
        this.removeWochentag()
        this.filterActiveDays(index);
        this.sortDaysTypeSplit();
        };
        
        
    getDays(index) {
        let days = Object.keys(this.plan[index])
        this.days = days
        }
            
    removeWochentag() {
        return this.days.shift();
    }

    filterActiveDays(index) {
        let days = this.days.filter(day => this.isActive(this.plan[index], day) === !0);
        this.days = days;
    }

    isActive(plan, day) {
        let hasActive = plan[day].frei;
        return hasActive;
    }
            
    sortDaysTypeSplit() {
        let days = [...this.days];
        let daysArray = [];
        daysArray = this.pushFirstAndSecondDay(daysArray, days);
        days = this.spliceFirstAndSecondDay(days);
        daysArray = this.pushReverseDays(daysArray, days);
        this.days = daysArray;
    }
                
    pushFirstAndSecondDay(daysArray, days) {
        daysArray.push(days[0]);
        daysArray.push(days[1]);
        return daysArray;
    }
                
    pushReverseDays(daysArray, days) {
        let reverseArry = days.reverse();
        reverseArry.forEach(day => {
            daysArray.push(day);
        });
        return daysArray;
    }
                
    spliceFirstAndSecondDay(days) {
        days.shift();
        days.shift();
        return days;
    }
        
    getShiftplanLength() {
        return this.plan.length;
    }
        
    isValidShift() {
        return this.validRow() && this.validDay();
    }
    
    validRow() {
        return this.currentIndex > 1 && this.currentIndex < this.planLength
    }
            
    validDay() {
        return this.days.includes(this.currentDay)
    }

        
    isShiftFilled(shift) {
        return this.getShiftsCurrentSetApplicantsLength(shift) >= this.getShiftsMaxSetApplicants(shift)
    }
    
    getShiftsCurrentSetApplicantsLength(shift) {
        return Object.keys(shift.setApplicants).length
    }
    
    getShiftsMaxSetApplicants(shift) {
        return shift.anzahl;
    }
    
    setApplicantInShift(shift, applicantId, applicantName) {
        return shift[applicantId] = applicantName;
    }

    setValidApplicants() {

        }

    getLowestApplicant() {
        return this.orderApplicants[0];
    }

    
    getAllShiftplanDetails() {
        return {
            plan: this.plan,
            employees: this.Emplyoees
        
        } 
    }
    
    getPlan() {
        return this.plan;
    }

}

module.exports = Shiftplan;