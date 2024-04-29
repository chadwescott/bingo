import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ball } from "../models/ball.model";
import { Balls } from "../models/balls.model";
import { defaultGameOptions as DefaultGameOptions, GameOptions } from "../models/game-options.model";
import { Game } from "../models/game.model";
import { Letters } from "../models/letters.model";
import { WinPattern } from "../models/win-pattern.model";
import { winPatterns } from "../models/win-patterns.model";
import { FireStoreService } from "./fire-store.service";

@Injectable({
    providedIn: 'root'
})
export class GameService {
    currentGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
    games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
    lastCall$: BehaviorSubject<Ball | null> = new BehaviorSubject<Ball | null>(null);
    previousCalls$: BehaviorSubject<Ball[]> = new BehaviorSubject<Ball[]>([]);
    channel = new BroadcastChannel('bingo-game-channel');

    private readonly _currentGameKey = 'bingo-current-game';
    private readonly _gamesKey = 'bingo-games';

    constructor(fireStoreService: FireStoreService) {
        this.channel.addEventListener('message', event => {
            const currentGame = event.data as Game;
            this.currentGame$.next(currentGame);
            this.lastCall$.next(currentGame?.calls[currentGame?.calls.length - 1]);

            document.documentElement.style.setProperty('--board-color', currentGame.options.boardColor);
            document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);
            document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
            this.updatePreviousCalls();
        });

        this.loadData();

        fireStoreService.connectToStore('bingo');
        fireStoreService.games?.subscribe(g => console.log(g));
    }

    private loadData(): void {
        const gamesJson = localStorage.getItem(this._gamesKey);
        if (gamesJson) {
            const games = JSON.parse(gamesJson) as Game[];
            games.map(game => this.updateGameWinPattern(game));
            this.games$.next(games);
        }

        const currentGameJson = localStorage.getItem(this._currentGameKey);
        if (currentGameJson) {
            try {
                const currentGame = JSON.parse(currentGameJson) as Game;
                this.updateGameWinPattern(currentGame);
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

    private updateGameWinPattern(game: Game): void {
        game.options.winPattern = winPatterns.find(wp => wp.name === game.options.winPattern.name) ?? winPatterns[0];
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

        const startIndex = Math.max(calls.length - 6, 0);
        const endIndex = calls.length - 1;
        this.previousCalls$.next(currentGame.calls.slice(startIndex, endIndex).reverse());
    }

    private saveCurrentGame(): void {
        const currentGame = this.currentGame$.value;
        if (!currentGame) { return; }

        localStorage.setItem(this._currentGameKey, JSON.stringify(currentGame));
        this.channel.postMessage(currentGame);

        document.documentElement.style.setProperty('--board-color', currentGame?.options?.boardColor);
        document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
        document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);

        const games = this.games$.value;
        games[games.findIndex(g => g.startTime === currentGame.startTime)] = currentGame;
        this.games$.next(games);
        this.saveGames();
    }

    private saveGames(): void {
        localStorage.setItem(this._gamesKey, JSON.stringify(this.games$.value));
    }

    createGame(gameNumber: number, options: GameOptions, message: string = ''): void {
        options.markerColor = options.disableMarkerColor ? options.boardColor : options.markerColor;
        const game: Game = {
            gameNumber: gameNumber,
            options: options,
            message: message,
            startTime: new Date(),
            balls: this.getBalls(),
            calls: []
        };

        this.currentGame$.next(game);
        this.saveCurrentGame();

        this.games$.value.push(game);
        this.saveGames();
    }

    private getBalls(): { [key in Letters]: Ball[] } {
        return {
            [Letters.B]: Balls.filter(ball => ball.letter === Letters.B).map(ball => ({ ...ball, called: false })),
            [Letters.I]: Balls.filter(ball => ball.letter === Letters.I).map(ball => ({ ...ball, called: false })),
            [Letters.N]: Balls.filter(ball => ball.letter === Letters.N).map(ball => ({ ...ball, called: false })),
            [Letters.G]: Balls.filter(ball => ball.letter === Letters.G).map(ball => ({ ...ball, called: false })),
            [Letters.O]: Balls.filter(ball => ball.letter === Letters.O).map(ball => ({ ...ball, called: false }))
        };
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
        this.currentGame$.next(game);
        this.saveCurrentGame();
    }

    resetGame(game: Game): void {
        game.balls = this.getBalls();
        game.calls = [];
        this.updateGame(game);
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