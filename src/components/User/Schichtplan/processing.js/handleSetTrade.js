export const handleSetTrade = (Plans, currentShiftPlan, ShiftSlot, User) => {
    let plan = Plans[currentShiftPlan]
    let slot = {}
    let user = User.SK["S"]
    slot["row"] = ShiftSlot.row
    slot["col"] = ShiftSlot.col
    slot["trader"] = user
    slot["applicants"] = {}
    plan.tauschanfrage.push(slot)
    return plan
}

export const handleDeleteShiftTrade = (Plans, currentShiftPlan, index) => {
    let plan = Plans[currentShiftPlan]
    plan.tauschanfrage.splice(index, 1)
    return plan
}