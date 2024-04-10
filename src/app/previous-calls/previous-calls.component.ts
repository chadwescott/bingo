import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-previous-calls',
  templateUrl: './previous-calls.component.html',
  styleUrl: './previous-calls.component.scss'
})
export class PreviousCallsComponent {
  constructor(public gameService: GameService) { }
}
