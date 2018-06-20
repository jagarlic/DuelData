// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { User } from '../user';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private loggedIn: boolean;
  public firstName: string;

  getWidgets() {
    return of([]);
  }

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  isLoggedIn() {
    return this._firebaseAuth.authState
      .pipe(take(1))
      .pipe(map(user => !!user))
      .pipe(tap(loggedIn => {
        if (!loggedIn) {
          console.log("access denied")
          this.router.navigate(['/'])
        }
      }));
  }

  getUserData() {
    return firebase.auth().currentUser;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  signUp(email, password, firstName, lastName) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(function (user) {
      let newUser : User = {first: firstName, last: lastName}
      firebase.database().ref('/users/').child(user.user.uid).set(newUser);
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
    });
  }

  getName() {
    firebase.database().ref('/users/' + this.userDetails.uid).once('value').then((snapshot) => {
      this.firstName = snapshot.val().first;
    }).then(() => {
      return this.firstName;
    });
    return this.firstName;
  }
}