import { Component } from '@angular/core';
import { Ball } from '../models/ball';
import { Balls } from '../models/balls';
import { Letters } from '../models/letters';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  balls: { [key in Letters]: Ball[] } = {
    [Letters.B]: Balls.filter(ball => ball.letter === Letters.B),
    [Letters.I]: Balls.filter(ball => ball.letter === Letters.I),
    [Letters.N]: Balls.filter(ball => ball.letter === Letters.N),
    [Letters.G]: Balls.filter(ball => ball.letter === Letters.G),
    [Letters.O]: Balls.filter(ball => ball.letter === Letters.O)
  };

  letters = Object.values(Letters);

  ngOnInit() {
    console.log(this.letters);
  }
}
