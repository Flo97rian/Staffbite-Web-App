
export const getShiftCount = (employees, shiftplan) => {
    shiftplan.forEach(element => {
        Object.values(element).forEach(val => {
            if (val.setApplicants && Object.keys(val.setApplicants).length > 0) {
                Object.keys(val.setApplicants).forEach(applicant => {
                    if(employees[applicant]) {
                        Object.keys(employees[applicant]).includes("dummyshifts") ? employees[applicant].dummyshifts += 1 : employees[applicant].dummyshifts = 1
                    }
                })
            }
        })})
    return employees
}

export function refractorEmployees(employeesDB, shiftplan) {
    let employees = {}
    for (let [key, value] of Object.entries(employeesDB)) {
        employees[key] = value
        const employeeIncludesDummyShifts = Object.keys(employees[key]).includes("dummyshifts")
        if(employeeIncludesDummyShifts) {
            employees[key]["dummyshifts"] = 0
        }  
    };
    employees = getShiftCount(employees, shiftplan)
    console.log("was zum fick", employees)
    return employees
}