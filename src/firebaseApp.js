import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

// Initialize the Firebase app once
const app = initializeApp(firebaseConfig);

export {app};