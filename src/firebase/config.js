import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoghhi1S8b1aq4Ge8YqB4suxzphTbnQ5Q",
  authDomain: "projectmanagementsite-fe43f.firebaseapp.com",
  projectId: "projectmanagementsite-fe43f",
  storageBucket: "projectmanagementsite-fe43f.appspot.com",
  messagingSenderId: "493948743202",
  appId: "1:493948743202:web:53e6a34bd2a6bdc036e47b"
};


// init firebase 

firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// setup timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp }