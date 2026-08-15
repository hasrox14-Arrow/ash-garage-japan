import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { vehiclesData } from "./src/data/vehicles.js";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForAshGarageJapan2026",
  authDomain: "ash-garage-japan.firebaseapp.com",
  projectId: "ash-garage-japan",
  storageBucket: "ash-garage-japan.appspot.com",
  messagingSenderId: "523682673340",
  appId: "1:523682673340:web:10b3e64ca658514578ef2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncVehicles() {
  console.log(`Starting Cloud Firestore sync for ${vehiclesData.length} vehicles...`);
  const vehiclesRef = collection(db, "vehicles");
  
  // Clear existing old docs
  const existingSnap = await getDocs(vehiclesRef);
  for (const oldDoc of existingSnap.docs) {
    await deleteDoc(doc(db, "vehicles", oldDoc.id));
  }
  console.log(`Cleared ${existingSnap.docs.length} old documents.`);

  // Upload all 20 vehicles with deterministic IDs
  for (const vehicle of vehiclesData) {
    const docId = vehicle.stockNo || vehicle.id;
    await setDoc(doc(db, "vehicles", docId), vehicle);
    console.log(`Uploaded: [${vehicle.stockNo}] ${vehicle.make} ${vehicle.model}`);
  }

  console.log("SUCCESS: All 20 vehicles synced to Firebase Cloud Firestore!");
  process.exit(0);
}

syncVehicles().catch(err => {
  console.error("Error syncing vehicles:", err);
  process.exit(1);
});
