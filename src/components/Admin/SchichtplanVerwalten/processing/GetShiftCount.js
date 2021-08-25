
export const getShiftCount = (employees, shiftplan) => {
    shiftplan.forEach(element => {
        for (let [key, val] of Object.entries(element)) {
            if (val.setApplicants && Object.keys(val.setApplicants).length > 0) {
                Object.keys(val.setApplicants).forEach(applicant => {
                    Object.keys(employees[applicant]).includes("shifts") ? employees[applicant].shifts += 1 : employees[applicant].shifts = 1
                })
            }
        }})
    return employees
}

export function refractorEmployees(employeesDB, shiftplan) {
    let employees = {}
    employeesDB.forEach(element => {
        employees[element.id] = element 
    });
    employees = getShiftCount(employees, shiftplan)
    return employees
}