import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball';

@Component({
  selector: 'bng-ball-display',
  templateUrl: './ball-display.component.html',
  styleUrl: './ball-display.component.scss'
})
export class BallDisplayComponent {
  @Input() ball: Ball | undefined;
}
