import {auth} from './firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

export const createNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log("Google Sign-In Result:", result);
    return result;
}

export const signOutUser = async () => {
    return await signOut(auth);
}