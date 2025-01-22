import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "olx-clone-16f4c.firebaseapp.com",
  projectId: "olx-clone-16f4c",
  storageBucket: "olx-clone-16f4c.firebasestorage.app",
  messagingSenderId: "268295291716",
  appId: "1:268295291716:web:6ac82d5584b1af23e2cd11"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



