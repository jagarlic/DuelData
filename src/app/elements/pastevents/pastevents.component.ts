import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Event } from '../../event';
import { NavComponent } from '../nav/nav.component';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-pastevents',
  templateUrl: './pastevents.component.html',
  styleUrls: ['./pastevents.component.css']
})
export class PasteventsComponent implements OnInit {

  events: Observable<any>;
  uid;
  eventsLoaded: boolean = false;
  username: string;


  constructor(private auth: AuthService, private database: AngularFireDatabase, private cdRef: ChangeDetectorRef) {
    console.log("NG Called")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        console.log(user.toJSON());
        if (user.displayName == "") {
          this.username = user.toJSON.name;
        } else {
          this.username = user.displayName;
        }
        this.events = this.database.list('/events/' + this.uid).valueChanges();
        this.eventsLoaded = true;
        this.cdRef.detectChanges();
        console.log(this.events);
      } else {
        console.log("No one is logged in");
      }
    });
    // this.username = this.auth.getUserData().displayName;
  }

  ngOnInit() {
    // this.uid = this.route.snapshot.data['userUid'];
  }

  checkColors(player, color) {
    let colors = player.colors;
    var regex = new RegExp(color, 'g');
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
