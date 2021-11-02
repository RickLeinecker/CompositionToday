import firebase from  'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "compositiontoday-ab1de.firebaseapp.com",
    projectId: "compositiontoday-ab1de",
    storageBucket: "compositiontoday-ab1de.appspot.com",
    messagingSenderId: "351582707394",
    appId: "1:351582707394:web:509611fd39432418a7e55b",
    measurementId: "G-WZFQNTC3DE"
})
