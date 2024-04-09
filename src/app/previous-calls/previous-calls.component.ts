import { Component, Input } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'bng-previous-calls',
  templateUrl: './previous-calls.component.html',
  styleUrl: './previous-calls.component.scss'
})
export class PreviousCallsComponent {
  @Input() game: Game | null = null;
}
