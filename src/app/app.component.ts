import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthGuard } from './services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  canActivate: [AuthGuard];
  getWidgets() {
    return of([]);
 }
  title = 'app';
  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';
}
