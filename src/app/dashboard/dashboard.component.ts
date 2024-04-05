import { Component } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  game: Game | undefined;

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.currentGame$.subscribe(g => this.game = g);
  }
}
