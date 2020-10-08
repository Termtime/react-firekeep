import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
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
          this.storage = firebase.storage();
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
      
      updateProfileInfo = (info) => this.auth.currentUser.updateProfile(info);
      //Database and storage Functions

      users = uid => this.db.collection(`users`);
      currentUserProfile = () => this.db.collection(`users`).doc(this.auth.currentUser.uid);
      currentUserStorage = () => this.storage.ref(`/users/${this.auth.currentUser.uid}`);
      userNotes = uid => this.db.collection('user-notes').doc(uid).collection('notes');

      getCurrentUser = () => this.auth.currentUser.uid;
  }