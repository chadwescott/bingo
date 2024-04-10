import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball.model';

@Component({
  selector: 'bng-ball-display',
  templateUrl: './ball-display.component.html',
  styleUrl: './ball-display.component.scss'
})
export class BallDisplayComponent {
  @Input() ball: Ball | null = null;
  @Input() largeSize = false;
}
