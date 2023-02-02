// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  OPENAI_SECRET_KEY: 'your_secret_key',
  
  STRIPE_PUBLIC_KEY: 'your_public_key',
  STRIPE_SECRET_KEY: 'your_secret_key',
  firebase: {
    apiKey: "your_key",
    authDomain: "your_key",
    projectId: "your_key",
    storageBucket: "your_key",
    messagingSenderId: "your_key",
    appId: "your_key",
    measurementId: "your_key"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
