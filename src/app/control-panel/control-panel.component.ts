import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
  gameNumber: number = 1;
  gameOptions = defaultGameOptions;
  subscriptions$: Subscription[] = [];
  theme: Theme = defaultTheme;

  constructor(private readonly gameService: GameService, private readonly themeService: ThemeService) {
  }

  ngOnInit() {
    this.subscriptions$.push(this.gameService.currentGame$.subscribe(game => {
      this.currentGame = game;
      if (!game) { return; }
      this.gameNumber = game.gameNumber;
      this.gameOptions = {
        boardColorCode: game.options.boardColorCode,
        boardColorName: game.options.boardColorName,
        boardTextColorCode: game.options.boardTextColorCode,
        winPattern: game.options.winPattern
      };
    }));

    this.subscriptions$.push(this.themeService.theme$.subscribe(theme => this.theme = theme));
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
    this.currentGame.options.boardColorName = this.gameOptions?.boardColorName ?? this.currentGame.options.boardColorName;
    this.currentGame.options.boardColorCode = this.gameOptions?.boardColorCode ?? this.currentGame.options.boardColorCode;
    this.currentGame.options.boardTextColorCode = this.gameOptions?.boardTextColorCode ?? this.currentGame.options.boardTextColorCode;
    this.currentGame.options.winPattern = this.gameOptions?.winPattern ?? this.currentGame.options.winPattern;
    this.gameService.updateGame(this.currentGame);
  }

  updateWinPattern(winPattern: WinPattern): void {
    this.gameOptions.winPattern = winPattern;
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
}
