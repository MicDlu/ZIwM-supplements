import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVoqcWObneK1D7nR8bbIhT9Ws0Obmne4o",
  authDomain: "ziwm-suplementy.firebaseapp.com",
  databaseURL: "https://ziwm-suplementy.firebaseio.com",
  projectId: "ziwm-suplementy",
  storageBucket: "ziwm-suplementy.appspot.com",
  messagingSenderId: "43077944296"
};
firebase.initializeApp(config);

export const db = firebase.database()
