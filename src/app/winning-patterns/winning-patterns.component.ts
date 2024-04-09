import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Coordinate } from '../models/coordinate';
import { WinningPattern } from '../models/winning-pattern';

@Component({
  selector: 'bng-winning-patterns',
  templateUrl: './winning-patterns.component.html',
  styleUrls: ['./winning-patterns.component.scss']
})
export class WinningPatternsComponent {
  @Input() pattern: WinningPattern | undefined;
  @Input() delayMs = 1000;

  patternIndex = 0;
  currentCoordinates: Coordinate[] = [];
  rows = [0, 1, 2, 3, 4];
  columns = [0, 1, 2, 3, 4];
  subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = interval(this.delayMs).subscribe(() => {
      this.currentCoordinates = this.pattern?.coordinates[this.patternIndex] ?? [];
      this.patternIndex = (this.patternIndex + 1) % (this.pattern?.coordinates.length ?? 0);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  coordinateSelected(row: number, column: number): boolean {
    return this.currentCoordinates.find(coordinate => coordinate.x === row && coordinate.y === column) !== undefined;
  }
}
