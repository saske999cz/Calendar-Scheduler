// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:REACT_APP_FIREBASE_API_KEY,
  authDomain:REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:EACT_APP_FIREBASE_DATABASE,
  projectId:REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:REACT_APP_FIREBASE_APP_ID,
  measurementId:REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const database = getDatabase(app);
export const auth = getAuth();
export default app;
