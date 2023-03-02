// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYoAv6TY0N9Kq_HGmoqh2Q529setn0ql4",
  authDomain: "friday-46ccb.firebaseapp.com",
  projectId: "friday-46ccb",
  storageBucket: "friday-46ccb.appspot.com",
  messagingSenderId: "1088072710873",
  appId: "1:1088072710873:web:4b4f679611244660525cc8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
