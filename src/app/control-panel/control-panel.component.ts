import { Component } from '@angular/core';
import { distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { Fonts } from '../models/font.model';
import { DefaultGameOptions } from '../models/game-options.model';
import { Game } from '../models/game.model';
import { DefaultSession, Session } from '../models/session.model';
import { DefaultTheme, Theme } from '../models/theme.model';
import { WinPattern } from '../models/win-pattern.model';
import { WinPatterns } from '../models/win-patterns.model';
import { FireStoreService } from '../services/fire-store.service';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'bng-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  games$ = this.gameService.games$;
  documentId = '';
  session: Session = DefaultSession;
  currentGame: Game | null = null;
  winPatterns = WinPatterns;
  password: string = '';
  gameNumber = 1;
  message = '';
  passwordValid = false;
  gameOptions = DefaultGameOptions;
  subscriptions$: Subscription[] = [];
  theme: Theme = { ...DefaultTheme }
  fonts = Fonts;
  controlPanelId = '#controlPanel';
  passwordChanged = new Subject<string>();

  constructor(private readonly gameService: FireStoreService) {
    this.passwordChanged.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => this.validatePassword(value));
  }

  ngOnInit() {
    this.subscriptions$.push(this.gameService.documentId$.subscribe(id => this.documentId = id));

    this.subscriptions$.push(this.gameService.currentGame$.subscribe(game => {
      this.currentGame = game;
      if (!game) { return; }
      this.gameNumber = game.gameNumber;
      this.message = game.message;
      this.gameOptions = { ...game.options };
      this.gameOptions.markerColor = game.options.disableMarkerColor ? game.options.boardColor : game.options.markerColor;
      this.gameOptions.winPattern = this.winPatterns.find(wp => wp.name === this.gameOptions.winPattern.name) ?? this.winPatterns[0];
    }));

    this.subscriptions$.push(this.gameService.theme$.subscribe(theme => {
      this.theme = theme;
    }));

    this.subscriptions$.push(this.gameService.currentSession$.subscribe(session => this.session = session ?? DefaultSession));
  }

  ngOnDestroy() {
    this.subscriptions$.map(s => s.unsubscribe());
  }

  newGame(): void {
    this.gameService.createGame(this.gameOptions, this.message);
  }

  updateGame(): void {
    if (!this.currentGame) { return; }
    this.currentGame.gameNumber = this.gameNumber;
    this.currentGame.message = this.message;
    this.currentGame.options.boardColor = this.gameOptions?.boardColor ?? this.currentGame.options.boardColor;
    this.currentGame.options.disableMarkerColor = this.gameOptions.disableMarkerColor;
    this.currentGame.options.markerColor = this.gameOptions.disableMarkerColor
      ? this.currentGame.options.boardColor
      : this.gameOptions?.markerColor ?? this.currentGame.options.boardColor;
    this.currentGame.options.boardTextColor = this.gameOptions?.boardTextColor ?? this.currentGame.options.boardTextColor;
    this.currentGame.options.winPattern = this.gameOptions?.winPattern ?? this.currentGame.options.winPattern;
    this.gameService.updateGame(this.currentGame);
  }

  updateMarkerColor(): void {
    if (this.gameOptions.disableMarkerColor) {
      this.gameOptions.markerColor = this.gameOptions.boardColor;
    }

    document.documentElement.style.setProperty('--marker-color', this.gameOptions.markerColor);
  }

  updateBoardColor(): void {
    document.documentElement.style.setProperty('--board-color', this.gameOptions.boardColor);
    this.updateMarkerColor();
  }

  updateBoardTextColor(): void {
    document.documentElement.style.setProperty('--board-text-color', this.gameOptions.boardTextColor);
  }

  updateBackgroundColor(): void {
    document.documentElement.style.setProperty('--primary-color', this.theme.backgroundColor);
  }

  updateControlPanelTheme(): void {
    this.gameService.updateDocumentStyles(this.theme);
  }

  updateWinPattern(winPattern: WinPattern): void {
    this.gameOptions.winPattern = winPattern;
  }

  resetGame(): void {
    if (!this.currentGame) { return; }
    this.gameService.resetGame(this.currentGame);
  }

  deleteGame(): void {
    if (!this.currentGame) { return; }
    this.gameService.deleteGame(this.currentGame);
  }

  loadGame(game: Game): void {
    this.currentGame = game;
    this.gameService.updateGame(game);
  }

  updateTheme(): void {
    this.gameService.updateTheme(this.theme);
  }

  resetTheme(): void {
    this.gameService.updateTheme({ ...DefaultTheme });
  }

  loadSession(): void {
    this.gameService.connectToSession(this.documentId);
  }

  newSession(): void {
    this.session.password = this.password;
    this.gameService.createSession(this.session);
  }

  updateSession(): void {
    this.gameService.updateSession(this.session);
  }

  deleteSession(): void {
    this.gameService.deleteSession(this.documentId);
  }

  validatePassword(password: string): void {
    const passKey = sha512(password);
    this.passwordValid = this.session.password === passKey;
  }
}
