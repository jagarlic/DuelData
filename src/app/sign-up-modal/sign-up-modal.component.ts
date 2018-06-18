import { Component, OnInit } from '@angular/core';
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

  closeResult : string;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passConfirm: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result == "Submit") {
        this.signUpWithEmail();
      }
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  signUpWithEmail() {
    if (this.signUpForm.get('password').value == this.signUpForm.get('passConfirm').value) {
      this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value, 
      this.signUpForm.get('firstname').value + " " + this.signUpForm.get('lastname').value).then(() => {
        this.updateUserInfo(this.signUpForm.get('firstname') + " " + this.signUpForm.get('lastname'));
        // this.authService.getUserData().updateProfile({
        //   displayName: this.signUpForm.get('firstname').value  + " " + this.signUpForm.get('lastname').value,
        //   photoURL : ""
        // })
      })
      .catch((err) => {
        this.updateUserInfo(this.signUpForm.get('firstname') + " " + this.signUpForm.get('lastname'));
        console.log('error: ' + err)
      });
      this.router.navigate(['home']);
    }
  }

  updateUserInfo(name) {
    console.log("updating")
    this.authService.getUserData().updateProfile({
        displayName: name,
        photoURL : ""
      })
  }

  onSubmit() {
    this.signUpWithEmail();
  }

}
