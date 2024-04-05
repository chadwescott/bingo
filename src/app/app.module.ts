import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalledNumbersComponent } from './called-numbers/called-numbers.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WinningPatternsComponent } from './winning-patterns/winning-patterns.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    DashboardComponent,
    WinningPatternsComponent,
    CalledNumbersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
