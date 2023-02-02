import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private db: AngularFirestore) { }

  async creatMessage(message: Message) {
    return this.db.collection('messages').add(message).then(res => {
        return res.id;
    })
  }

  updateUserId(id: string, userId: string) {
    this.db.collection('messages').doc(id).update({userId: userId});
  }

  updateEmail(id: string, email: string) {
    this.db.collection('messages').doc(id).update({email: email});
  }

  updateType(id: string, Type: string) {
    this.db.collection('messages').doc(id).update({Type: Type});
  }

  updateMessage(id: string, message: string) {
    this.db.collection('messages').doc(id).update({message: message});
  }

  updateDate(id: string, date: Date) {
    this.db.collection('messages').doc(id).update({date: date});
  }

  updateArticleId(id: string, articleId: string) {
    this.db.collection('messages').doc(id).update({articleId: articleId});
  }

  updateFinish(id: string, finish: boolean) {
    this.db.collection('messages').doc(id).update({finish: finish});
  }
}
