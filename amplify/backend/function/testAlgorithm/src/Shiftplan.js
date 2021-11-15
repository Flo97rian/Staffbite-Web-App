const { 
    Employee,
} = require('./Employee.js');

export class Shiftplan {
    constructor(plan, Employees) {
        this.plan = plan.plan
        this.Emplyoees = Employees
    }

    startAlg() {


        function isValid() {

        }
        function isShiftFilled(shift) {
            function getShiftsMaxSetApplicants(shift) {
                return shift.anzahl;
            }
    
            function getShiftsCurrentSetApplicantsLength(shift) {
                return Object.keys(shift.setApplicants).length
            }

            let filled = !1;
            if(getShiftsCurrentSetApplicantsLength(shift) >= getShiftsMaxSetApplicants(shift)) {
                filled = !0;
            }
            return filled;
        }

        function setApplicantInShift(shift, applicantId, applicantName) {
            return shift[applicantId] = applicantName;
        }

    }

    setValidApplicants() {

        }

    // get nessesary days to iterate over
    getActiveDays(copyplan) {
            function getDays(copyplan) {
                return Object.keys(copyplan[2]).shift()
            }

            function filterActiveDays(copyplan, days) {
                return days.filter(day => isActive(copyplan[2], day) === !0)
            }

            function isActive(copyplan, day) {
                let active = !0;
                let hasActive = copyplan[day].frei;
                if (!hasActive) {
                    active = !1;
                }
                return active;
            }

        let days = getDays(copyplan);
        days = filterActiveDays(copyplan, days);
        return days;
    }


    // get valid applicants. based on qualification and maximum shifts per week
    getValidApplicant(minQualifikation, applicant) {
        let valid = !1;
        let employee = createApplicantInstance(applicant);


        function createApplicantInstance(applicant) {
            return new Employee(applicant);
        }

        function deleteApplicantInstance() {
            return null;
        }

        function hasQualifikation(minQualifikation, employee) {

            function getApplicantQualifikation (employee) {
                let qualifikation = employee.getQualifikation();
                return qualifikation;
            }

            function hasMinQualifikation(minQualifikation, employee) {
                let employeeQualifikation = getApplicantQualifikation(employee);
                let hasQualifikation = !1;
                if (employeeQualifikation >= minQualifikation) {
                    hasQualifikation = !0;
                }
                return hasQualifikation;
            }

            return hasMinQualifikation(minQualifikation, employee);
        }

        function maxShiftsThisWeek (employee) {
            function getApplicantShifts(employee) {
                return employee.getShiftsCount();
            }

            function getApplicantMaxShifts() {
                return employee.getShiftsPerWeek();
            }

            function isMax (employee) {
                let hasMax = !1;
                if (getApplicantShifts(employee) >= getApplicantMaxShifts(employee)) {
                    hasMax = !0;
                }
                return hasMax;
            }
            return isMax(employee);
        }

        let validQualifikation = hasQualifikation(minQualifikation, employee);
        let validShiftsCount = maxShiftsThisWeek(employee);

        function isValid(validQualifikation, validShiftsCount) {
            let valid = !1;
            if (validQualifikation && validShiftsCount) {
                valid = !0;
            }
            return valid;
        }

        valid = isValid(validQualifikation, validShiftsCount);
        employee = deleteApplicantInstance();
        return valid;
    }

    getLowestApplicant() {
        return this.orderApplicants[0];
    }

    orderApplicants(applicants) {

        function getApplicantsIds(applicants) {
            return Object.keys(applicants);
        }

        function getApplicantShiftCount (applicant) {
            let employee = createEmployeeInstance(applicant)
            let shiftsCount = parseFloat(employee.getShiftsCount());
            employee = deleteEmployeeInstance();
            return shiftsCount;
        }

        function getSortedApplicants(applicantsArray) {
            applicantsArray.sort((a, b) => getApplicantShiftCount(a) - getApplicantShiftCount(b))
        }

        function getOrderedApplicants(applicants) {
            let applicantsArray = getApplicantsIds(applicants);
            return getSortedApplicants(applicantsArray);

        }

        function createEmployeeInstance (applicant) {
            return new Employee(this.Employees[applicant])
        }

        function deleteEmployeeInstance () {
            return null;
        }


        return getOrderedApplicants(applicants);
    }


}