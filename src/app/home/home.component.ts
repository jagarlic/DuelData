import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavComponent } from '../elements/nav/nav.component'
import { PasteventsComponent } from '../elements/pastevents/pastevents.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log(this.authService.getUserData());
  }

  signOut() {
    this.authService.logout();
  }

  newEvent() {
    this.router.navigate(['event']);
  }

  toPastEvents() {
    this.router.navigate(['pastevents']);
  }

  toFormatStats() {
    this.router.navigate(['pastevents']);
  }

}
