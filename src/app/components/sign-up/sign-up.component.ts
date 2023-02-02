import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });
  sending: boolean = false;
  
  constructor(public authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.value.password == form.value.passwordVerif) {
      this.sending = true;
      setTimeout(() => this.sending = false, 2000);
      this.authService.SignUp(form.value.email, form.value.password)
    } else {
      this.sharedService.openSnackBar("Vous n'avez pas entré 2 fois le même mot de passe.", "cancel", 2500);
    }
  }

}
