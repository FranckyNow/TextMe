import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });
  sending: boolean = false;
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(email: string, pwd: string) {
    this.sending = true;
    setTimeout(() => this.sending = false, 2000);
    this.authService.SignIn(email, pwd);
  }

}
