//firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCANDo5xShPv5xKRJ6rmuWFdBM8V-7HIOs",
    authDomain: "namethatcountryver1.firebaseapp.com",
    databaseURL: "https://namethatcountryver1-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "namethatcountryver1",
    storageBucket: "namethatcountryver1.firebasestorage.app",
    messagingSenderId: "1070723603106",
    appId: "1:1070723603106:web:67338702f572ebf76e55fb",
    measurementId: "G-68J2MB41NP"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {app};