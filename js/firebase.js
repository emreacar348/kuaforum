
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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
const db = getFirestore(app);

export { db };
