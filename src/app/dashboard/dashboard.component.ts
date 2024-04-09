import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public readonly gameService: GameService) {
  }
}
