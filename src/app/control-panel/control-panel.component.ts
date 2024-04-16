import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { fonts } from '../models/font.model';
import { defaultGameOptions } from '../models/game-options.model';
import { Game } from '../models/game.model';
import { Theme, defaultTheme } from '../models/theme.model';
import { WinPattern } from '../models/win-pattern.model';
import { winPatterns } from '../models/win-patterns.model';
import { GameService } from '../services/game.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'bng-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  games$ = this.gameService.games$;
  currentGame: Game | null = null;
  winPatterns = winPatterns;
  gameNumber = 1;
  message = '';
  gameOptions = defaultGameOptions;
  subscriptions$: Subscription[] = [];
  theme: Theme = {
    font: defaultTheme.font,
    backgroundColor: defaultTheme.backgroundColor,
    cardColor: defaultTheme.cardColor,
    textColor: defaultTheme.textColor,
    bold: defaultTheme.bold,
    textShadow: defaultTheme.textShadow,
    uppercase: defaultTheme.uppercase
  }
  fonts = fonts;
  disableMarkerColor = false;

  constructor(private readonly gameService: GameService, private readonly themeService: ThemeService) {
  }

  ngOnInit() {
    this.subscriptions$.push(this.gameService.currentGame$.subscribe(game => {
      this.currentGame = game;
      if (!game) { return; }
      this.gameNumber = game.gameNumber;
      this.message = game.message;
      this.gameOptions = {
        boardColor: game.options.boardColor,
        boardTextColor: game.options.boardTextColor,
        markerColor: game.options.markerColor,
        winPattern: game.options.winPattern
      };
    }));

    this.subscriptions$.push(this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.map(s => s.unsubscribe());
  }

  newGame(): void {
    this.gameService.createGame(this.gameNumber, this.gameOptions);
  }

  updateGame(): void {
    if (!this.currentGame) { return; }
    this.currentGame.gameNumber = this.gameNumber;
    this.currentGame.message = this.message;
    this.currentGame.options.boardColor = this.gameOptions?.boardColor ?? this.currentGame.options.boardColor;
    this.currentGame.options.markerColor = this.disableMarkerColor
      ? this.currentGame.options.boardColor
      : this.gameOptions?.markerColor ?? this.currentGame.options.markerColor;
    this.currentGame.options.boardTextColor = this.gameOptions?.boardTextColor ?? this.currentGame.options.boardTextColor;
    this.currentGame.options.winPattern = this.gameOptions?.winPattern ?? this.currentGame.options.winPattern;
    this.gameService.updateGame(this.currentGame);
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
    this.themeService.updateTheme(this.theme);
  }

  resetTheme(): void {
    this.themeService.updateTheme(defaultTheme);
  }
}
