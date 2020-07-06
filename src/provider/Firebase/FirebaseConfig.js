import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import * as CONFIG from '../../constants/config';

const config = {
    apiKey: CONFIG.API_KEY,
    authDomain: CONFIG.AUTH_DOMAIN,
    databaseURL: CONFIG.DATABASE_URL,
    projectId: CONFIG.PROJECT_ID,
    storageBucket: CONFIG.STORAGE_BUCKET,
    messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
    appId: CONFIG.APP_ID
  };

  export class Firebase{
      constructor()
      {
          firebase.initializeApp(config);
          this.auth = firebase.auth();
          this.auth.useDeviceLanguage();
          this.googleProvider = new firebase.auth.GoogleAuthProvider();
          this.db = firebase.firestore();
      }

      //AUTH functions
      createUserWithEmailPassword = (email, password) =>
      {
        return this.auth.createUserWithEmailAndPassword(email, password);
      }

      loginWithEmailPassword = (email, password) =>
      {
        return this.auth.signInWithEmailAndPassword(email, password);
      }
      
      _loginWithProvider = (provider) => {
        return this.auth.signInWithPopup(provider);
      }

      loginWithGoogle = () => {
        return this._loginWithProvider(this.googleProvider);

        // .then(function(result) {

        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   var user = result.user;
        //   console.log(user);
        //   // ...
        // }).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        // });
      }

      loginWithFacebook = () => {
        
      }
      signOut = () => {
        return this.auth.signOut();
      }

      passwordReset = (email) =>
      {
        return this.auth.sendPasswordResetEmail(email);
      }

      updatePassword = (newPassword) =>
      {
        return this.auth.currentUser.updatePassword(newPassword);
      }
      
      //Database Functions

      users = uid => this.db.collection(`users`)
      userNotes = uid => this.db.collection('user-notes').doc(uid).collection('notes')

      getCurrentUser = () => this.auth.currentUser.uid;
  }