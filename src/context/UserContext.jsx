import React, { useContext } from "react";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // Reset user password
  const handleUserPasswordReset = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset email sent");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <UserContext.Provider
      value={{
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
