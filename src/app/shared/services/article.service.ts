import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private db: AngularFirestore) { }

  async creatArticle(article: Article) {
    return this.db.collection('articles').add(article).then(res => {
        return res.id;
    })
  }

  getArticlesByUserId(id: string): Observable<Article[]> {
    return this.db.collection("articles", ref => {
        return ref
        .where("userId", "==", id)
        .orderBy("dateArticle", "desc")
    }).valueChanges({ idField: 'id' }) as Observable<Article[]>;
  }

  getArticleById(id: string): Observable<Article> {
    return this.db.collection('articles').doc(id).valueChanges({ idField: 'id' }) as Observable<Article>;
  }

  updateType(id: string, type: string) {
      this.db.collection('articles').doc(id).update({type: type});
  }

  updateAsk(id: string, ask: string) {
      this.db.collection('articles').doc(id).update({ask: ask});
  }

  updateArticle(id: string, article: string) {
      this.db.collection('articles').doc(id).update({article: article});
  }

  updateDateArticle(id: string, dateArticle: Date) {
      this.db.collection('articles').doc(id).update({dateArticle: dateArticle});
  }

  updateTotalPrice(id: string, totalPrice: number) {
      this.db.collection('articles').doc(id).update({totalPrice: totalPrice});
  }

  updateIssue(id: string | undefined, issue: string) {
      this.db.collection('articles').doc(id).update({issue: issue});
  }

  updateAppreciation(id: string | undefined, appreciation: boolean) {
      this.db.collection('articles').doc(id).update({appreciation: appreciation});
  }

  updateState(id: string | undefined, state: 'start' | 'free' | 'paid') {
      this.db.collection('articles').doc(id).update({state: state});
  }
}
