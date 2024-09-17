import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball.model';
import { Letters } from '../models/letters.model';
import { FireStoreService } from '../services/fire-store.service';

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

  constructor(private readonly gameService: FireStoreService) {
  }

  ngOnInit() {
    this.gameService.currentGame$.subscribe(g => this.balls = g?.balls);
  }

  clickBall(ball: Ball): void {
    if (!this.editable) { return; }
    this.gameService.callBall(ball);
  }
}
