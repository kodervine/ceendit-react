import React, { useContext } from "react";
import { db, auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useGlobalContext } from "./AppContext";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { handleNavigateUser } = useGlobalContext();
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
      handleNavigateUser("create-invoice");
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
      handleNavigateUser("create-invoice");
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        alert("This is a wrong email/password");
      }
    }
  };

  // Google Sign up
  const gmailProvider = new GoogleAuthProvider();
  const handleUserSignUpWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, gmailProvider);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        createdAt: serverTimestamp(),
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        password: "",
        invoiceData: [],
      });
      alert("Account created successfully");
      handleNavigateUser("create-invoice");
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
        handleUserSignUpWithGoogle,
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