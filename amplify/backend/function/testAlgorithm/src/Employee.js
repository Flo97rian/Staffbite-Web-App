export class Employee {
    constructor(user, zeitraum) {
        this.SK = user.SK["S"];
        this.name = user.name["S"];
        this.email = user.email["S"];
        this.schichtenwoche = user.schichtenwoche["S"];
        this.erfahrung = user.erfahrung["S"];
        this.position = JSON.parse(user.position["S"]);
        this.bewerbungen = JSON.parse(user.bewerbungen["S"][zeitraum]);
        this.schichten = JSON.parse(user.schichten["S"][zeitraum]);
        this.stundenlohn = user.stundenlohn["N"];
        this.zielmtleuro = user.zielmtleuro["N"];
        this.zielmtlh = user.zielmtlh["N"];

    }

    getQualifikation () {
        let employeeQualifikation;
        if (this.qualifikation === "Anfägner") {
            employeeQualifikation = 1;
        } 
        else if (this.qualifikation === "Fortgeschritten") {
            employeeQualifikation = 2;
        }
        else if (this.qualifikation === "Experte") {
            employeeQualifikation = 3;
        }
    return employeeQualifikation;
    }
    getApplications () {
        return this.bewerbungen;
    }


    getApplicationsCount() {
        return this.getApplications().length;
    }

    getShifts () {
        return this.schichten;
    }

    getShiftsCount() {
        return this.getShifts().length;
    }

    getIsMaxShiftThisWeek() {
        let isMax = !1;
        if (this.schichtenwoche === this.getShiftsCount()) {
            isMax = !0;
        }
        return isMax;
    }
    
    getShiftsPerWeek () {
        return this.schichtenwoche;
    }

    getEmployee () {
        
        }
}