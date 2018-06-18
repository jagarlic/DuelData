// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private loggedIn: boolean;

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
    var checkSub = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // this.loggedIn = true;
      } else {
        // this.loggedIn = false;
      }
    });
    return checkSub;
    // return firebase.auth().currentUser;
  }

  getUserData() {
    // console.log(typeof firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  signUp(email, password, name) {
    this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(function() {
      
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
}