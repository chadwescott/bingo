import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { defaultGameOptions } from '../models/game-options.model';
import { Game } from '../models/game.model';
import { WinPattern } from '../models/win-pattern.model';
import { winPatterns } from '../models/win-patterns.model';
import { GameService } from '../services/game.service';

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
  subscription$: Subscription | null = null;

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.subscription$ = this.gameService.currentGame$.subscribe(game => {
      this.currentGame = game;
      this.gameOptions = {
        boardColorCode: game?.options?.boardColorCode ?? this.gameOptions.boardColorCode,
        boardColorName: game?.options?.boardColorName ?? this.gameOptions.boardColorName,
        winPattern: game?.options?.winPattern ?? this.gameOptions.winPattern
      };
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  newGame(): void {
    this.gameService.createGame(this.gameNumber, this.gameOptions);
  }

  updateGame(): void {
    if (!this.currentGame) { return; }
    this.currentGame.gameNumber = this.gameNumber;
    this.currentGame.options.boardColorCode = this.gameOptions?.boardColorCode ?? this.currentGame.options.boardColorCode;
    this.currentGame.options.boardColorName = this.gameOptions?.boardColorName ?? this.currentGame.options.boardColorName;
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
    this.gameService.updateGame(game);
  }
}
