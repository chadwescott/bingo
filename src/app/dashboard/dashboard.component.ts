import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from '../services/fire-store.service';
import { SessionLookup } from '../models/session-lookup.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sessions: SessionLookup[] = [];

  private subscription$: Subscription[] = [];

  constructor(public readonly gameService: FireStoreService, private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameService.activeSessions$.subscribe(s => {
      if (s.length === 1) {
        this.gameService.connectToSession(s[0].id);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription$.map(s => s.unsubscribe());
  }

  loadSession(id: string): void {
    this.gameService.connectToSession(id);
  }

  leaveSession(): void {
    this.gameService.connectToSession('');
  }
}

