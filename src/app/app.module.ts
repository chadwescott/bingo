import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
