import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import * as gptChat from 'chatgpt';
import { Configuration, OpenAIApi } from "openai";
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
// import { StripeService } from '../../../stripe.service';
import { environment } from 'src/environments/environment';

declare var Stripe: (arg0: any) => any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  userId: string = '';
  selectedValue: string = '';
  selectedIssu: string = '';
  textValue: string = "Ecrivez un article ";
  textFormControl = new FormControl('', [Validators.required]);

  response: string = "";
  copyBoolean: boolean = false;
  loadIA: boolean = false;

  showMe1: boolean = false;
  showMe2: boolean = false;
  showMe3: boolean = false;
  showMe4: boolean = false;
  showMe5: boolean = false;

  createdArticleId: string = '';
  thumbArticle: number = 0
  
  stripeStatus: string | undefined;   

  sending: boolean = false;

  // after payment
  textIa: string = '';
  state: string = '';

  constructor(
    private route: ActivatedRoute, 
    @Inject(Router) public router: Router, 
    private articleService: ArticleService, 
    private authService: AuthService, 
    private messageService: MessageService,
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private afFun: AngularFireFunctions,
) {
  
  afFun.useEmulator("localhost", 5001);
  this.stripeStatus = '';

}

  ngOnInit(): void {
    this.selectedValue = String(this.route.snapshot.paramMap.get('type'));
    this.createdArticleId = String(this.route.snapshot.paramMap.get('id'));
    this.state = String(this.route.snapshot.paramMap.get('state'));
    console.log('state => ' + this.state);

    if(this.state == 'cancel') {
      this.articleService.getArticleById(this.createdArticleId).subscribe(article => {
        this.textValue = article.ask
      })
    }
    if(this.state == 'succed') {

    // get article in db
    var article$ = this.articleService.getArticleById(this.createdArticleId).subscribe(article => {
      if(article.state != 'free' && article.state != 'paid') {
        this.connectToAPI(article.ask);
        article$.unsubscribe();
      }
    })
    }

    console.log(this.selectedValue);
    console.log(this.textIa);
    console.log('state => ' + this.state);
    
    this.authService.getUser().subscribe(user => {
      this.userId = user!.uid;
    });
    this.stripeStatus = this.getStripeStatus();
  }
  
  getStripeStatus(): string {
      let action = this.activatedRoute.snapshot.queryParamMap.get('action');              // ex: '/home?action=success'
      console.log('action = ', action);
      if (action && action == 'cancel' || action == 'success')
          return action;
      return '';
  }


  reinitializ() {
    this.router.navigate(['article', this.selectedValue])
  }

  checkoutFirebase(): void {
    this.sending = true;
    var stripe = Stripe(environment.STRIPE_PUBLIC_KEY);

    if(this.state == 'null') {
      this.articleService.creatArticle({
        userId: this.userId,
        type: this.selectedValue,
        ask: this.textValue,
        article: '',
        dateArticle: new Date(),
        totalPrice: 0,
        issue: null,
        appreciation: null,
        state: 'start'
      }).then(id => {
        this.createdArticleId = id;
    
        this.afFun.httpsCallable("stripeCheckout")({ id: this.createdArticleId, type: this.selectedValue })
            .subscribe(result => {
                console.log({ result });
    
                stripe.redirectToCheckout({
                    sessionId: result,
                }).then(function (result: { error: { message: any; }; }) {
                    console.log(result.error.message);
                });
            });
      })
    } else {
      this.articleService.updateAsk(this.createdArticleId, this.textValue);
      this.afFun.httpsCallable("stripeCheckout")({ id: this.createdArticleId, type: this.selectedValue })
          .subscribe(result => {
              console.log({ result });
  
              stripe.redirectToCheckout({
                  sessionId: result,
              }).then(function (result: { error: { message: any; }; }) {
                  console.log(result.error.message);
              });
          });
    }
  }

  async connectToAPI(ask: string, error: boolean = false) {
    this.articleService.updateState(this.createdArticleId, "paid");
    if(error) {
      this.showMe1 = true;
      this.showMe2 = true;
      this.showMe3 = true;
      this.showMe4 = true;
      this.showMe5 = true;
    } else {
      setTimeout(() => {
        this.showMe1 = true;
      }, 1000)
      setTimeout(() => {
          this.showMe2 = true;
      }, 5000)
      setTimeout(() => {
          this.showMe3 = true;
      }, 10000)
      setTimeout(() => {
          this.showMe4 = true;
      }, 45000)
      setTimeout(() => {
          this.showMe5 = true;
      }, 300000)
    }
    
    this.loadIA = true;
    
    const configuration = new Configuration({
      apiKey: environment.OPENAI_SECRET_KEY,
    });
    const openai = new OpenAIApi(configuration);
      
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ask,
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
      this.response = completion.data.choices[0].text as string;
      this.articleService.updateArticle(this.createdArticleId, this.generateText(this.response));
      console.log(completion);
      console.log(completion.data.choices[0].text);
      
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      this.connectToAPI(ask, true);
    }
  }
  
  reloadHome(): void {
      this.router.navigate(['/home'])
          .then(() => {
              window.location.reload();
          });
  }


  copyText() {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(this.response);
    this.copyBoolean = true;
  }

  generateText(text: string) {
    return text.replace(/\n/g, "<br />");
  }

  noteArticle(note: boolean) {
    this.articleService.updateAppreciation(this.createdArticleId, note);
    this.thumbArticle = (note) ? 1 : 2;
  }

  signalIssue() {
    this.articleService.updateIssue(this.createdArticleId, this.selectedIssu);
    this.messageService.creatMessage({
      userId: this.userId,
      type: this.selectedIssu,
      message: 'Problème sélectionné',
      date: new Date(),
      articleId: this.createdArticleId,
      finish: false
    })
  }

}
