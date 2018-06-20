import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService, private afAuth: AngularFireAuth) { }

    canActivate() {

        return this.afAuth.authState
            .pipe(take(1))
            .pipe(map(user => !!user))
            .pipe(tap(loggedIn => {
                if (!loggedIn) {
                    console.log("access denied")
                    this.router.navigate(['/'])
                }
            }));
    }


    // if ( this.authService.isLoggedIn() ) {

    //     // console.log(this.authService.isLoggedIn().toString());

    //     console.log("Apparently someone is logged in")

    //     return true;

    // }

    // console.log("Denied. User not logged in");

    // this.router.navigate(['/']);

    // return false;

}