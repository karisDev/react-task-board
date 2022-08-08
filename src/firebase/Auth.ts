import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => await signInWithEmailAndPassword(auth, email, password);

export const doSignOut = async () => await auth.signOut();

export const doPasswordReset = async (email: string) =>
  await sendPasswordResetEmail(auth, email);

export const doPasswordUpdate = async (password: string) => {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, password);
  }
  throw Error("User is not logged in!");
};
