import { Applicant } from "./Applicants"

export type Shifttrade =  {
    row: number,
    col: string,
    applicants: Applicant[],
    traderId: string,
}