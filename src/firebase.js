import firebase from "firebase/app";
import "firebase/firestore";
var config = {
  apiKey: "AIzaSyBznKu6OeZL39BP6HdiZkglyC2TVAvk60k",
  authDomain: "project-2-4244a.firebaseapp.com",
  databaseURL: "https://project-2-4244a.firebaseio.com",
  projectId: "project-2-4244a",
  storageBucket: "project-2-4244a.appspot.com",
  messagingSenderId: "1028123459499"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
