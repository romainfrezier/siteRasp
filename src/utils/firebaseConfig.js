import firebase from "firebase"

const firebaseConfig = {

    apiKey: "AIzaSyBceFxamGlPcefR9PrwixkB9Oc3Pngl428",
  
    authDomain: "projetsportrasp.firebaseapp.com",
  
    databaseURL: "https://projetsportrasp-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "projetsportrasp",
  
    storageBucket: "projetsportrasp.appspot.com",
  
    messagingSenderId: "196408839741",
  
    appId: "1:196408839741:web:57cfa9bef0b5e4b415a454",
  
    measurementId: "G-28TT8QWVKN"
  
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {
      firebase
  }
