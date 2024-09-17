import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FireStoreService } from '../services/fire-store.service';

@Component({
  selector: 'bng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription[] = [];

  constructor(public readonly gameService: FireStoreService, private readonly _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions$.push(this._route.params.subscribe((params) => {
      const documentId = params['documentId'];

      if (documentId) {
        this.gameService.connectToSession(documentId);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions$.map(s => s.unsubscribe());
  }
}

