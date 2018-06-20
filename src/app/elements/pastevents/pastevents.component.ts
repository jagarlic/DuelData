import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Event } from '../../event';
import { NavComponent } from '../nav/nav.component';
import { DatePipe } from '@angular/common'
import { ReversePipePipe } from '../../reverse-pipe.pipe'
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-pastevents',
  templateUrl: './pastevents.component.html',
  styleUrls: ['./pastevents.component.css']
})
export class PasteventsComponent implements OnInit, OnDestroy {

  events: Observable<any>;
  uid;
  eventsLoaded: boolean = false;
  name: string;
  private sub : any;


  constructor(private auth: AuthService, private database: AngularFireDatabase, private cdRef: ChangeDetectorRef) {
    var db = firebase.database();
    this.sub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        if (user.displayName == null) {
          console.log(user.displayName)
          db.ref('/users/' + this.uid).once('value').then((snapshot) => {
            this.name = snapshot.val().first;
            if (!this.cdRef['destroyed']) {
              this.eventsLoaded = true;
              this.cdRef.detectChanges();
            }
          });
        } else {
          this.name = user.displayName;
        } 
        this.events = this.database.list('/events/' + this.uid).valueChanges();
        if (!this.cdRef['destroyed']) {
          this.eventsLoaded = true;
          this.cdRef.detectChanges();
        }
        console.log(this.events);
      } else {
        console.log("No one is logged in");
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
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

}
