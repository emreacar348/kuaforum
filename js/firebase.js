// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDHC-GqPJs_Pawc6pHNsu27ggXahFf6kw",
  authDomain: "tirashane-b6015.firebaseapp.com",
  projectId: "tirashane-b6015",
  storageBucket: "tirashane-b6015.firebasestorage.app",
  messagingSenderId: "98137001826",
  appId: "1:98137001826:web:bb1bec9f79ae743083263b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };