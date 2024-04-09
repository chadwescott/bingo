import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallDisplayComponent } from './ball-display/ball-display.component';
import { CallHistoryComponent } from './call-history/call-history.component';
import { CalledNumbersComponent } from './called-numbers/called-numbers.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WinningPatternsComponent } from './winning-patterns/winning-patterns.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    BallDisplayComponent,
    CalledNumbersComponent,
    CallHistoryComponent,
    DashboardComponent,
    WinningPatternsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
