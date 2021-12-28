import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDr-97EDwe7iMPlxl3U8UPVqAcqluwd2lY",
    authDomain: "carteresto-a3780.firebaseapp.com",
    databaseURL: "https://carteresto-a3780-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carteresto-a3780",
    storageBucket: "carteresto-a3780.appspot.com",
    messagingSenderId: "631217647285",
    appId: "1:631217647285:web:41733a02a0205cd48098fc"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {
      firebase
  }
