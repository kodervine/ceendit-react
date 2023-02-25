import React, { useContext, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useGlobalContext } from "./AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // Redirection and navigation
  const { handleNavigateUser } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  // Create user
  const handleCreateUserWithEmailAndPassword = async (
    email,
    password,
    name = "username"
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        createdAt: serverTimestamp(),
        name,
        authProvider: "local",
        email,
        password,
        invoiceData: [],
      });
      alert("Account created successfully");
      handleNavigateUser("dashboard");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use, log in instead");
        handleNavigateUser("signin");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      }
    }
  };

  // Handle log in users with email and password
  const handleUserLogInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        handleNavigateUser("dashboard");
      }

      setTimeout(() => {
        alert("Login successful");
      }, 500);
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        alert("This is a wrong email/password");
      }
    }
  };

  // Google Sign in
  const gmailProvider = new GoogleAuthProvider();
  const handleUserSignInWithGoogle = async () => {
    try {
      // Sign in with Google
      const res = await signInWithPopup(auth, gmailProvider);
      const googleUser = res.user;

      // Check if the Google user email is already in use in Firebase
      const q = query(collection(db, "users"));
      const docs = await getDocs(q);
      let existingUser = null;
      docs.forEach((item) => {
        if (item.data().email === googleUser.email) {
          existingUser = item;
        }
      });

      // If the Google user email is already in use, merge the two users
      if (existingUser) {
        const userRef = doc(db, "users", existingUser.id);
        updateDoc(userRef, {
          uid: googleUser.uid,
          name: googleUser.displayName,
          authProvider: "google",
          email: googleUser.email,
        });
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          handleNavigateUser("dashboard");
        }

        setTimeout(() => {
          alert("Login successful");
        }, 500);
      } else {
        // If the email is not in use, create a new user
        addDoc(collection(db, "users"), {
          uid: googleUser.uid,
          createdAt: serverTimestamp(),
          name: googleUser.displayName,
          authProvider: "google",
          email: googleUser.email,
          password: "",
          invoiceData: [],
        });
        alert("Account created successfully");
        handleNavigateUser("dashboard");
      }
      // await
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

  // Reset user password
  const handleUserPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Check your email");
      })
      .catch((error) => {
        if (error.code == "auth/missing-email") {
          alert("Fill your email to receive the password reset link");
        } else if (error.code == "auth/invalid-email") {
          alert("The email address is not valid.");
        } else if (error.code == "auth/user-not-found") {
          alert("User does not exist");
        }
      });
  };

  return (
    <UserContext.Provider
      value={{
        handleCreateUserWithEmailAndPassword,
        handleUserLogInWithEmailAndPassword,
        handleUserSignInWithGoogle,
        handleUserPasswordReset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
