import * as firebase from 'firebase';
import "firebase/firestore";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjTXCbd1JTfAgLSjLTU23OePonzoEgNrU",
    authDomain: "cocherosproyectoapk.firebaseapp.com",
    databaseURL: "https://cocherosproyectoapk.firebaseio.com",
    projectId: "cocherosproyectoapk",
    storageBucket: "cocherosproyectoapk.appspot.com",
    messagingSenderId: "565195965485"
  };
  
  firebase.initializeApp(config);  

  export default firebase;
  