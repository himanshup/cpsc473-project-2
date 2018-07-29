import firebase from "firebase";
require("firebase/firestore");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBTjIzadGBj-rS-dKhmitma_n5xVQqS08",
  authDomain: "test-3a209.firebaseapp.com",
  databaseURL: "https://test-3a209.firebaseio.com",
  projectId: "test-3a209",
  storageBucket: "",
  messagingSenderId: "82637738644"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
