import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  signUnWithEmail() {
    if (this.signUpForm.get('password').value == this.signUpForm.get('passConfirm').value) {
      this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value, 
      this.signUpForm.get('firstname').value + this.signUpForm.get('lastname').value)
      .then((res) => {
        console.log(res);
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
    }
  }

  onSubmit() {
    this.signUnWithEmail();
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
