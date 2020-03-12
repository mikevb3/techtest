import firebase from 'firebase';
import 'firebase/firestore';

//@note best practices indican usar environments para evitar compartir información sensible, para efectos de este test lo omitire
// import {
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     MESSAGE_SENDER_ID,
//     APP_ID,
//     STORAGE_BUCKET,
//     MEASURE_ID,
// } from 'react-native-dotenv' 

const firebaseConfig = {
    apiKey: "AIzaSyD1G1Zpdq_1KRnxuBIAdVkdyzd0iHUBNvs",
    authDomain: "monolitho.firebaseapp.com",
    databaseURL: "https://monolitho.firebaseio.com",
    projectId: "monolitho",
    storageBucket: "monolitho.appspot.com",
    messagingSenderId: "664537450773",
    appId: "1:664537450773:web:f2572ba0095de9fadd411c",
    measurementId: "G-BB9BX5PTVH"
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
export const db = firebase.firestore();
export const increment = firebase.firestore.FieldValue.increment(1); //increment function