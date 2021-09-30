
export const updateShiftPlan = (Plans, currentShiftPlan, ShiftSlot, User) => {
    let plan = Plans[currentShiftPlan]
    let plans = [...Plans]
    delete plan.plan[ShiftSlot.row][ShiftSlot.col]["applicants"][User.SK["S"]]
    plans[currentShiftPlan] = plan
    return plans
}