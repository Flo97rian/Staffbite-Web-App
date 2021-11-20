class Employee {
    constructor(user, zeitraum) {
        this.name = user.name;
        this.schichtenwoche = user.schichtenwoche;
        this.erfahrung = user.erfahrung;
        this.position = user.position;
        this.bewerbungen = user.bewerbungen;
        this.schichten = user.schichten;

    }

    getQualifikation () {
        let employeeQualifikation;
        if (this.erfahrung === "Anfänger") {
            employeeQualifikation = 1;
        } 
        else if (this.erfahrung === "Fortgeschritten") {
            employeeQualifikation = 2;
        }
        else if (this.erfahrung === "Experte") {
            employeeQualifikation = 3;
        }
    return employeeQualifikation;
    }
    
    getApplications () {
        return this.bewerbungen[this.getApplicationsZeitraum()];
    }

    getApplicationsZeitraum () {
        return Object.keys(this.bewerbungen)[0];
    }
    
    getApplicationsCount() {
        let applications = 0;
        if (this.hasApplications()) {
            applications = this.getApplications().length;   
        }
        return applications;
    }
    
    hasApplications() {
        let valid = !1;
        if (this.getApplicationsZeitraum() !== undefined) {
            valid = !0;
        }
        return valid;
    }

    getShifts () {
        return this.schichten;
    }
    
    getShiftsZeitraum () {
        return Object.keys(this.schichten)[0];
    }

    getShiftsCount() {
        let shifts = 0;
        if (this.hasShifts()) {
            shifts = this.schichten.length;   
        }
        return shifts;
    }
    
    hasShifts() {
        let valid = !1;
        if (this.schichten.length > 0) {
            valid = !0;
        }
        return valid;
    }

    getIsMaxShiftThisWeek() {
        let isMax = !1;
        if (Number(this.schichtenwoche) === this.getShiftsCount()) {
            isMax = !0;
        }
        return isMax;
    }
    
    getShiftsPerWeek () {
        return Number(this.schichtenwoche);
    }

    getEmployee () {
        
        }
        
    getName () {
        return this.name;
    }
}

module.exports = Employee;