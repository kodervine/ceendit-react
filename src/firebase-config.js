// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_b1GrTINF64uBHvXxW1LZhN1NLRrGnkw",
  authDomain: "ceendit.firebaseapp.com",
  projectId: "ceendit",
  storageBucket: "ceendit.appspot.com",
  messagingSenderId: "690103606444",
  appId: "1:690103606444:web:3082b5b7f46e5b8a2c5309",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const auth = getAuth(app);
const db = getFirestore(app);

const logOutUser = () => {
  signOut(auth);
};

export { auth, db, logOutUser };
