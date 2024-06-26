import { WinPattern } from "./win-pattern.model";
import { winPatterns } from "./win-patterns.model";

export interface GameOptions {
    boardColor: string,
    boardTextColor: string,
    markerColor: string,
    disableMarkerColor: boolean,
    winPattern: WinPattern
}

export const defaultGameOptions: GameOptions = {
    boardColor: '#ff0000',
    boardTextColor: '#ffffff',
    markerColor: '#ff0000',
    disableMarkerColor: false,
    winPattern: winPatterns[0]
}
