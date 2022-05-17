import { createSlice } from "@reduxjs/toolkit"

const shift = {
    frei: true,
    prio: false,
    applicants: {},
    setApplicants: {},
    applicantsAfterPublish: {},
    anzahl: 0,
    notice: "",
}

const weekday = {
    ShiftName: "",
    ShiftStart: "",
    ShiftEnd: "",
    ShiftPosition: "",
    frei: true,
}

const initialState = {
    shiftRow: {
        Wochentag: weekday,
        Montag: shift,
        Dienstag: shift,
        Mittwoch: shift,
        Donnerstag: shift,
        Freitag: shift,
        Samstag: shift,
        Sonntag: shift,
    },
    shift: {
        frei: true,
        prio: false,
        applicants: {},
        setApplicants: {},
        applicantsAfterPublish: {},
        anzahl: 0,
        notice: "",
    },
    weekday: {
        ShiftName: "",
        ShiftStart: "",
        ShiftEnd: "",
        ShiftPosition: ""
    }
}

const shiftDetailsSlice = createSlice({
    name: "shiftDetails",
    initialState,
    reducers: {
        settingShiftRow(state, action) {
            state.shiftRow = action.payload;
        },
        settingShift(state, action) {
            console.log(action);
            console.log(state.shift)
            state.shift = action.payload;

        },
        settingWeekday(state, action) {
            state.weekday = action.payload
        },
    }
});

export const {settingShift, settingWeekday, settingShiftRow} = shiftDetailsSlice.actions;
  
export default shiftDetailsSlice.reducer