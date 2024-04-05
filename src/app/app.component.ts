import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'bng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.createGame();
  }
}
