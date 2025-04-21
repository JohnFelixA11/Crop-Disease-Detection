// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYEQHZw6TkYFFQw7-wloNsh44HJxP7Gmg",
  authDomain: "crop-disease-bbf77.firebaseapp.com",
  projectId: "crop-disease-bbf77",
  storageBucket: "crop-disease-bbf77.firebasestorage.app",
  messagingSenderId: "609346736471",
  appId: "1:609346736471:web:15a8bb9c41fd6af8a6ae12",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
