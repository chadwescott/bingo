import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject } from "rxjs";
import { Ball } from "../models/ball.model";
import { Game } from "../models/game.model";

@Injectable({
    providedIn: 'root'
})
export class FireStoreService {
    private gamesCollection: AngularFirestoreCollection<Game> | null = null;
    private currentGameCollection: AngularFirestoreCollection<Game> | null = null;

    // games$: Observable<Game[]> | null = null;
    // currentGame$: Observable<Game> | null = null;

    currentGame$ = new BehaviorSubject<Game | null>(null);
    games$ = new BehaviorSubject<Game[]>([]);
    sessionId$ = new BehaviorSubject<string | null>(null);

    lastCall$ = new BehaviorSubject<Ball | null>(null);
    previousCalls$ = new BehaviorSubject<Ball[]>([]);

    private readonly channel = new BroadcastChannel('bingo-game-channel');
    private readonly collectionId = 'bingo';

    constructor(private firestore: AngularFirestore) {
    }

    public createSession(): void {

    }

    public connectToStore(id: string): void {
        this.firestore.collection(this.collectionId, (ref) => ref.where('id', '==', id));
        this.gamesCollection = this.firestore.collection(this.collectionId, (ref) => ref.id === id);
        this.gamesCollection.valueChanges();
        this.currentGameCollection = this.firestore.collection(id);
        // this.currentGame = this.currentGameCollection.valueChanges();
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

    // private updateGameWinPattern(game: Game): void {
    //     game.options.winPattern = winPatterns.find(wp => wp.name === game.options.winPattern.name) ?? winPatterns[0];
    // }

    // private updateLastCall() {
    //     const currentGame = this.currentGame$.value;
    //     this.lastCall$.next(currentGame && currentGame.calls.length > 0 ? currentGame.calls[currentGame.calls.length - 1] : null);
    // }

    // private updatePreviousCalls() {
    //     const currentGame = this.currentGame$.value;
    //     const calls = currentGame?.calls;

    //     if (!calls || calls.length < 2) {
    //         this.previousCalls$.next([]);
    //         return;
    //     }

    //     const startIndex = Math.max(calls.length - 6, 0);
    //     const endIndex = calls.length - 1;
    //     this.previousCalls$.next(currentGame.calls.slice(startIndex, endIndex).reverse());
    // }

    // private saveCurrentGame(): void {
    //     const currentGame = this.currentGame$.value;
    //     if (!currentGame) { return; }

    //     localStorage.setItem(this._currentGameKey, JSON.stringify(currentGame));
    //     this.channel.postMessage(currentGame);

    //     document.documentElement.style.setProperty('--board-color', currentGame?.options?.boardColor);
    //     document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
    //     document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);

    //     const games = this.games$.value;
    //     games[games.findIndex(g => g.startTime === currentGame.startTime)] = currentGame;
    //     this.games$.next(games);
    //     this.saveGames();
    // }

    // private saveGames(): void {
    //     localStorage.setItem(this._gamesKey, JSON.stringify(this.games$.value));
    // }

    // createGame(gameNumber: number, options: GameOptions, message: string = ''): void {
    //     options.markerColor = options.disableMarkerColor ? options.boardColor : options.markerColor;
    //     const game: Game = {
    //         gameNumber: gameNumber,
    //         options: options,
    //         message: message,
    //         startTime: new Date(),
    //         balls: this.getBalls(),
    //         calls: []
    //     };

    //     this.currentGame$.next(game);
    //     this.saveCurrentGame();

    //     this.games$.value.push(game);
    //     this.saveGames();
    // }

    // private getBalls(): { [key in Letters]: Ball[] } {
    //     return {
    //         [Letters.B]: Balls.filter(ball => ball.letter === Letters.B).map(ball => ({ ...ball, called: false })),
    //         [Letters.I]: Balls.filter(ball => ball.letter === Letters.I).map(ball => ({ ...ball, called: false })),
    //         [Letters.N]: Balls.filter(ball => ball.letter === Letters.N).map(ball => ({ ...ball, called: false })),
    //         [Letters.G]: Balls.filter(ball => ball.letter === Letters.G).map(ball => ({ ...ball, called: false })),
    //         [Letters.O]: Balls.filter(ball => ball.letter === Letters.O).map(ball => ({ ...ball, called: false }))
    //     };
    // }

    // callBall(ball: Ball): void {
    //     ball.called = !ball.called;
    //     const currentGame = this.currentGame$.value;
    //     if (!currentGame) { return; }

    //     if (ball.called) {
    //         currentGame.calls.push(ball);
    //     } else {
    //         const index = currentGame.calls.findIndex(b => b.letter === ball.letter && b.number === ball.number);
    //         if (index !== undefined && index !== -1) {
    //             currentGame.calls.splice(index, 1);
    //         }
    //     }

    //     this.updateLastCall();
    //     this.updatePreviousCalls();
    //     this.saveCurrentGame();
    // }

    // updateGame(game: Game): void {
    //     this.currentGame$.next(game);
    //     this.saveCurrentGame();
    // }

    // resetGame(game: Game): void {
    //     game.balls = this.getBalls();
    //     game.calls = [];
    //     this.updateGame(game);
    // }

    // updateWinPattern(winPattern: WinPattern): void {
    //     const currentGame = this.currentGame$.value;
    //     if (currentGame === null) { return; }

    //     currentGame.options.winPattern = winPattern;
    //     this.saveCurrentGame();
    // }

    // deleteGame(game: Game): void {
    //     this.games$.next(this.games$.value.filter(g => g.startTime !== game.startTime));
    //     this.saveGames();

    //     if (this.currentGame$.value === game) {
    //         this.currentGame$.next(null);
    //         localStorage.removeItem(this._currentGameKey);
    //     }

    // }

    // clearGames(): void {
    //     this.games$.next([]);
    //     localStorage.removeItem(this._gamesKey);
    // }
}