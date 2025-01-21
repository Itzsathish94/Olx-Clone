
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "olx-clone-react-e8fbd.firebaseapp.com",
  projectId: "olx-clone-react-e8fbd",
  storageBucket: "olx-clone-react-e8fbd.firebasestorage.app",
  messagingSenderId: "378812764862",
  appId: "1:378812764862:web:d6fd23594d02795d2744ef"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();