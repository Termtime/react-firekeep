import app from 'firebase';
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
          app.initializeApp(config);
          this.auth = app.auth();
          this.db = app.firestore();
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