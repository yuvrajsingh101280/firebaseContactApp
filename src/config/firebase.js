// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw8MTsCNp4cOu12dvxpAMEc95Cl7UJlZc",
    authDomain: "contact-page-a2a94.firebaseapp.com",
    projectId: "contact-page-a2a94",
    storageBucket: "contact-page-a2a94.appspot.com",
    messagingSenderId: "850131509710",
    appId: "1:850131509710:web:a2d5c2c57f4b76a0360b9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)