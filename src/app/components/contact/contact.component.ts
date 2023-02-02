import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  userFirebase$: Observable<any> | undefined;
  textValue: string = '';
  textFormControl = new FormControl('', [Validators.required]);
  send: boolean = false;

  constructor(private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userFirebase$ = this.authService.getUser();
  } 

  sendMessage(userId: string) {
    this.messageService.creatMessage({
      userId: userId,
      type: 'free',
      message: this.textValue,
      date: new Date(),
      articleId: null,
      finish: false
    })
    this.textValue = '';
    this.send = true;
  }

}
