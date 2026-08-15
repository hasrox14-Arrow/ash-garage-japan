import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs
} from "firebase/firestore";
import { vehiclesData as initialVehicles } from "../data/vehicles";

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

// 1. Save Customer Quote Inquiry to Firestore
export const saveInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), inquiryData);
    console.log("Inquiry written with ID to Firestore: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.warn("Firestore inquiry save error - saving locally:", e);
    const existing = JSON.parse(localStorage.getItem('ash_garage_inquiries') || '[]');
    existing.push(inquiryData);
    localStorage.setItem('ash_garage_inquiries', JSON.stringify(existing));
    return "local_" + Date.now();
  }
};

// 2. Save/Update Vehicle in Firestore (Syncs across all live visitors)
export const saveVehicleToFirestore = async (vehicleData) => {
  try {
    const docId = vehicleData.id || vehicleData.stockNo || `AG-${Date.now()}`;
    const vehicleRef = doc(db, "vehicles", docId);
    await setDoc(vehicleRef, { ...vehicleData, id: docId, updatedAt: new Date().toISOString() }, { merge: true });
    console.log("Vehicle saved to Firestore cloud:", docId);
    return docId;
  } catch (err) {
    console.warn("Firestore vehicle save error - fallback local:", err);
  }
};

// 3. Delete Vehicle from Firestore
export const deleteVehicleFromFirestore = async (vehicleId) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId);
    await deleteDoc(vehicleRef);
    console.log("Vehicle deleted from Firestore cloud:", vehicleId);
  } catch (err) {
    console.warn("Firestore vehicle delete error:", err);
  }
};

// 4. Real-time Subscription to Vehicles Collection (with Auto-Seeding)
export const subscribeToVehicles = (callback) => {
  try {
    const vehiclesCol = collection(db, "vehicles");
    
    // Seed initial dataset if cloud Firestore collection is completely empty
    getDocs(vehiclesCol).then((snapshot) => {
      if (snapshot.empty) {
        console.log("Firestore vehicles collection empty -> seeding initial inventory...");
        initialVehicles.forEach(v => {
          setDoc(doc(db, "vehicles", v.id), v);
        });
      }
    });

    // Real-time listener
    return onSnapshot(vehiclesCol, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreList = [];
        snapshot.forEach((doc) => {
          firestoreList.push({ id: doc.id, ...doc.data() });
        });
        callback(firestoreList);
      } else {
        callback(initialVehicles);
      }
    }, (error) => {
      console.warn("Real-time listener warning:", error);
      callback(initialVehicles);
    });
  } catch (e) {
    console.warn("Firestore subscription error:", e);
    callback(initialVehicles);
  }
};

export { app, db };
