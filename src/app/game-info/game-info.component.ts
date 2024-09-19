import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game.model';
import { Session } from '../models/session.model';

@Component({
  selector: 'bng-game-info',
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent {
  @Input() session: Session | null = null;
  @Input() game: Game | null = null;
  @Input() showLeaveSession = false;

  @Output() leaveSession = new EventEmitter();
}
