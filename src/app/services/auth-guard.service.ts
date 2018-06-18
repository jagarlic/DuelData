import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {

        if ( this.authService.isLoggedIn() ) {

            console.log("Apparently someone is logged in")

            return true;

        }

        console.log("Denied. User not logged in");

        this.router.navigate(['/']);

        return false;

    }

}