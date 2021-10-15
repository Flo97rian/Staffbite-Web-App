export const handleSetShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    var plan = Plans[currentShiftPlan];
    var row = plan.tauschanfrage[index].row;
    var col = plan.tauschanfrage[index].col;
    // zero bewerber
    var trader = plan.tauschanfrage[index].trader;
    var applicant = daysIsActive !== null && "setTrade" in daysIsActive ? daysIsActive.setTrade : Object.keys(plan.tauschanfrage[index].applicants)[0];
    delete plan.plan[row][col].setApplicants[trader];
    plan.plan[row][col].setApplicants[applicant] = Employees[applicant].name;
    plan.tauschanfrage.splice(index, 1);
    return plan;
};

export const handleCancelShfitTrade = (Plans, currentShiftPlan, index, daysIsActive, Employees) => {
    var plan = Plans[currentShiftPlan];
    plan.tauschanfrage.splice(index, 1);
    return plan;
};

