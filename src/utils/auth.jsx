import { auth } from "@/firebase-config";

import { signOut } from "firebase/auth";

export const logOutUser = () => {
  signOut(auth);
};
