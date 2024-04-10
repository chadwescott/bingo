import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball.model';

@Component({
  selector: 'bng-current-call',
  templateUrl: './current-call.component.html',
  styleUrl: './current-call.component.scss'
})
export class CurrentCallComponent {
  @Input() call: Ball | null = null;
}
