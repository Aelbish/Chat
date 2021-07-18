import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAtBVtbmat932JCmVlg3W8N9FwNoIHaisc",
    authDomain: "chatapp-c734b.firebaseapp.com",
    projectId: "chatapp-c734b",
    storageBucket: "chatapp-c734b.appspot.com",
    messagingSenderId: "1091523451717",
    appId: "1:1091523451717:web:5865199dc1d42299263c2c",
  })
  .auth();
