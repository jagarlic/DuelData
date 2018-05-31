import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class UserResolver implements Resolve<firebase.User> {
    
        constructor(private service: AuthService) {}
    
        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): firebase.User {
            return this.service.getUserData();
        }
    }