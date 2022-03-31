let initalMeta = {
    zeiterfassung: false,
    automatischeBefuellung: false,
    mitarbeiterApp: false,
    bewerbungssystem: false,
    schichtplan: true
}

let initalUser = {
    
}

let initalEmployees = {

}

let initalSchichtplan = {
    tauschanfrage: [],
    plan: [{"Wochentag":"Wochentag","Montag":"Montag","Dienstag":"Dienstag","Mittwoch":"Mittwoch","Donnerstag":"Donnerstag","Freitag":"Freitag","Samstag":"Samstag","Sonntag":"Sonntag"},{"Wochentag":{"frei":false,"ShiftName":"Frühschicht","ShiftPosition":"Leitung","ShiftStart":"08:00","ShiftEnd":"15:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":{"frei":false,"ShiftName":"Abend","ShiftPosition":"Leitung","ShiftStart":"15:00","ShiftEnd":"22:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":{"frei":false,"ShiftName":"Springer","ShiftPosition":"Leitung","ShiftStart":"12:00","ShiftEnd":"18:00"},"Montag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Dienstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":false,"anzahl":1},"Mittwoch":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Donnerstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Freitag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Samstag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1},"Sonntag":{"applicants":{},"setApplicants":{},"notice":"","prio":false,"frei":true,"anzahl":1}},{"Wochentag":"Summe","Montag":0,"Dienstag":0,"Mittwoch":0,"Donnerstag":0,"Freitag":0,"Samstag":0,"Sonntag":0}],
    name: "Name",
    schichtentag: 3,
    zeitraum: "01.01.2021 - 07.01.2021",
}

let initalState = {
    schichtplan: initalSchichtplan,
    user: !1,
    meta: initalMeta
}
export default class DemoInterface {
    constructor(initalState) {
        this.schichtplan = initalSchichtplan;
        this.user = initalUser;
        this.meta = initalMeta;
    }

    getShiftplanName () {
        return this.schichtplan.name;
    }

    getShiftplanTauschanfrage () {
        return this.schichtplan.tauschanfrage;
    }

    getShiftplanSchichtentag () {
        return this.schichtplan.schichtentag;
    }

    getShiftplanZeitraum () {
        return this.schichtplan.zeitraum;
    }

    getShiftplanPlan () {
        return this.schichtplan.plan;
    }
}