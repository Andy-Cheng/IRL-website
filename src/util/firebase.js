import firebase from 'firebase'
import { firebaseConfig } from '../auth/auth.js';

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();

  export const firebaseApp = firebase;
  
  export default db;