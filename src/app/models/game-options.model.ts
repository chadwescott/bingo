import { WinPattern } from "./win-pattern.model";
import { winPatterns } from "./win-patterns.model";

export interface GameOptions {
    boardColorCode: string,
    boardColorName: string,
    winPattern: WinPattern
}

export const defaultGameOptions: GameOptions = {
    boardColorCode: '#f00',
    boardColorName: 'Red',
    winPattern: winPatterns[0]
}
