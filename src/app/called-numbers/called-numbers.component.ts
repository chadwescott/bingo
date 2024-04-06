import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball';
import { Letters } from '../models/letters';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-called-numbers',
  templateUrl: './called-numbers.component.html',
  styleUrls: ['./called-numbers.component.scss']
})
export class CalledNumbersComponent {
  @Input() editable = false;
  @Input() balls: { [key in Letters]: Ball[] } | undefined;

  letters = Object.values(Letters);
  lastCall$ = this.gameService.lastCall$;

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.currentGame$.subscribe(g => this.balls = g?.balls);
  }

  clickBall(ball: Ball): void {
    if (!this.editable) { return; }
    this.gameService.callBall(ball);
  }
}
