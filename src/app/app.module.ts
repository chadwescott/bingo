import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallDisplayComponent } from './ball-display/ball-display.component';
import { CalledNumbersComponent } from './called-numbers/called-numbers.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CurrentCallComponent } from './current-call/current-call.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { HomeComponent } from './home/home.component';
import { PreviousCallsComponent } from './previous-calls/previous-calls.component';
import { TotalCallsComponent } from './total-calls/total-calls.component';
import { WinPatternsComponent } from './win-patterns/win-patterns.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    BallDisplayComponent,
    CalledNumbersComponent,
    DashboardComponent,
    WinPatternsComponent,
    HomeComponent,
    CurrentCallComponent,
    TotalCallsComponent,
    PreviousCallsComponent,
    GameInfoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
