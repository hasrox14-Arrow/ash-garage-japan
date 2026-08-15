import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  setDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { vehiclesData } from "../data/vehicles";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForAshGarageJapan2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ash-garage-japan.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ash-garage-japan",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ash-garage-japan.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "523682673340",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:523682673340:web:10b3e64ca658514578ef2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Use full 20-vehicle dataset
export const INITIAL_VEHICLES = vehiclesData;

// Real-time Firestore listener for vehicles
export const subscribeToVehicles = (callback) => {
  const vehiclesRef = collection(db, "vehicles");
  return onSnapshot(vehiclesRef, (snapshot) => {
    if (snapshot.empty) {
      // Seed default vehicles if collection is empty
      INITIAL_VEHICLES.forEach(async (v) => {
        await addDoc(vehiclesRef, v);
      });
      callback(INITIAL_VEHICLES);
    } else {
      const vehiclesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(vehiclesList);
    }
  }, (error) => {
    console.warn("Firestore listener error, using local dataset fallback:", error);
    callback(INITIAL_VEHICLES);
  });
};

// Save (Add or Update) Vehicle in Firestore
export const saveVehicleToFirestore = async (vehicleData) => {
  try {
    const vehiclesRef = collection(db, "vehicles");
    if (vehicleData.id && typeof vehicleData.id === 'string' && vehicleData.id.length > 10) {
      const vehicleDocRef = doc(db, "vehicles", vehicleData.id);
      await updateDoc(vehicleDocRef, vehicleData);
      return vehicleData.id;
    } else {
      const docRef = await addDoc(vehiclesRef, vehicleData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving vehicle to Firestore:", error);
    throw error;
  }
};

// Delete Vehicle from Firestore
export const deleteVehicleFromFirestore = async (vehicleId) => {
  try {
    if (vehicleId && typeof vehicleId === 'string' && vehicleId.length > 10) {
      const vehicleDocRef = doc(db, "vehicles", vehicleId);
      await deleteDoc(vehicleDocRef);
    }
  } catch (error) {
    console.error("Error deleting vehicle from Firestore:", error);
    throw error;
  }
};

// Save Inquiry to Firestore
export const saveInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving inquiry:", error);
    throw error;
  }
};

// Upload Vehicle Image to Firebase Storage
export const uploadVehicleImageToFirebase = async (file) => {
  try {
    const storageRef = ref(storage, `vehicle_images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};
