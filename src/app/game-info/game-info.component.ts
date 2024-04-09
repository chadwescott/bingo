import { Component, Input } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'bng-game-info',
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent {
  @Input() game: Game | null = null;
}
