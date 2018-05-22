import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {

        if ( this.authService.isLoggedIn() ) {

            return true;

        }

        console.log("Denied. User not logged in");

        this.router.navigate(['/']);

        return false;

    }

}