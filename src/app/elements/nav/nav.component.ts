import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentURL : string;

  constructor(private router: Router, private authService :AuthService, private ngZone : NgZone) {
    this.currentURL = this.router.url;
  }

  ngOnInit() {
  }

  newEvent() {
    this.ngZone.run(() => this.router.navigate(['event']));
  }

  toHome() {
    this.router.navigate(['home']);
  }

  toFormatStats() {
    this.ngZone.run(() => this.router.navigate(['formatStats']));
  }

  toPastEvents() {
    this.ngZone.run(() => this.router.navigate(['pastevents']));
  }

  signOut() {
    this.authService.logout();
  }

  // toPastEvents() {
  //   this.router.navigate(['home']);
  // }

}
