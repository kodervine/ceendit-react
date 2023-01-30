// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
    // confirm if users email already exists in the collection but not properly working yet
    docs.forEach((items) => {
      if (items.data().email == user.email) {
        alert("Email already exists");
        return;
      } else {
        addDoc(collection(db, "users"), {
          uid: user.uid,
          createdAt: serverTimestamp(),
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          password: "",
          invoiceData: [],
        });
        console.log("user created");
      }
    });
  } catch (e) {
    if (error.code == "auth/email-already-in-use") {
      alert("The email address is already in use");
    } else if (error.code == "auth/invalid-email") {
      alert("The email address is not valid.");
    } else if (error.code == "auth/operation-not-allowed") {
      alert("Operation not allowed.");
    } else if (error.code == "auth/weak-password") {
      alert("The password is too weak.");
    }
  }
};

const handleCreateUserWithEmailAndPassword = async (
  email,
  password,
  name = "username"
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // confirm if users email already exists in the collection but not properly working yet
    const q = query(collection(db, "users"));
    const docs = await getDocs(q);
    docs.forEach((items) => {
      if (items.data().email == user.email) {
        alert("Email already exists");
        return;
      } else {
        addDoc(collection(db, "users"), {
          uid: user.uid,
          createdAt: serverTimestamp(),
          name,
          authProvider: "local",
          email,
          password,
          invoiceData: [],
        });
        console.log("user created");
      }
    });

    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   createdAt: serverTimestamp(),
    //   name,
    //   authProvider: "local",
    //   email,
    //   password,
    //   invoiceData: [],
    // });
    // console.log("user created");
  } catch (error) {
    if (error.code == "auth/email-already-in-use") {
      alert("The email address is already in use");
    } else if (error.code == "auth/invalid-email") {
      alert("The email address is not valid.");
    } else if (error.code == "auth/operation-not-allowed") {
      alert("Operation not allowed.");
    } else if (error.code == "auth/weak-password") {
      alert("The password is too weak.");
    }
  }
};

const logOutUser = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  handleCreateUserWithEmailAndPassword,
  logOutUser,
};
