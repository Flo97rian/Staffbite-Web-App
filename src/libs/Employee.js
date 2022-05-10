export class Employee {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.schichtenwoche = user.schichtenwoche;
        this.erfahrung = user.erfahrung;
        this.position = user.position;
        this.stundenlohn = user.stundenlohn;
        this.zielmtleuro = user.zielmtleuro;
        this.zielmtlh = user.zielmtlh;
    }

    getName() {
        return this.name;
    }

    getEmailAdress() {
        return this.email;
    } 

    getQualifikation() {
        return this.erfahrung;
    }

    getShiftsPerWeek() {
        return this.schichtenwoche;
    }

    getPosition() {
        return this.position;
    }

    createEmployee(user) {
        let copyName = user.name;
        let copyEmail = user.email;
        let copyPosition = user.position;
        let copyQualifikation = user.erfahrung;
        
        function validName(userName) {
            let isValid = !1;
            let isPlaceholder = (userName === "Max Mustermann")
            if (!isPlaceholder) {
                let dividers = [" ", ", ", ","]
                let divider = dividers.find(substring => userName.includes(substring));
                    if (divider) {
                        isValid = !0;
                    }
            }
            return isValid;
        }

        function validEmail(userEmail) {
            let isValid = !1;
            let isPlaceholder = (userEmail === "max@mustermann.de")
            if (!isPlaceholder) {
                let at = "@"
                let point = "."
                let includesAt = userEmail.includes(at);
                let includesPoint = userEmail.includes(point);
                    if (includesAt && includesPoint) {
                        isValid = !0;
                    }
            }
            return isValid;
        }

        function validPosition(userPosition) {
            let isValid = !1;
            let isPlaceholder = (userPosition === [])
            if (!isPlaceholder) {
                isValid = !0;
            }
            return isValid;
        }


        let hasValidName = validName(copyName);
        let hasValidEmail = validEmail(copyEmail);
        let hasValidPosition = validPosition(copyPosition);
        if (hasValidName && hasValidEmail && hasValidPosition) {
            this.name = copyName;
            this.email = copyEmail;
            this.position = copyPosition;
        } else {
            this.error = "InvalidInputForCreation"
        };
    }

    getEmployeeDetails() {
        if (this.error) {
            return this.error;
        } else {
            return {
                name: this.name,
                email: this.email,
                position: this.position,
                schichtenwoche:this.schichtenwoche,
                erfahrung: this.erfahrung,
                stundenlohn: this.stundenlohn,
                zielmtleuro: this.zielmtleuro,
                zielmtlh: this.zielmtlh,
            }
        }
    }

}