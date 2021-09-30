export const handleSetShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    let plan = Plans[currentShiftPlan]
    console.log(plan)
    let row = plan.tauschanfrage[index].row
    let col = plan.tauschanfrage[index].col
    // zero bewerber
    let trader = plan.tauschanfrage[index].trader
    console.log(daysIsActive)
    let applicant = daysIsActive !== null && Object.keys(daysIsActive).includes("setTrade") ? daysIsActive.setTrade : Object.keys(plan.tauschanfrage[index].applicants)[0]
    console.log(plan.plan[row][col], trader, applicant)
    delete plan.plan[row][col].setApplicants[trader]
    plan.plan[row][col].setApplicants[applicant] = Employees[applicant].name
    console.log(plan.plan[row][col])
    plan.tauschanfrage.splice(index, 1)
    console.log(plan.tauschanfrage)
    console.log(plan.plan[row][col])
    return plan
}

export const handleCancelShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    let plan = Plans[currentShiftPlan]
    plan.tauschanfrage.splice(index, 1)
    return plan
}

