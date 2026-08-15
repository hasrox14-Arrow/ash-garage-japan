import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase configuration for Ash Garage Japan
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCtbHC-2246a-w4zMRYmhyecxUm9vpRq_g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ash-garage-japan.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ash-garage-japan",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ash-garage-japan.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "523682673340",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:523682673340:web:4a4514a9c96982ad6116b9"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save Inquiry to Firestore (with local console fallback if offline)
export const saveInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), inquiryData);
    console.log("Inquiry written with ID to Firestore: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.warn("Firestore save error/offline - persisting inquiry locally:", e);
    const existing = JSON.parse(localStorage.getItem('ash_garage_inquiries') || '[]');
    existing.push(inquiryData);
    localStorage.setItem('ash_garage_inquiries', JSON.stringify(existing));
    return "local_" + Date.now();
  }
};

export { app, db };
