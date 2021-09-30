export const handleSetApplicantTradeShift = (Plans, currentShiftPlan, ShiftSlot, User, index) => {
    let plan = Plans[currentShiftPlan]
    let user = User.SK["S"]
    let name = User.name["S"]
    if (plan.tauschanfrage[index].trader !== user) {
    console.log(user, name,  plan.tauschanfrage[index])
    plan.tauschanfrage[index].applicants[user] = name
    console.log(user, name,  plan.tauschanfrage[index])
    }
    return plan
}

export const handleCancelSetApplicantTradeShift = (Plans, currentShiftPlan, ShiftSlot, User, index) => {
    let plan = Plans[currentShiftPlan]
    let user = User.SK["S"]
    if (plan.tauschanfrage[index].trader !== user) {
    delete plan.tauschanfrage[index].applicants[user]
    }
    return plan
}