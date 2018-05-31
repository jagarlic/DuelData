import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Event } from '../../event';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-pastevents',
  templateUrl: './pastevents.component.html',
  styleUrls: ['./pastevents.component.css']
})
export class PasteventsComponent implements OnInit {

  events : Observable<any>;
  

  constructor(private auth: AuthService, private database: AngularFireDatabase) {
    let uid = this.auth.getUserData().uid;
    this.events = this.database.list('/events/' + uid).valueChanges();
    console.log(this.events);
    // this.database.object('/events/' + uid).valueChanges().subscribe(
    //   events => {
    //     this.events = events;
    //     console.log(events);
    //   }
    // );
  }

  ngOnInit() {
    this.retrieveEvents()
  }

  checkColors(player, color) {
    let colors = player.colors;
    var regex = new RegExp( color, 'g' );
    if (colors.search(regex) != '-1') {
      return true;
    } else {
      return false;
    }
  }

  retrieveEvents() {
    // let uid = this.auth.getUserData().uid;
    // console.log(uid);
    // this.database.list<Event>('/events/' + uid).valueChanges().subscribe(
    //   events => {
    //     console.log(events);
    //     this.events = events;
    //   }
    // );
    console.log(this.events);

  }

}
