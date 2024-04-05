import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ball } from "../models/ball";
import { Balls } from "../models/balls";
import { Game } from "../models/game";
import { Letters } from "../models/letters";

@Injectable({
    providedIn: 'root'
})
export class GameService {
    currentGame$: BehaviorSubject<Game | undefined> = new BehaviorSubject<Game | undefined>(undefined);
    games: Game[] = [];
    channel = new BroadcastChannel('game-channel');

    constructor() {
        this.channel.addEventListener('message', event => {
            this.currentGame$.next(event.data);
        });
    }

    createGame(): void {
        const game = {
            gameNumber: 1,
            gameColor: 'red',
            winningPatterns: [],
            balls: {
                [Letters.B]: Balls.filter(ball => ball.letter === Letters.B),
                [Letters.I]: Balls.filter(ball => ball.letter === Letters.I),
                [Letters.N]: Balls.filter(ball => ball.letter === Letters.N),
                [Letters.G]: Balls.filter(ball => ball.letter === Letters.G),
                [Letters.O]: Balls.filter(ball => ball.letter === Letters.O)
            }
        };

        this.games.push(game);
        this.currentGame$.next(game);
    }

    callBall(ball: Ball): void {
        ball.called = !ball.called;
        this.channel.postMessage(this.currentGame$.value);
    }
}