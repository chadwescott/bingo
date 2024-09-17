import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { environmnet } from 'src/environments/environment';
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
    AngularFireModule.initializeApp(environmnet.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "bingo-3e990",
      "appId": "1:683623056065:web:726265d0df07f90ebf8a40",
      "storageBucket": "bingo-3e990.appspot.com",
      "apiKey": "AIzaSyCLzYr8vPDi9wgzmQQ7bh6IIu-WgRhPGO8",
      "authDomain": "bingo-3e990.firebaseapp.com",
      "messagingSenderId": "683623056065",
      "measurementId": "G-Z6Q8TETBRR"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
