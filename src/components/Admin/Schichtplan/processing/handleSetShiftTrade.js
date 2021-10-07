export const handleSetShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    let plan = Plans[currentShiftPlan]
    let row = plan.tauschanfrage[index].row
    let col = plan.tauschanfrage[index].col
    // zero bewerber
    let trader = plan.tauschanfrage[index].trader
    let applicant = daysIsActive !== null && Object.keys(daysIsActive).includes("setTrade") ? daysIsActive.setTrade : Object.keys(plan.tauschanfrage[index].applicants)[0]
    delete plan.plan[row][col].setApplicants[trader]
    plan.plan[row][col].setApplicants[applicant] = Employees[applicant].name
    plan.tauschanfrage.splice(index, 1)
    return plan
}

export const handleCancelShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    let plan = Plans[currentShiftPlan]
    plan.tauschanfrage.splice(index, 1)
    return plan
}

