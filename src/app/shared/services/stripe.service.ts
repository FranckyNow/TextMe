import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private db: AngularFirestore) { }

  /*
  generatePayment() {
    app.post('/create-checkout-session', async (req: any, res: { redirect: (arg0: number, arg1: any) => void; }) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
      });
    
      res.redirect(303, session.url);
    });
    
    app.listen(4242, () => console.log(`Listening on port ${4242}!`));
  }*/

}
