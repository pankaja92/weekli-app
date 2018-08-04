import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// const devConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY_DEV,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_DEV,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_DEV,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAG_EBUCKET_DEV,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_DEV,
// };

// const prodConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAG_EBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAG_EBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
