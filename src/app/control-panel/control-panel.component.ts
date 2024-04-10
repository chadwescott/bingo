import { Component } from '@angular/core';
import { Game } from '../models/game';
import { WinPattern } from '../models/win-pattern';
import { WinPatterns } from '../models/win-patterns';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  game$ = this.gameService.currentGame$;
  winPatterns = WinPatterns;

  constructor(private readonly gameService: GameService) {
  }

  newGame(): void {
    this.gameService.createGame();
  }

  updateWinPattern(winPattern: WinPattern): void {
    console.log(winPattern);
    this.gameService.updateWinPattern(winPattern);
  }

  deleteGame(): void {
    if (!this.game$.value) { return; }
    this.gameService.deleteGame(this.game$.value);
  }

  loadGame(game: Game): void {
    this.gameService.loadGame(game);
  }
}
