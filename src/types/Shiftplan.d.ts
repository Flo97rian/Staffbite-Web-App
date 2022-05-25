import { Shift } from "./Shift";
import { Shiftrow } from "./Shiftrow";
import { Shifttrade } from "./Shifttrade";

export type Shiftplan = {
    id: string,
    name: string,
    tauschanfrage: Shifttrade[],
    zeitraum: string,
    plan: Array<Shiftrow>,
    schichtentag: string
};