import { Ball } from "./ball.model";
import { GameOptions } from "./game-options.model";
import { Letters } from "./letters.model";

export interface Game {
    gameNumber: number;
    options: GameOptions;
    startTime: Date;
    balls: { [key in Letters]: Ball[] };
    calls: Ball[];
    message: string;
}
