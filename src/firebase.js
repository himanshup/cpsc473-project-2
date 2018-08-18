import firebase from "firebase/app";
import "firebase/firestore";
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: "project-2-4244a",
  storageBucket: "project-2-4244a.appspot.com",
  messagingSenderId: "1028123459499"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
