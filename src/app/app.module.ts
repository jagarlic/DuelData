import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';
import { EventComponent } from './elements/event/event.component';
import { RoundrobinComponent } from './elements/event/roundrobin/roundrobin.component';
import { SwissComponent } from './elements/event/swiss/swiss.component';
import { PasteventsComponent } from './elements/pastevents/pastevents.component';
import { NavComponent } from './elements/nav/nav.component';
import { ChartsModule } from 'ng2-charts';
import { FormatStatsComponent } from './elements/format-stats/format-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    LoginComponent,
    SignUpModalComponent,
    EventComponent,
    RoundrobinComponent,
    SwissComponent,
    PasteventsComponent,
    NavComponent,
    FormatStatsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    ChartsModule
  ],
  providers: [AuthService, AuthGuard, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
