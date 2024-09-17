import { Component } from '@angular/core';
import { FireStoreService } from '../services/fire-store.service';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public readonly gameService: FireStoreService) {
  }
}
