import { Component, Input } from '@angular/core';
import { Ball } from '../models/ball';

@Component({
  selector: 'bng-call-history',
  templateUrl: './call-history.component.html',
  styleUrl: './call-history.component.scss'
})
export class CallHistoryComponent {
  @Input() calls: Ball[] | undefined;
}
