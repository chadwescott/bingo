import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'bng-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  game$: BehaviorSubject<Game | undefined> = new BehaviorSubject<Game | undefined>(undefined);

  constructor(private readonly gameService: GameService) {
  }

  ngOnInit() {
    this.game$ = this.gameService.currentGame$;
  }
}
