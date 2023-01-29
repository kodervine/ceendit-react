// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
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

// Google Sign in
const gmailProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, gmailProvider);
    const user = res.user;
    const q = query(collection(db, "users"));
    const docs = await getDocs(q);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      createdAt: serverTimestamp(),
      name: user.displayName,
      authProvider: "google",
      email: user.email,
      password: "",
      invoiceData: [],
    });
    console.log("user created");
  } catch (e) {
    console.log(e);
  }
};

const logOutUser = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logOutUser };
