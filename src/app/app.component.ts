import { Component } from '@angular/core';
import { FireStoreService } from './services/fire-store.service';

@Component({
  selector: 'bng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public readonly themeService: FireStoreService) {
  }
}
