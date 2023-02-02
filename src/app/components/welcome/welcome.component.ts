import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  selectedValue: string = '';
  textValue: string = "Ecrivez un article ";
  textFormControl = new FormControl('', [Validators.required, Validators.pattern('Ecrivez un article [a-zA-Z ]*')]);

  response: string = "";
  copyBoolean: boolean = false;
  loadIA: boolean = false;


  constructor(private http: HttpClient, @Inject(Router) private router: Router) { }

  ngOnInit(): void {
  }

  reinitializ() {
    this.selectedValue = '';
    this.textValue = "Ecrivez un article ";
    this.response = "";
    this.copyBoolean = false;
    this.loadIA = false;
  }

  articleWriter() {
    this.router.navigate(['/article', this.selectedValue]);
  }
}
