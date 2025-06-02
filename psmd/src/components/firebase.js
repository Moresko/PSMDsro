// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGOUKIElBWgDtLaD2XgmxKzaHF804o1Qc",
  authDomain: "psmd-5dd2c.firebaseapp.com",
  projectId: "psmd-5dd2c",
//   storageBucket: "psmd-5dd2c.firebasestorage.app",
  storageBucket: "psmd-5dd2c.appspot.com",
  messagingSenderId: "124168251960",
  appId: "1:124168251960:web:e7e096a125f9b4776d54cd",
  measurementId: "G-NR9VJQG0E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // optional

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize storage

export { db, auth, storage }; // ✅ Export storage too

// Export auth and db so you can import them in your React components
// export { auth, db };
