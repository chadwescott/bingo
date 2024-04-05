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
    games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
    channel = new BroadcastChannel('game-channel');

    private readonly _currentGameKey = 'current-game';
    private readonly _gamesKey = 'games';

    constructor() {
        this.channel.addEventListener('message', event => {
            this.currentGame$.next(event.data);
        });

        this.loadData();
    }

    private loadData(): void {
        const games = localStorage.getItem(this._gamesKey);
        if (games) {
            this.games$.next(JSON.parse(games));
        }

        const currentGame = localStorage.getItem(this._currentGameKey);
        if (currentGame) {
            this.currentGame$.next(JSON.parse(currentGame));
        } else {
            this.createGame();
        }
    }

    private saveCurrentGame(): void {
        localStorage.setItem(this._currentGameKey, JSON.stringify(this.currentGame$.value));
        this.channel.postMessage(this.currentGame$.value);
    }

    private saveGames(): void {
        localStorage.setItem(this._gamesKey, JSON.stringify(this.games$.value));
    }

    createGame(): void {
        const game = {
            gameNumber: this.games$.value.length + 1,
            gameColor: 'red',
            winningPatterns: [],
            balls: {
                [Letters.B]: Balls.filter(ball => ball.letter === Letters.B).map(ball => ({ ...ball, called: false })),
                [Letters.I]: Balls.filter(ball => ball.letter === Letters.I).map(ball => ({ ...ball, called: false })),
                [Letters.N]: Balls.filter(ball => ball.letter === Letters.N).map(ball => ({ ...ball, called: false })),
                [Letters.G]: Balls.filter(ball => ball.letter === Letters.G).map(ball => ({ ...ball, called: false })),
                [Letters.O]: Balls.filter(ball => ball.letter === Letters.O).map(ball => ({ ...ball, called: false }))
            }
        };

        this.currentGame$.next(game);
        this.saveCurrentGame();
        this.games$.value.push(game);
        this.saveGames();
    }

    selectGame(game: Game): void {
        this.currentGame$.next(game);
    }

    callBall(ball: Ball): void {
        ball.called = !ball.called;
        this.saveCurrentGame();
    }

    loadGame(game: Game): void {
        this.currentGame$.next(game);
        this.saveCurrentGame();
    }

    deleteGame(game: Game): void {
        this.games$.next(this.games$.value.filter(g => g !== game));
        this.saveGames();

        if (this.currentGame$.value === game) {
            this.currentGame$.next(undefined);
            localStorage.removeItem(this._currentGameKey);
        }

    }

    clearGames(): void {
        this.games$.next([]);
        localStorage.removeItem(this._gamesKey);
    }
}