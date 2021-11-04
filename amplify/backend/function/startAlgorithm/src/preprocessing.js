const { 
    getShiftPlan,
    getEmployeeDetails,
    getMetaData,
    setReviewShiftPlan
} = require('./DB.js');

exports.preprocessing = async (event) => {
    let body = JSON.parse(event.body);
    let user = body.user;
    let ORG = "ORG#" + user["custom:TenantId"];
    let ORGMeta = "ORG#METADATA#" + user["custom:TenantId"];
    let id = body.id;
    let meta = await getMetaData(ORG, ORGMeta)
    let reverse = meta.Item.reverse["BOOL"]
    let stundenerfassung = meta.Item.stundenerfassung["BOOL"]
    let shiftPlan = await getShiftPlan(ORG, id);
    let employees = await getEmployeeDetails(ORG);
    let idreview = id.replace("Freigeben", "Review");
    const minerfahrung = 1;
    const getShifts = 2;
    let plan = await JSON.parse(shiftPlan.Item.data.S);
    let copyShiftPlan = plan;
    let shiftsOrderedByDay = await shiftHasApplicant({plan, minerfahrung});
    let allEmployees = await getEmployeeDetails(ORG);
    let lookUpUser = await createUserDetailsLookUp(allEmployees);
    return {ORG: ORG, body: body, shiftPlan: shiftPlan, employees:employees, idreview:idreview, minerfahrung:minerfahrung, getShifts:getShifts, plan: plan, copyShiftPlan: copyShiftPlan, shiftsOrderedByDay:shiftsOrderedByDay, allEmployees: allEmployees, lookUpUser:lookUpUser, reverse: reverse, stundenerfassung:stundenerfassung}
}

function createUserDetailsLookUp(employeelist) {
    let lookUpUserDetails = {};
    for (const [key, value] of Object.entries(employeelist.Items)) {
        lookUpUserDetails[value["SK"]["S"]] = value;
        lookUpUserDetails[value["SK"]["S"]].shifts = 0;
    }
    return lookUpUserDetails;
}

function shiftHasApplicant({plan, minerfahrung}) {
     let shifts = filterShifts(plan);
     let shiftsWithApplicants = filterShiftsPerDay({shifts, plan, minerfahrung});
     return shiftsWithApplicants;
     
}

function filterShifts(plan) {
        let keys = Object.keys(plan[0]);
        keys.shift();
        var shiftsDay = {};
        keys.forEach((item, index) => {
            shiftsDay[item] = {};
     });
     return shiftsDay;
}

function filterShiftsPerDay({shifts, plan, minerfahrung}) {
    let copyplan = plan;
    let len = plan.length - 1;
    copyplan.forEach((item, index) => {
        if (index == 0 || index == 1 || index == len) {
            return !1;
        } else {
         inverseShiftPlan({item, shifts, plan, index, minerfahrung});
        }
    });
    return shifts;
}

function inverseShiftPlan({item, shifts, plan, index, minerfahrung}) {
    let keys = Object.keys(shifts);
    keys.forEach(element => {
        setInverseDetails({item, plan, shifts, index, element, minerfahrung});
    });
    return shifts;
}

function setInverseDetails({plan, shifts, index, item, element, minerfahrung}) {
        let { ShiftName, ShiftStart, ShiftEnd, anzahl, applicants, sumMinErfahrung, frei, setApplicants, setValidApplicants, prio} = createInverseDetails({plan, shifts, index, item, element});
        shifts[element][index + "#" + ShiftName + "#" + ShiftStart + "#" + ShiftEnd] = {anzahl:anzahl, sumMinErfahrung:sumMinErfahrung, frei: frei, minQualifikation: minerfahrung, setApplicants: setApplicants, setValidApplicants, prio};
        const hasApplicants = Object.keys(applicants).length > 0 ? !0 : !1

        if (hasApplicants) {
            shifts[element][index + "#" + ShiftName + "#" + ShiftStart + "#" + ShiftEnd]["applicants"] = applicants
        }
        return shifts;
}

function createInverseDetails({plan, index, item, element }) {
        let ShiftName = plan[index].Wochentag.ShiftName;
        let ShiftStart = plan[index].Wochentag.ShiftStart;
        let ShiftEnd = plan[index].Wochentag.ShiftEnd;
        let prio = plan[index][element].prio ? plan[index][element].prio : !1
        let frei = plan[index][element].frei;
        let anzahl = plan[index][element].anzahl;
        let applicants = Object.keys(plan[index][element]).includes("applicants") ? plan[index][element]["applicants"] : {}
        let setApplicants = {};
        let setValidApplicants = {};
        let sumMinErfahrung = 0;
        let filled = !1;
        return {ShiftName: ShiftName, filled:filled, ShiftStart:ShiftStart, ShiftEnd:ShiftEnd, anzahl:anzahl, applicants:applicants, sumMinErfahrung:sumMinErfahrung, frei: frei, setApplicants: setApplicants, setValidApplicants: setValidApplicants, prio: prio};
}
