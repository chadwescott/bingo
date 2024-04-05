import { Ball } from "./ball";
import { WinningPattern } from "./winning-patter";

export interface Game {
    gameNumber: number;
    gameColor: string;
    winningPatterns: WinningPattern[];
    balls: Ball[];
}