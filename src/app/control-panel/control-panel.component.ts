import { Component } from '@angular/core';
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

  loadGame(game: any): void {
    console.log(game);
    this.gameService.loadGame(game);
  }
}
