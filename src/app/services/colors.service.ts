import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private database : AngularFireDatabase) { }

  oldSet : Observable<any>;
 
  createNewSet(setName) {
    console.log(setName)
    var ref = firebase.database().ref("Empty");
    var newRef = firebase.database().ref(); 
    ref.once("value").then(function(snapshot) {
      console.log(snapshot.val());
      newRef.child(setName).set(
        snapshot.val());
      // firebase.database().ref(setName).push(snapshot.val());
    })
    // this.oldSet = this.database.list("Dominaria").valueChanges();
    // firebase.database().ref(setName).push(this.oldSet);
    // this.oldSet.subscribe(set => {
    //   console.log(set);
    //   firebase.database().ref(setName).push(set);
    // })
  }
}
