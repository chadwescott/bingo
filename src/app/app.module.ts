import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WinningPatternsComponent } from './winning-patterns/winning-patterns.component';
import { CalledNumbersComponent } from './called-numbers/called-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    DashboardComponent,
    WinningPatternsComponent,
    CalledNumbersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
