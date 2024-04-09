import { Ball } from "./ball";
import { Letters } from "./letters";
import { WinningPattern } from "./winning-pattern";

export interface Game {
    gameNumber: number;
    gameColor: string;
    winningPatterns: WinningPattern | undefined;
    balls: { [key in Letters]: Ball[] };
    calls: Ball[];
}