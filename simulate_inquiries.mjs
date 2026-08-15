import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtbHC-2246a-w4zMRYmhyecxUm9vpRq_g",
  authDomain: "ash-garage-japan.firebaseapp.com",
  projectId: "ash-garage-japan",
  storageBucket: "ash-garage-japan.firebasestorage.app",
  messagingSenderId: "523682673340",
  appId: "1:523682673340:web:4a4514a9c96982ad6116b9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const randomInquiries = [
  {
    stockNo: "AG-1092",
    model: "Nissan Skyline GT-R (BCNR33) V-Spec",
    priceUsd: 68500,
    customerName: "Alexander Wright",
    email: "a.wright@autocorner.co.uk",
    phone: "+44 7700 900077",
    country: "United Kingdom (Southampton Port)",
    message: "Interested in BCNR33. Please confirm ocean freight delivery date & export certificate availability.",
    submittedAt: new Date().toISOString()
  },
  {
    stockNo: "AG-2041",
    model: "Toyota Supra (JZA80) RZ Twin Turbo",
    priceUsd: 79000,
    customerName: "Kenji Sato",
    email: "kenji.sato@jdmimports.com.au",
    phone: "+61 491 570 156",
    country: "Australia (Sydney Port)",
    message: "Requesting CIF invoice quote for Supra JZA80 including container shipping and marine insurance.",
    submittedAt: new Date().toISOString()
  },
  {
    stockNo: "AG-4108",
    model: "Mazda RX-7 (FD3S) Spirit R Type A",
    priceUsd: 89500,
    customerName: "Michael Schmidt",
    email: "m.schmidt@bavaria-tuning.de",
    phone: "+49 151 5550123",
    country: "Germany (Bremerhaven Port)",
    message: "Please send full 150-point inspection sheet and compression test results for Spirit R #412.",
    submittedAt: new Date().toISOString()
  }
];

async function runSimulation() {
  console.log("=== STARTING FIREBASE INQUIRY SIMULATION ===");
  console.log("Target Project:", firebaseConfig.projectId);

  for (const item of randomInquiries) {
    try {
      console.log(`\nSubmitting inquiry for ${item.customerName} [Stock: ${item.stockNo}]...`);
      const docRef = await addDoc(collection(db, "inquiries"), item);
      console.log(`✅ SUCCESS: Firestore Document Created with ID: ${docRef.id}`);
    } catch (err) {
      console.error(`❌ FIRESTORE ERROR for ${item.customerName}:`, err.message);
    }
  }

  console.log("\n=== VERIFYING FIRESTORE DOCUMENTS FROM CLOUD ===");
  try {
    const querySnapshot = await getDocs(collection(db, "inquiries"));
    console.log(`Total Inquiries in Firestore Database: ${querySnapshot.size}`);
    
    querySnapshot.forEach((doc) => {
      const d = doc.data();
      console.log(`- [Doc ID: ${doc.id}] ${d.customerName} (${d.country}) -> Stock #${d.stockNo}`);
    });
    console.log("\n=== SIMULATION COMPLETE & VERIFIED ===");
  } catch (err) {
    console.error("❌ ERROR FETCHING FROM FIRESTORE:", err.message);
  }

  process.exit(0);
}

runSimulation();
