import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject, filter, Subscription } from "rxjs";
import { Ball } from "../models/ball.model";
import { Balls } from "../models/balls.model";
import { fonts } from "../models/font.model";
import { GameOptions } from "../models/game-options.model";
import { Game } from "../models/game.model";
import { Letters } from "../models/letters.model";
import { defaultTheme, Theme } from "../models/theme.model";
import { WinPattern } from "../models/win-pattern.model";

export interface GameData {
    currentGameIndex: number;
    games: string[];
    theme: Theme;
}

@Injectable({
    providedIn: 'root'
})
export class FireStoreService implements OnDestroy {
    private gamesCollection: AngularFirestoreCollection<GameData> = this.firestore.collection('bingo');
    private documentId: string = '';
    private currentGameIndex = 0;

    documentId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    currentGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
    games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
    lastCall$: BehaviorSubject<Ball | null> = new BehaviorSubject<Ball | null>(null);
    previousCalls$: BehaviorSubject<Ball[]> = new BehaviorSubject<Ball[]>([]);
    theme$ = new BehaviorSubject<Theme>(defaultTheme);

    private subscriptions$: Subscription[] = [];

    constructor(private firestore: AngularFirestore) {
        this.connect('7kqMsz6d43Q2pkB0iUNM');
    }

    ngOnDestroy(): void {
        this.subscriptions$.map(s => s.unsubscribe());
    }

    connect(id: string): void {
        this.subscriptions$.push(this.gamesCollection.doc(id).valueChanges()
            .pipe(filter(d => !!d))
            .subscribe(data => {
                if (!data) { return; }

                const theme = data.theme;
                theme.font = fonts.find(f => f.name === theme.font.name) ?? defaultTheme.font;
                this.theme$.next(theme);
                this.updateDocumentStyles(theme);

                this.documentId = id;
                const games = data.games?.map(game => JSON.parse(game));
                this.games$.next(games);
                this.currentGameIndex = data.currentGameIndex;
                const currentGame = games[this.currentGameIndex];

                if (!currentGame) { return; }

                this.lastCall$.next(currentGame?.calls[currentGame?.calls.length - 1]);
                document.documentElement.style.setProperty('--board-color', currentGame.options.boardColor);
                document.documentElement.style.setProperty('--marker-color', currentGame.options.markerColor);
                document.documentElement.style.setProperty('--board-text-color', currentGame.options.boardTextColor);
                this.updatePreviousCalls(currentGame);
                this.currentGame$.next(currentGame);
            }
        ));
    }

    updateGame(game: Game): void {
        if (this.documentId) {
            const games = this.games$.value;
            const currentGameIndex = games.findIndex(g => g === game);
            games[currentGameIndex] = game;
            this.gamesCollection?.doc(this.documentId).update({ currentGameIndex: currentGameIndex, games: games.map(g => JSON.stringify(g)) });
        }
        else {
            const gameJson = JSON.stringify(game);
            this.gamesCollection?.add({ currentGameIndex: 0, games: [gameJson], theme: this.theme$.value }).then(x => {
                this.documentId = x.id;
                this.documentId$.next(x.id);
            });
        }
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
            this.gamesCollection?.doc(this.documentId).update({ currentGameIndex: this.currentGameIndex, games: gamesJson });
        }
        else {
            this.gamesCollection?.add({ currentGameIndex: this.currentGameIndex, games: gamesJson, theme: this.theme$.value }).then(x => {
                this.documentId = x.id;
                this.documentId$.next(x.id);
            });
        }
    }

    createGame(options: GameOptions, message: string = ''): void {
        options.markerColor = options.disableMarkerColor ? options.boardColor : options.markerColor;
        const game: Game = {
            gameNumber: this.games$.value.length + 1,
            options: options,
            message: message,
            startTime: new Date(),
            balls: this.getBalls(),
            calls: []
        };

        const games = this.games$.value;
        games.push(game);
        this.currentGameIndex = games.length - 1;
        this.currentGame$.next(game);
        this.saveCurrentGame();
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

        if (this.currentGame$.value === game) {
            this.currentGame$.next(null);
            this.currentGameIndex--;
        } else {
            this.currentGameIndex = games.findIndex(g => g === game);
        }
        console.log(this.currentGameIndex);

        this.saveGames(games);
    }

    clearGames(): void {
        this.games$.next([]);
    }

    updateTheme(theme: Theme): void {
        theme.font = fonts.find(f => f.name === theme.font.name) ?? fonts[0];
        // this.channel.postMessage(theme);
        this.gamesCollection?.doc(this.documentId).update({theme: theme});
    }

    updateDocumentStyles(theme: Theme): void {
        document.documentElement.style.setProperty('--font-family', theme.font.fontFamily);
        document.documentElement.style.setProperty('--primary-color', theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', theme.textColor);
        document.documentElement.style.setProperty('--card-color', theme.cardColor);
        document.documentElement.style.setProperty('--text-transform', theme.uppercase ? 'uppercase' : 'none');
        document.documentElement.style.setProperty('--text-shadow', theme.textShadow ? 'var(--text-shadow-on)' : 'none');
        document.documentElement.style.setProperty('--font-weight', theme.bold ? 'bold' : 'none');
    }
}