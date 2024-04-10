import { Component, Input } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'bng-total-calls',
  templateUrl: './total-calls.component.html',
  styleUrl: './total-calls.component.scss'
})
export class TotalCallsComponent {
  @Input() game: Game | null = null;
}
