import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['home'])
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.userForm.get('email').value, this.userForm.get('password').value)
      .then((res) => {
        console.log(res);
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  checkIfLoggedIn() {
    let loggedIn = false;
    if (firebase.auth().currentUser != null) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.checkIfLoggedIn()

  }
}