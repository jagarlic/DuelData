import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {

  invalidSignUpResult: string;
  closeResult: string;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passConfirm: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router,
    private modalService: NgbModal, private ngZone: NgZone) { }

  ngOnInit() {
  }

  open(content) {
    console.log(content);
    this.modalService.open(content).result.then((result) => {
      if (result == "Submit") {
        this.invalidSignUpResult = null;
        this.signUpWithEmail();
      }
    }, (reason) => {
    });
  }

  signUpWithEmail() {
    if (this.checkForm()) {
      this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value,
        this.signUpForm.get('firstname').value, this.signUpForm.get('lastname').value).then((response) => {
          if (response) {
            this.invalidSignUpResult = response;
          } else {
            this.ngZone.run(() => this.router.navigate(['home']));
          }
        })
    }
  }

  checkForm() {
    var valid = true;
    if (this.signUpForm.get('password').value != this.signUpForm.get('passConfirm').value) {
      this.invalidSignUpResult = "";
      this.invalidSignUpResult += "Passwords do not match.";
      valid = false;
    }
    if (this.signUpForm.get('firstname').value == '' || this.signUpForm.get('lastname').value == '') {
      if (!this.invalidSignUpResult) this.invalidSignUpResult = "";
      this.invalidSignUpResult += " First and last name required.";
      valid = false;
    }
    return valid;
  }

  onSubmit() {
    this.signUpWithEmail();
  }

}
