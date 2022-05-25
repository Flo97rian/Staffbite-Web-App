import { Shift } from "./Shift";
import { Weekday } from "./Weekday";

export type Shiftrow = {
    Wochentag: Weekday | string,
    Montag: Shift | string,
    Dienstag: Shift | string,
    Mittwoche: Shift | string,
    Donnerstag: Shift | string,
    Freitag: Shift | string,
    Samstag: Shift | string,
    Sonntag: Shift | string
};