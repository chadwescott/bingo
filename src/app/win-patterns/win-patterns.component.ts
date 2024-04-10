import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Coordinate } from '../models/coordinate.model';
import { WinPattern } from '../models/win-pattern.model';

@Component({
  selector: 'bng-win-patterns',
  templateUrl: './win-patterns.component.html',
  styleUrls: ['./win-patterns.component.scss']
})
export class WinPatternsComponent {
  @Input() pattern: WinPattern | null = null;
  @Input() delayMs = 1000;

  patternIndex = 0;
  currentCoordinates: Coordinate[] = [];
  rows = [0, 1, 2, 3, 4];
  columns = [0, 1, 2, 3, 4];
  subscription: Subscription | null = null;

  ngOnInit() {
    this.currentCoordinates = this.pattern?.coordinates[this.patternIndex] ?? [];
    this.subscription = interval(this.delayMs).subscribe(() => {
      if (this.pattern?.coordinates?.length === 0) {
        this.patternIndex = 0;
        this.currentCoordinates = [];
        return;
      }

      this.patternIndex = (this.patternIndex + 1) % (this.pattern?.coordinates?.length ?? 0);
      this.currentCoordinates = this.pattern?.coordinates[this.patternIndex] ?? [];
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  coordinateSelected(row: number, column: number): boolean {
    return this.currentCoordinates.find(coordinate => coordinate.x === row && coordinate.y === column) !== undefined;
  }
}
