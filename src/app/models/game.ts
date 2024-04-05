import { Ball } from "./ball";
import { Letters } from "./letters";
import { WinningPattern } from "./winning-patter";

export interface Game {
    gameNumber: number;
    gameColor: string;
    winningPatterns: WinningPattern[];
    balls: { [key in Letters]: Ball[] };
}