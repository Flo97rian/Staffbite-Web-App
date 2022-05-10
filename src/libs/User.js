export default class User {
    constructor(user) {
        this.name = user.name
        this.email = user.email
        this.uebersunden = user.uebersunden
        this.schichtenwoche = user.schichtenwoche
        this.aktiv = user.aktiv
        this.verdiensthistorie = user.verdiensthistorie
        this.frei = user.frei
        this.schichten = user.schichten
        this.bewerbungen = user.bewerbungen
        this.aktuellerverdienst = user.aktuellerverdienst
        this.SK = user.SK
        this.zielmtlh = user.zielmtlh
        this.erfahrung = user.erfahrung
        this.PK = user.PK
        this.stundenlohn = user.stundenlohn
        this.position = user.position
    }

    configure(user) {
        this.name = user.name["S"]
        this.email = user.email["S"]
        this.uebersunden = user.uebersunden["BOOL"]
        this.schichtenwoche = user.schichtenwoche["N"]
        this.aktiv = user.aktiv["BOOL"]
        this.verdiensthistorie = JSON.parse(user.verdiensthistorie["S"])
        this.frei = user.frei["BOOL"]
        this.schichten = JSON.parse(user.schichten["S"])
        this.bewerbungen = JSON.parse(user.bewerbungen["S"])
        this.aktuellerverdienst = JSON.parse(user.aktuellerverdienst["S"])
        this.SK = user.SK["S"]
        this.zielmtlh = user.zielmtlh["N"]
        this.erfahrung = user.erfahrung["S"]
        this.PK = user.PK["S"]
        this.stundenlohn = user.stundenlohn["N"]
        this.position = JSON.parse(user.position["S"])
    }

    getUser() {
        return {
        name: this.name,
        email: this.email,
        uebersunden: this.uebersunden,
        schichtenwoche: this.schichtenwoche,
        aktiv: this.aktiv,
        verdiensthistorie: this.verdiensthistorie,
        frei: this.frei,
        schichten: this.schichten,
        bewerbungen: this.bewerbungen,
        aktuellerverdienst: this.aktuellerverdienst,
        SK: this.SK,
        zielmtlh: this.zielmtlh,
        erfahrung: this.erfahrung,
        PK: this.PK,
        stundenlohn: this.stundenlohn,
        position: this.position,
        }
    }
}