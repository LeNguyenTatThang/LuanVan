// import firebase from 'firebase/app';
// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';

import { getAuth } from 'firebase/auth';

// Import thimport { collection, getFirestore, getDocs } from "firebase/firestore";e functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDWGEte19Y1KDhuBejrMZNqgj5_A-KWAB0",
    authDomain: "login-7b8e2.firebaseapp.com",
    projectId: "login-7b8e2",
    storageBucket: "login-7b8e2.appspot.com",
    messagingSenderId: "920671402348",
    appId: "1:920671402348:web:b94c8ed03607c2594a5b49",
    measurementId: "G-6KTTRWB3BB"
};

const app = initializeApp(firebaseConfig);

// const db = getFirestore();
// const colRef = collection(db, 'book');
// getDocs(colRef)
//     .then((snapshot) => {
//         let book = []
//         snapshot.docs.forEach((doc) => {
//             book.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(book)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

// const auth = getAuth(app);

// export { db, auth, app };
export const authentication = getAuth(app);
