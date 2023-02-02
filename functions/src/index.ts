import { environment } from '../../src/environments/environment.prod';
const stripe = require('stripe')(environment.STRIPE_SECRET_KEY);

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.stripeCheckout = functions.https.onCall(async (data: { [x: string]: any; }) => {
    console.log('testr');
    
    var id = data['id'];
    var type = data['type'];
    var link = 'textme-4b73b.firebaseapp.com';
    // var link = 'http://localhost:4205';
    console.log('roooooooar');

    var image = 'yourlink';
    const price = 199;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
              currency: 'eur',
              unit_amount: price,
              product_data: {
                name: '1 article',
                description: 'Un article généré automatiquement et en moins de 5 minutes maximum.',
                images: [image],
              },
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: link + '/article/' + type + '/' + id + '/succed',
        cancel_url: link + '/article/' + type + '/' + id + '/cancel'
    });

    return session.id;
})