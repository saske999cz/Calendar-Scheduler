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
  apiKey: "AIzaSyBA6H_f1MKktL5Ut5unN2y4zvzNuuoMNEA",
  authDomain: "meeting-scheduler-a4811.firebaseapp.com",
  databaseURL: "https://meeting-scheduler-a4811-default-rtdb.firebaseio.com",
  projectId: "meeting-scheduler-a4811",
  storageBucket: "meeting-scheduler-a4811.appspot.com",
  messagingSenderId: "863049826499",
  appId: "1:863049826499:web:4180328ce284c9097a6276",
  measurementId: "G-PL4C6Y195L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const database = getDatabase(app);
export const auth = getAuth();
export default app;