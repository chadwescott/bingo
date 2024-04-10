import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ball } from "../models/ball.model";
import { Balls } from "../models/balls.model";
import { defaultGameOptions as DefaultGameOptions, GameOptions } from "../models/game-options.model";
import { Game } from "../models/game.model";
import { Letters } from "../models/letters.model";
import { WinPattern } from "../models/win-pattern.model";
import { winPatterns } from "../models/win-patterns.model";

@Injectable({
    providedIn: 'root'
})
export class GameService {
    currentGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
    games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
    lastCall$: BehaviorSubject<Ball | null> = new BehaviorSubject<Ball | null>(null);
    previousCalls$: BehaviorSubject<Ball[]> = new BehaviorSubject<Ball[]>([]);
    channel = new BroadcastChannel('game-channel');

    private readonly _currentGameKey = 'current-game';
    private readonly _gamesKey = 'games';

    constructor() {
        this.channel.addEventListener('message', event => {
            const currentGame = event.data as Game;
            this.currentGame$.next(currentGame);
            this.lastCall$.next(currentGame?.calls[currentGame?.calls.length - 1]);

            document.documentElement.style.setProperty('--board-color', currentGame.options.boardColorCode);
            this.updatePreviousCalls();
        });

        this.loadData();
    }

    private loadData(): void {
        const games = localStorage.getItem(this._gamesKey);
        if (games) {
            this.games$.next(JSON.parse(games));
        }

        const currentGameJson = localStorage.getItem(this._currentGameKey);
        if (currentGameJson) {
            try {
                const currentGame = JSON.parse(currentGameJson) as Game;
                currentGame.options.winPattern = winPatterns.find(wp => wp.name === currentGame.options.winPattern.name) ?? winPatterns[0];
                this.currentGame$.next(currentGame);
                this.updateLastCall();
                this.updatePreviousCalls();
            } catch (error) {
                this.createGame(1, DefaultGameOptions);
            }
        } else {
            this.createGame(1, DefaultGameOptions);
        }
        this.saveCurrentGame();
    }

    private updateLastCall() {
        const currentGame = this.currentGame$.value;
        this.lastCall$.next(currentGame && currentGame.calls.length > 0 ? currentGame.calls[currentGame.calls.length - 1] : null);
    }

    private updatePreviousCalls() {
        const currentGame = this.currentGame$.value;
        const calls = currentGame?.calls;

        if (!calls || calls.length < 2) {
            this.previousCalls$.next([]);
            return;
        }

        const startIndex = Math.max(calls.length - 7, 0);
        const endIndex = calls.length - 1;
        this.previousCalls$.next(currentGame.calls.slice(startIndex, endIndex).reverse());
    }

    private saveCurrentGame(): void {
        const currentGame = this.currentGame$.value;
        if (!currentGame) { return; }

        localStorage.setItem(this._currentGameKey, JSON.stringify(currentGame));
        this.channel.postMessage(currentGame);

        document.documentElement.style.setProperty('--board-color', currentGame?.options?.boardColorCode);

        const games = this.games$.value;
        games[games.findIndex(g => g.startTime === currentGame.startTime)] = currentGame;
        this.games$.next(games);
        this.saveGames();
    }

    private saveGames(): void {
        localStorage.setItem(this._gamesKey, JSON.stringify(this.games$.value));
    }

    createGame(gameNumber: number, options: GameOptions): void {
        const game = {
            gameNumber: gameNumber,
            options: options,
            startTime: new Date(),
            balls: {
                [Letters.B]: Balls.filter(ball => ball.letter === Letters.B).map(ball => ({ ...ball, called: false })),
                [Letters.I]: Balls.filter(ball => ball.letter === Letters.I).map(ball => ({ ...ball, called: false })),
                [Letters.N]: Balls.filter(ball => ball.letter === Letters.N).map(ball => ({ ...ball, called: false })),
                [Letters.G]: Balls.filter(ball => ball.letter === Letters.G).map(ball => ({ ...ball, called: false })),
                [Letters.O]: Balls.filter(ball => ball.letter === Letters.O).map(ball => ({ ...ball, called: false }))
            },
            calls: []
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
        const currentGame = this.currentGame$.value;
        if (!currentGame) { return; }

        if (ball.called) {
            currentGame.calls.push(ball);
        } else {
            const index = currentGame.calls.findIndex(b => b.letter === ball.letter && b.number === ball.number);
            if (index !== undefined && index !== -1) {
                currentGame.calls.splice(index, 1);
            }
        }

        this.updateLastCall();
        this.updatePreviousCalls();
        this.saveCurrentGame();
    }

    updateGame(game: Game): void {
        console.log(game);
        this.currentGame$.next(game);
        this.saveCurrentGame();
    }

    updateWinPattern(winPattern: WinPattern): void {
        const currentGame = this.currentGame$.value;
        if (currentGame === null) { return; }

        currentGame.options.winPattern = winPattern;
        this.saveCurrentGame();
    }

    deleteGame(game: Game): void {
        this.games$.next(this.games$.value.filter(g => g.startTime !== game.startTime));
        this.saveGames();

        if (this.currentGame$.value === game) {
            this.currentGame$.next(null);
            localStorage.removeItem(this._currentGameKey);
        }

    }

    clearGames(): void {
        this.games$.next([]);
        localStorage.removeItem(this._gamesKey);
    }
}