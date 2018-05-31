import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { player } from '../player';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { database } from 'firebase/app';
import { Event } from '../event';
// import { currentId } from 'async_hooks';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private auth: AuthService, private database: AngularFireDatabase,
  private afs: AngularFirestore) { }

  colors;
  currColor;
  currWins: string;
  currLosses: string;
  currCount: number;

  submitUserData(players: player[], eventName: string, format: string) {
    let newEvent : Event = {name : eventName, players : players, format: format}
    let currUID = this.auth.getUserData().uid;
    // this.afs.collection('/events/').doc(currUID).collection('userEvents').doc(newEvent.name).set(newEvent);
    firebase.database().ref('/events/' + currUID + '/').push(newEvent);
  }

  handleData(players: player[], setName: string) {
    this.colors = this.database.object('/' + setName);

    for (let i = 0; i < players.length; i++) {
      let colorArr = players[i].colors.split("");
      for (let color of colorArr) {
        let currColor = this.database.object('/' + setName + '/' + color);
        currColor.query.once('value')
          .then(snapshot => {
            let obj = snapshot.val()
            currColor.update({
              wins: Number(obj.wins) + Number(players[i].setWins),
              losses: Number(obj.losses) + Number(players[i].losses)
            })
          })
      }
    }
  }
}
