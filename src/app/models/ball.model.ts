import { Letters } from "./letters.model";

export interface Ball {
    letter: Letters;
    number: number;
    called: boolean;
}