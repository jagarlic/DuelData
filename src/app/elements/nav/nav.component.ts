import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentURL : string;

  constructor(private router: Router, private authService :AuthService) {
    this.currentURL = this.router.url;
    console.log(this.currentURL);
  }

  ngOnInit() {
  }

  newEvent() {
    this.router.navigate(['event']);
  }

  toHome() {
    this.router.navigate(['home']);
  }

  toFormatStats() {
    this.router.navigate(['formatStats']);
  }

  signOut() {
    this.authService.logout();
  }

  // toPastEvents() {
  //   this.router.navigate(['home']);
  // }

}
