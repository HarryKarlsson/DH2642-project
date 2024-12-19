//authService.js - firebase authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Function to create new user
export const singUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
        return userCredential.user;
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    };


// Function to log in as an existing user
export const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
