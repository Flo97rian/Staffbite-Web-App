import { Applicant } from "./Applicants"

export type Shift = {
    frei: boolean,
    anzahl?: number
    prio?: string | boolean
    applicants? : Applicant,
    setApplicants?: Applicant,
    applicantsAfterPublish?: Applicant,
    notice?: string
}