//var firebase = require('firebase/compat/app')
const firebase=require('firebase');
//import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDi20cmloSzykmeFw3h61wTm4ZiZzPk7DE",
    authDomain: "tutorialcrud-1ef09.firebaseapp.com",
    projectId: "tutorialcrud-1ef09",
    storageBucket: "tutorialcrud-1ef09.appspot.com",
    messagingSenderId: "153593926731",
    appId: "1:153593926731:web:36e9e4433923ce79b029ce",
    measurementId: "G-3X8QZ91JMD"
  };
firebase.initializeApp(firebaseConfig);
var db=firebase.firestore();

module.exports=db;