import { Component } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  game$ = this.gameService.currentGame$;
  games$ = this.gameService.games$;

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.game$.subscribe(g => console.log(g));
  }

  newGame(): void {
    this.gameService.createGame();
  }

  deleteGame(): void {
    if (!this.game$.value) { return; }
    this.gameService.deleteGame(this.game$.value);
  }

  loadGame(game: Game): void {
    this.gameService.loadGame(game);
  }
}
