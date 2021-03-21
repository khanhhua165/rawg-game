import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBaYPp9P8FOO5PdVBsNAqMB-73cz-3fzjM",
  authDomain: "lil-rawg.firebaseapp.com",
  projectId: "lil-rawg",
  storageBucket: "lil-rawg.appspot.com",
  messagingSenderId: "351320257228",
  appId: "1:351320257228:web:43b1b276299c09b9344869",
  measurementId: "G-N1E1Y1BZ59",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Firebase {
  EmailAuthProvider: typeof firebase.auth.EmailAuthProvider;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  constructor() {
    this.EmailAuthProvider = firebase.auth.EmailAuthProvider;
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }
}

export default new Firebase();
