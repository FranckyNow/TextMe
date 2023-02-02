import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  type: 'profil' | 'articles' = 'articles';
  usersArticles$: Observable<Article[]> | undefined;

  constructor(public authService: AuthService, private articleService: ArticleService, private sharedService: SharedService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.usersArticles$ = this.articleService.getArticlesByUserId(user!.uid);
    })
  }

  copyText(text: string) {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(this.generateText(text));
    this.sharedService.openSnackBar("Article copié !", "content_copy", 2500);
  }

  noteArticle(id: string | undefined, note: boolean) {
    this.articleService.updateAppreciation(id, note);
    this.sharedService.openSnackBar("Votre note a bien été enregistrée !", "save", 2500);
  }

  signalIssue(userId: string, articleId: string | undefined, issue: string) {
    this.articleService.updateIssue(articleId, issue);
    this.messageService.creatMessage({
      userId: userId,
      type: issue,
      message: 'Problème sélectionné',
      date: new Date(),
      articleId: (articleId == undefined) ? null : articleId,
      finish: false
    })
    this.sharedService.openSnackBar("Nous nous excusons pour la gêne occasionnée. Nous reviendrons vers vous au plus vite !", "support_agent", 7500);
  }

  generateText(text: string) {
    return text.replace(/<br\s*\/?>/gi, '\n');
  }

}
