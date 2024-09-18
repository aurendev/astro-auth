// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1sAPfS-AipZmOYSGN-ATZcIRya2DBfjc",
  authDomain: "astro-authentication-a1072.firebaseapp.com",
  projectId: "astro-authentication-a1072",
  storageBucket: "astro-authentication-a1072.appspot.com",
  messagingSenderId: "645409210436",
  appId: "1:645409210436:web:22406fd930f5082cb0bc11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase = {app, auth}