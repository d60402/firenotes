# Firenotes

## Add a note on one of your devices, and see it appear instantly on your other devices!

***

This project demonstrates a [single-page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) using [Angular (v4)](https://angular.io/), [Bootstrap (v3)](http://getbootstrap.com/), [AngularFire2](https://github.com/angular/angularfire2), and [Google Firebase](https://firebase.google.com/).

It features a responsive layout for phone, tablet, and desktop devices.

Best of all, notes added/edited on one device instantly show up on your other devices!

## Setting Everything Up

### Prerequisites

node.js and angular-cli must be installed prior to completing the rest of the setup steps listed here.

### Get The Code

 1. Download or clone this project to your local dev environment.
 2. Install dependencies by running ```npm install``` in the project folder...

#### Firebase Setup

 1. Go to https://firebase.google.com/, and sign in with your Google account.
 2. Click the **GO TO CONSOLE** link in the page header.
 3. Click the **+ Add project** link on the page.
 4. Fill in the **Project name** field (e.g., 'Firenotes'), select your **Country/region** from the drop-down, and click the **CREATE PROJECT** button.
 5. Click the **Add Firebase to your web app** link on the page, and copy the **config** JSON that is displayed for use in the next step.
 6. Create the file **src/environments/environment.ts**, and paste the firebase config JSON along with **production: false** into this file. For example...
 
```javascript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "firenotes-xxxxx.firebaseapp.com",
    databaseURL: "https://firenotes-xxxxx.firebaseio.com",
    projectId: "firenotes-xxxxx",
    storageBucket: "firenotes-xxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxxx"
  }
};
```
> If you plan on doing a production build, also add the file **environments/environment.prod.ts** with the same content above except set **production: true**.
 
 7. Click the **Authentication** link in the left-hand navigation menu on the Firebase console.
 8. Click the **SIGN-IN METHOD** tab on the Authentication page.
 9. Click the **Email/Password** provider, then turn on the **Enable** switch, and click the **SAVE** button.
 
 > If you decide to support other authentication providers, you must modify the AuthService code to support these mechanisms as well as provide the appropriate UI controls in the Login component.
 
 10. Click the **RULES** tab on the Realtime Database page.
 11. Paste in the following to the rules editor, and then click the **PUBLISH** button...
 
```javascript
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"   
      }
    }
  }
}
```

>The rules above ensure that users can only read their notes and not the notes of other users.

## Launch the Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. Use the `-aot` flag for ahead-of-time compilation.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

