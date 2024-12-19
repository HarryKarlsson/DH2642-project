
// firebaseModel.js
import { getDatabase, ref, set, onValue } from "firebase/database";
import {app} from "./firebaseApp";

// "modelToPersistence" ligger i profile presenter just nu men heter ProfilePresenter()
//const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function saveToFirebase(model) {
  await set(ref(db, "model"), { randomNumber: model.randomNumber });
  console.log("Model saved to Firebase");
}

export function readFromFirebase(model, callback) {
  onValue(ref(db, "model"), function (snapshot) {
    const data = snapshot.val();
    model.randomNumber = data ? data.randomNumber : null;
    model.ready = true;
    callback();
  });
}

export function connectToFirebase(model, callback) {
  readFromFirebase(model, callback);
}
