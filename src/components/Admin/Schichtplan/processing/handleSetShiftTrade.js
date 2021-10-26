export const handleSetShfitTrade = (Plans, currentShiftPlan, index, userInput, Employees) => {
    var plan = Plans[currentShiftPlan];
    var row = plan.tauschanfrage[index].row;
    var col = plan.tauschanfrage[index].col;
    // zero bewerber
    var trader = plan.tauschanfrage[index].trader;
    var applicant = userInput !== null && "setTrade" in userInput ? userInput.setTrade : Object.keys(plan.tauschanfrage[index].applicants)[0];
    delete plan.plan[row][col].setApplicants[trader];
    plan.plan[row][col].setApplicants[applicant] = Employees[applicant].name;
    plan.tauschanfrage.splice(index, 1);
    return plan;
};

export const handleCancelShfitTrade = (Plans, currentShiftPlan, index, userInput, Employees) => {
    var plan = Plans[currentShiftPlan];
    plan.tauschanfrage.splice(index, 1);
    return plan;
};

