import { Ball } from "./ball";
import { Letters } from "./letters";
import { WinPattern } from "./win-pattern";

export interface Game {
    gameNumber: number;
    boardColorName: string;
    gameColorCode: string;
    startTime: Date;
    winPattern: WinPattern;
    balls: { [key in Letters]: Ball[] };
    calls: Ball[];
}