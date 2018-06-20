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

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private auth: AuthService, private database: AngularFireDatabase,
    private afs: AngularFirestore) { }

  colors;
  currWins: string;
  currLosses: string;
  currCount: number;

  submitUserData(players: player[], eventName: string, format: string) {
    let today: Date = new Date();
    let newEvent: Event = { name: eventName, players: players, format: format, timeStamp : today.toJSON() }
    console.log(today);
    let currUID = this.auth.getUserData().uid;
    firebase.database().ref('/events/' + currUID + '/').push(newEvent);
  }

  handleData(players: player[], setName: string) {
    if (setName != "Other") {
      this.colors = this.database.object('/' + setName);

      for (let i = 0; i < players.length; i++) {
        let colorArr = players[i].colors.split("");
        colorArr = colorArr.sort((n1, n2) => {
          if (n1 > n2) {
            return 1;
          }
          if (n1 < n2) {
            return -1;
          }
          return 0;
        });
        let colorString: string = "";
        for (let color of colorArr) {
          colorString = colorString.concat(color);
          let currColor = this.database.object('/' + setName + '/' + color);
          currColor.query.once('value')
            .then(snapshot => {
              let obj = snapshot.val()
              currColor.update({
                wins: Number(obj.wins) + Number(players[i].setWins),
                losses: Number(obj.losses) + Number(players[i].losses),
                decksPlayed: Number(obj.decksPlayed) + 1
              })
            })
        }
        if (colorString.length > 1) {
          let currColor;
          if (colorString.length == 2) {
            currColor = this.database.object('/' + setName + '/dual/' + colorString);
          } else if (colorString.length == 3) {
            currColor = this.database.object('/' + setName + '/three/' + colorString);
          } else if (colorString.length == 4) {
            currColor = this.database.object('/' + setName + '/four/' + colorString);
          } else {
            currColor = this.database.object('/' + setName + '/five/' + colorString);
          }
          currColor.query.once('value')
            .then(snapshot => {
              let obj = snapshot.val()
              currColor.update({
                wins: Number(obj.wins) + Number(players[i].setWins),
                losses: Number(obj.losses) + Number(players[i].losses),
                decksPlayed: Number(obj.decksPlayed) + 1
              })
            })

        }
      }
    }
  }
}
