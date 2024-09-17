import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
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
export class FireStoreService {
    private gamesCollection: AngularFirestoreCollection<{ currentGameIndex: number, games: string[] }> = this.firestore.collection('bingo');
    private documentId: string = '';
    private currentGameIndex = 0;

    documentId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    currentGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
    games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
    lastCall$: BehaviorSubject<Ball | null> = new BehaviorSubject<Ball | null>(null);
    previousCalls$: BehaviorSubject<Ball[]> = new BehaviorSubject<Ball[]>([]);

    constructor(private firestore: AngularFirestore) {
        this.connect('7kqMsz6d43Q2pkB0iUNM');
    }

    connect(id: string): void {
        this.gamesCollection.doc(id).get().subscribe(x => 
            {
                console.log(x.data)
                this.documentId = id;
            });

        this.gamesCollection.valueChanges().subscribe(game => {
            if (game.length > 0)
            {
                const games = game[0].games?.map(game => JSON.parse(game));
                this.games$.next(games);
                this.currentGameIndex = game[0].currentGameIndex;
                const currentGame = games[this.currentGameIndex];

                this.lastCall$.next(currentGame?.calls[currentGame?.calls.length - 1]);
                document.documentElement.style.setProperty('--board-color', currentGame.options.boardColor);
                document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);
                document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
                this.updatePreviousCalls(currentGame);
                this.updateGameWinPattern(currentGame);
                this.currentGame$.next(currentGame);
            }
        });
    }

    updateGame(game: Game): void {
        if (this.documentId) {
            const games = this.games$.value;
            games[this.currentGameIndex] = game;
            this.gamesCollection?.doc(this.documentId).update({ games: games.map(g => JSON.stringify(g)) });
        }
        else {
            const gameJson = JSON.stringify(game);
            this.gamesCollection?.add({ currentGameIndex: 0, games: [gameJson] }).then(x => {
                this.documentId = x.id;
                this.documentId$.next(x.id);
            });
        }
    }



    // private loadData(): void {
    //     const gamesJson = localStorage.getItem(this._gamesKey);
    //     if (gamesJson) {
    //         const games = JSON.parse(gamesJson) as Game[];
    //         games.map(game => this.updateGameWinPattern(game));
    //         this.games$.next(games);
    //     }

    //     const currentGameJson = localStorage.getItem(this._currentGameKey);
    //     if (currentGameJson) {
    //         try {
    //             const currentGame = JSON.parse(currentGameJson) as Game;
    //             this.updateGameWinPattern(currentGame);
    //             this.currentGame$.next(currentGame);
    //             this.updateLastCall();
    //             this.updatePreviousCalls();
    //         } catch (error) {
    //             this.createGame(1, DefaultGameOptions);
    //         }
    //     } else {
    //         this.createGame(1, DefaultGameOptions);
    //     }
    //     this.saveCurrentGame();
    // }

    private updateGameWinPattern(game: Game): void {
        console.log(game.options);
        // game.options.winPattern = winPatterns.find(wp => wp.name === game.options.winPattern.name) ?? winPatterns[0];
    }

    private updateLastCall() {
        const currentGame = this.currentGame$.value;
        this.lastCall$.next(currentGame && currentGame.calls.length > 0 ? currentGame.calls[currentGame.calls.length - 1] : null);
    }

    private updatePreviousCalls(game: Game) {
        const calls = game?.calls;

        if (!calls || calls.length < 2) {
            this.previousCalls$.next([]);
            return;
        }

        const startIndex = Math.max(calls.length - 6, 0);
        const endIndex = calls.length - 1;
        this.previousCalls$.next(game.calls.slice(startIndex, endIndex).reverse());
    }

    private saveCurrentGame(): void {
        const currentGame = this.currentGame$.value;
        if (!currentGame) { return; }

        // localStorage.setItem(this._currentGameKey, JSON.stringify(currentGame));
        this.updateGame(currentGame);

        document.documentElement.style.setProperty('--board-color', currentGame?.options?.boardColor);
        document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
        document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);

        const games = this.games$.value;
        games[games.findIndex(g => g.startTime === currentGame.startTime)] = currentGame;
        this.games$.next(games);
        this.saveGames(games);
    }

    private saveGames(games: Game[]): void {
        const gamesJson = games.map(game => JSON.stringify(game));
        if (this.documentId) {
            this.gamesCollection?.doc(this.documentId).update({ games: gamesJson });
        }
        else {
            const gameJson = JSON.stringify(games[0]);
            this.gamesCollection?.add({ currentGameIndex: this.currentGameIndex, games: gamesJson }).then(x => {
                this.documentId = x.id;
                this.documentId$.next(x.id);
            });
        }
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

        const games = this.games$.value;
        games.push(game);
        this.currentGameIndex = games.length - 1;
        this.saveGames(games);
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
        this.updatePreviousCalls(currentGame);
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
        const games = this.games$.value.filter(g => g.startTime !== game.startTime);
        this.games$.next(games);
        this.saveGames(games);

        if (this.currentGame$.value === game) {
            this.currentGame$.next(null);
        }

    }

    clearGames(): void {
        this.games$.next([]);
    }
}