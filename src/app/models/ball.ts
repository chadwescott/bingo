import { Letters } from "./letters";

export interface Ball {
    letter: Letters;
    number: number;
    called: boolean;
}