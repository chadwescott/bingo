import { WinPattern } from "./win-pattern.model";
import { winPatterns } from "./win-patterns.model";

export interface GameOptions {
    boardColorCode: string,
    boardColorName: string,
    boardTextColorCode: string,
    winPattern: WinPattern
}

export const defaultGameOptions: GameOptions = {
    boardColorName: 'Red',
    boardColorCode: '#ff0000',
    boardTextColorCode: '#ffffff',
    winPattern: winPatterns[0]
}
