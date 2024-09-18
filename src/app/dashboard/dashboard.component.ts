import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from '../services/fire-store.service';
import { Session } from '../models/session.model';

interface SessionLookup {
  id: string;
  session: Session;
}

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessions: SessionLookup[] = [];

  constructor(public readonly gameService: FireStoreService, private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameService.getActiveSessions().get().then(x => x.docs.map(d => this.sessions.push({ id: d.id, session: d.data().session })));
  }

  loadSession(id: string): void {
    this.gameService.connectToSession(id);
  }

  leaveSession(): void {
    this.gameService.connectToSession('');
  }
}

